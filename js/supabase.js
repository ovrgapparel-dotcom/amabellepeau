/**
 * AMABELLEPEAU — Supabase Client
 * ================================
 * Initialisation du client Supabase avec les credentials du projet.
 *
 * Projet : uwtbmntwujtcybusxsen
 * URL    : https://uwtbmntwujtcybusxsen.supabase.co
 *
 * Note: La clé anon est publique — elle est sécurisée par les Row Level Security (RLS)
 * policies définies dans le dashboard Supabase.
 */

import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

const SUPABASE_URL  = 'https://uwtbmntwujtcybusxsen.supabase.co';
const SUPABASE_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV3dGJtbnR3dWp0Y3lidXN4c2VuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTMwMzI3MjIsImV4cCI6MjEwODYwODcyMn0.3WaCiwJKpSk1QE4dYnBGxZemqJktsSmzQwICPaV5xao';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON, {
  auth: {
    autoRefreshToken: true,
    persistSession:   true,
    detectSessionInUrl: true,
    storage: localStorage,
  },
});

/* ─────────────────────────────────────────────────────────────
   AUTH HELPERS
   ───────────────────────────────────────────────────────────── */

/** Créer un compte client */
export async function signUp({ email, password, firstName, lastName, phone }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        first_name: firstName,
        last_name:  lastName,
        phone,
        role: 'customer',
      },
      emailRedirectTo: `${window.location.origin}/auth.html#confirmed`,
    },
  });
  if (error) throw error;
  return data;
}

/** Connexion */
export async function signIn({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data;
}

/** Déconnexion */
export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
  window.location.href = '/auth.html';
}

/** Réinitialisation du mot de passe */
export async function resetPassword(email) {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/auth.html#reset`,
  });
  if (error) throw error;
}

