/**
 * AMABELLEPEAU — Système de Codes Promo Influenceurs
 * ====================================================
 * Valide les codes promo, applique les remises,
 * et enregistre les références pour le suivi des commissions.
 */

import { supabase } from './supabase.js';

/** Session de code promo actif pour cet achat */
let activePromo = null;

/**
 * Valide un code promo et retourne les détails de l'influenceur.
 * @param {string} code — Code promo saisi par l'acheteur
 * @returns {Object} { valid, influencer, discountRate, message }
 */
export async function validatePromoCode(code) {
  if (!code || code.trim().length < 2) {
    return { valid: false, message: 'Veuillez saisir un code promo valide.' };
  }

  const { data, error } = await supabase
    .from('influencers')
    .select('id, name, promo_code, commission_rate_bps, discount_bps, status')
    .eq('promo_code', code.trim().toUpperCase())
    .eq('status', 'active')
    .single();

  if (error || !data) {
    return { valid: false, message: 'Code promo invalide ou expiré.' };
  }

  const discountRate = data.discount_bps / 10000; // convertir bps en décimal

  activePromo = {
    influencerId:      data.id,
    influencerName:    data.name,
    code:              data.promo_code,
    commissionBps:     data.commission_rate_bps,
    discountBps:       data.discount_bps,
    discountRate,
  };

  const discountText = data.discount_bps > 0
    ? `Remise de ${data.discount_bps / 100}% appliquée !`
    : 'Code valide — merci d\'utiliser ce code !';

  return {
    valid: true,
    influencer: data,
    discountBps: data.discount_bps,
    discountRate,
    message: discountText,
  };
}

/**
 * Calcule la remise pour un sous-total donné.
 * @param {number} subtotalXof
 * @returns {number} montant de remise en XOF
 */
export function calculateDiscount(subtotalXof) {
  if (!activePromo || activePromo.discountBps === 0) return 0;
  return Math.round(subtotalXof * activePromo.discountRate);
}

/**
 * Retourne le promo actif (ou null).
 */
export function getActivePromo() { return activePromo; }

/**
 * Supprime le code promo actif.
 */
export function clearPromo() { activePromo = null; }

/**
 * Enregistre l'utilisation d'un code promo après validation du paiement.
 * Doit être appelé après createOrder() avec l'orderId retourné.
 *
 * @param {Object} params
 * @param {string} params.orderId
 * @param {string} params.buyerName
 * @param {string} params.buyerPhone
 * @param {number} params.orderTotalXof — Total AVANT remise
 * @param {number} params.discountXof
 */
export async function recordPromoUsage({ orderId, buyerName, buyerPhone, orderTotalXof, discountXof }) {
  if (!activePromo) return;

  const commissionBase = orderTotalXof - discountXof;
  const commissionXof  = Math.round(commissionBase * activePromo.commissionBps / 10000);

  const { error } = await supabase.from('promo_code_usages').insert({
    influencer_id:    activePromo.influencerId,
    order_id:         orderId,
    buyer_name:       buyerName,
    buyer_phone:      buyerPhone,
    promo_code:       activePromo.code,
    order_total_xof:  orderTotalXof,
    discount_xof:     discountXof,
    commission_xof:   commissionXof,
  });

  if (error) console.error('Erreur enregistrement promo:', error);

  // Mettre à jour les totaux de l'influenceur
  await supabase.rpc('increment_influencer_sales', {
    p_influencer_id:    activePromo.influencerId,
    p_sales_amount:     commissionBase,
    p_commission_amount: commissionXof,
  });

  clearPromo();
  return commissionXof;
}

/* ─── Admin: Gestion des influenceurs ─────────────────────── */

/** Créer un influenceur */
export async function createInfluencer(data) {
  const code = data.promoCode || generateCode(data.name);
  const { data: result, error } = await supabase
    .from('influencers')
    .insert({
      name:                data.name,
      phone:               data.phone,
      social_handle:       data.socialHandle,
      platform:            data.platform,
      promo_code:          code.toUpperCase(),
      commission_rate_bps: Math.round((data.commissionRate || 10) * 100),
      discount_bps:        Math.round((data.discountRate || 0) * 100),
      status:              'active',
      notes:               data.notes,
    })
    .select()
    .single();

  if (error) throw error;
  return result;
}

/** Lister tous les influenceurs (admin) */
export async function getInfluencers({ status, search } = {}) {
  let query = supabase
    .from('influencers')
    .select(`
      id, name, phone, social_handle, platform, promo_code,
      commission_rate_bps, discount_bps, status,
      total_sales_xof, total_commission_xof, total_paid_xof,
      created_at,
      promo_code_usages ( count )
    `)
    .order('created_at', { ascending: false });

  if (status) query = query.eq('status', status);
  if (search) query = query.or(`name.ilike.%${search}%,promo_code.ilike.%${search}%`);

  const { data, error } = await query;
  if (error) throw error;
  return data;
}

/** Détail influenceur + ses ventes */
export async function getInfluencerDetail(id) {
  const { data, error } = await supabase
    .from('influencers')
    .select(`
      *,
      promo_code_usages (
        id, buyer_name, buyer_phone, order_total_xof,
        discount_xof, commission_xof, created_at,
        orders ( order_number, status )
      ),
      influencer_payouts (
        id, amount_xof, status, payment_method, reference, paid_at
      )
    `)
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
}

/** Mettre à jour un influenceur */
export async function updateInfluencer(id, updates) {
  const { error } = await supabase
    .from('influencers')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id);
  if (error) throw error;
}

/** Activer / désactiver un influenceur */
export async function toggleInfluencerStatus(id, status) {
  await updateInfluencer(id, { status });
}

/** Créer un paiement influenceur */
export async function createInfluencerPayout({ influencerId, amountXof, method, reference, notes }) {
  const { data, error } = await supabase
    .from('influencer_payouts')
    .insert({
      influencer_id:  influencerId,
      amount_xof:     amountXof,
      status:         'paid',
      payment_method: method,
      reference,
      notes,
      paid_at:        new Date().toISOString(),
    })
    .select()
    .single();

  if (error) throw error;

  // Mettre à jour total_paid_xof de l'influenceur
  await supabase.rpc('increment_influencer_paid', {
    p_influencer_id: influencerId,
    p_paid_amount:   amountXof,
  });

  return data;
}

/* ─── Utilitaires ─────────────────────────────────────────── */

/** Génère un code promo depuis le nom de l'influenceur */
function generateCode(name) {
  const base = name
    .toUpperCase()
    .replace(/\s+/g, '')
    .replace(/[^A-Z0-9]/g, '')
    .substring(0, 6);
  const suffix = Math.random().toString(36).substring(2, 5).toUpperCase();
  return `${base}${suffix}`;
}

/** Formate les basis points en % lisible */
export function bpsToPercent(bps) {
  return `${(bps / 100).toFixed(0)}%`;
}

/** Calcule le solde dû à un influenceur */
export function getInfluencerBalance(influencer) {
  return (influencer.total_commission_xof || 0) - (influencer.total_paid_xof || 0);
}