/** Obtenir l'utilisateur connecté */
export async function getCurrentUser() {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

/** Vérifier si connecté */
export async function isAuthenticated() {
  const user = await getCurrentUser();
  return !!user;
}

/* ─────────────────────────────────────────────────────────────
   PRODUITS
   ───────────────────────────────────────────────────────────── */

/** Récupérer les produits avec filtres */
export async function getProducts({ categoryId, merchantId, search, minPrice, maxPrice, limit = 12, page = 0 } = {}) {
  let query = supabase
    .from('merchant_listings')
    .select(`
      id, price_xof, stock_quantity, active, sku,
      products (
        id, title, description, review_status,
        brands ( name ),
        categories ( name, slug ),
        product_images ( storage_key, position )
      ),
      merchant_profiles ( id, display_name )
    `)
    .eq('active', true)
    .eq('products.review_status', 'approved')
    .gt('stock_quantity', 0)
    .order('id', { ascending: false })
    .range(page * limit, (page + 1) * limit - 1);

  if (categoryId)  query = query.eq('products.categories.id', categoryId);
  if (merchantId)  query = query.eq('merchant_id', merchantId);
  if (search)      query = query.ilike('products.title', `%${search}%`);
  if (minPrice)    query = query.gte('price_xof', minPrice);
  if (maxPrice)    query = query.lte('price_xof', maxPrice);

  const { data, error } = await query;
  if (error) throw error;
  return data;
}

/** Récupérer un produit par ID */
export async function getProduct(listingId) {
  const { data, error } = await supabase
    .from('merchant_listings')
    .select(`
      id, price_xof, stock_quantity, active, sku,
      products (
        id, title, description, ingredients, usage_instructions,
        brands ( name ),
        categories ( name, slug ),
        product_images ( storage_key, position )
      ),
      merchant_profiles ( id, display_name )
    `)
    .eq('id', listingId)
    .single();
  if (error) throw error;
  return data;
}

/** Récupérer les catégories */
export async function getCategories() {
  const { data, error } = await supabase
    .from('categories')
    .select('id, name, slug, parent_id')
    .eq('active', true)
    .order('name');
  if (error) throw error;
  return data;
}

/* ─────────────────────────────────────────────────────────────
   COMMANDES
   ───────────────────────────────────────────────────────────── */

/** Créer une commande */
export async function createOrder(orderData) {
  const user = await getCurrentUser();
  if (!user) throw new Error('Non authentifié');

  const { data, error } = await supabase
    .from('orders')
    .insert({
      customer_id:            user.id,
      merchant_id:            orderData.merchantId,
      status:                 'pending_payment',
      currency:               'XOF',
      merchandise_subtotal_xof: orderData.subtotal,
      delivery_fee_xof:       orderData.deliveryFee,
      discount_xof:           orderData.discount || 0,
      total_xof:              orderData.total,
      order_number:           orderData.orderNumber,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

/** Créer les items d'une commande */
export async function createOrderItems(orderId, items) {
  const rows = items.map(item => ({
    order_id:               orderId,
    listing_id:             item.productId,
    product_title_snapshot: item.name,
    sku_snapshot:           item.sku || item.variant || '',
    unit_price_xof:         item.price,
    quantity:               item.qty,
    line_total_xof:         item.price * item.qty,
  }));

  const { error } = await supabase.from('order_items').insert(rows);
  if (error) throw error;
}

/** Récupérer les commandes du client connecté */
export async function getMyOrders() {
  const user = await getCurrentUser();
  if (!user) throw new Error('Non authentifié');

  const { data, error } = await supabase
    .from('orders')
    .select(`
      id, order_number, status, total_xof, currency, created_at,
      merchant_profiles ( display_name ),
      order_items (
        id, product_title_snapshot, unit_price_xof, quantity, line_total_xof
      )
    `)
    .eq('customer_id', user.id)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

/* ─────────────────────────────────────────────────────────────
   PAIEMENTS
   ───────────────────────────────────────────────────────────── */

/** Enregistrer un paiement en attente */
export async function createPaymentRecord(orderId, provider, amount) {
  const { data, error } = await supabase
    .from('payments')
    .insert({
      order_id:  orderId,
      provider,
      amount_xof: amount,
      status:    'pending',
    })
    .select()
    .single();
  if (error) throw error;
  return data;
}

/** Marquer un paiement comme confirmé (après vérification manuelle MVP) */
export async function confirmPayment(paymentId, providerReference) {
  const { error } = await supabase
    .from('payments')
    .update({
      status:             'succeeded',
      provider_reference: providerReference,
      verified_at:        new Date().toISOString(),
    })
    .eq('id', paymentId);
  if (error) throw error;
}

/* ─────────────────────────────────────────────────────────────
   MARCHANDS (portail marchand)
   ───────────────────────────────────────────────────────────── */

/** Récupérer les commandes d'un marchand */
export async function getMerchantOrders(merchantId) {
  const { data, error } = await supabase
    .from('orders')
    .select(`
      id, order_number, status, total_xof, created_at,
      users ( name, phone ),
      order_items (
        product_title_snapshot, quantity, unit_price_xof, line_total_xof
      )
    `)
    .eq('merchant_id', merchantId)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
}

/** Accepter une commande */
export async function acceptOrder(orderId) {
  const { error } = await supabase
    .from('orders')
    .update({ status: 'accepted' })
    .eq('id', orderId);
  if (error) throw error;
}

/** Rejeter une commande */
export async function rejectOrder(orderId, reason) {
  const { error } = await supabase
    .from('orders')
    .update({ status: 'cancelled' })
    .eq('id', orderId);
  if (error) throw error;
}

/* ─────────────────────────────────────────────────────────────
   STORAGE — Images produits
   ───────────────────────────────────────────────────────────── */

/** Obtenir l'URL publique d'une image */
export function getImageUrl(storageKey) {
  if (!storageKey) return null;
  const { data } = supabase.storage.from('product-images').getPublicUrl(storageKey);
  return data.publicUrl;
}

/** Uploader une image produit (portail marchand) */
export async function uploadProductImage(file, productId) {
  const ext  = file.name.split('.').pop();
  const path = `products/${productId}/${Date.now()}.${ext}`;

  const { data, error } = await supabase.storage
    .from('product-images')
    .upload(path, file, { cacheControl: '3600', upsert: false });

  if (error) throw error;
  return data.path;
}

/* ─────────────────────────────────────────────────────────────
   AUTH STATE LISTENER — Met à jour l'UI au changement de session
   ───────────────────────────────────────────────────────────── */

supabase.auth.onAuthStateChange((event, session) => {
  window.dispatchEvent(new CustomEvent('auth:change', { detail: { event, session } }));

  const user = session?.user;

  // Mettre à jour les liens "Mon Compte" dans la navbar
  document.querySelectorAll('.nav-account-link').forEach(el => {
    el.href = user ? '/compte.html' : '/auth.html';
    el.title = user ? `Connecté: ${user.email}` : 'Se connecter';
  });

  // Afficher/masquer les éléments selon l'état de connexion
  document.querySelectorAll('[data-auth="required"]').forEach(el => {
    el.style.display = user ? '' : 'none';
  });
  document.querySelectorAll('[data-auth="guest"]').forEach(el => {
    el.style.display = user ? 'none' : '';
  });
});
