-- ================================================================
-- AMABELLEPEAU — Schéma Supabase complet
-- Exécuter dans: Supabase Dashboard > SQL Editor
-- Projet: uwtbmntwujtcybusxsen
-- ================================================================

-- Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ────────────────────────────────────────────────────────────────
-- UTILISATEURS & RÔLES
-- ────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS users (
  id          UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name        TEXT,
  email       TEXT,
  phone       TEXT,
  status      TEXT DEFAULT 'active' CHECK (status IN ('active','suspended','banned')),
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS user_roles (
  user_id     UUID REFERENCES users(id) ON DELETE CASCADE,
  role        TEXT CHECK (role IN ('customer','merchant','admin','operations')),
  merchant_id UUID,
  PRIMARY KEY (user_id, role)
);

-- ────────────────────────────────────────────────────────────────
-- MARCHANDS
-- ────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS merchant_profiles (
  id                    UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  owner_user_id         UUID REFERENCES users(id),
  display_name          TEXT NOT NULL,
  business_details      JSONB,
  approval_status       TEXT DEFAULT 'pending' CHECK (approval_status IN ('pending','approved','rejected','suspended')),
  default_commission_rate INTEGER DEFAULT 1500,  -- 15% en basis points
  created_at            TIMESTAMPTZ DEFAULT NOW()
);

-- ────────────────────────────────────────────────────────────────
-- CATALOGUE
-- ────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS brands (
  id                   UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name                 TEXT NOT NULL,
  owner_merchant_id    UUID REFERENCES merchant_profiles(id),
  verification_status  TEXT DEFAULT 'pending'
);

CREATE TABLE IF NOT EXISTS categories (
  id        UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  parent_id UUID REFERENCES categories(id),
  name      TEXT NOT NULL,
  slug      TEXT UNIQUE NOT NULL,
  active    BOOLEAN DEFAULT TRUE
);

-- Catégories AMABELLEPEAU par défaut
INSERT INTO categories (name, slug) VALUES
  ('Savons Artisanaux', 'savons-artisanaux'),
  ('Soins Visage', 'soins-visage'),
  ('Soins Corps', 'soins-corps'),
  ('Parfums Naturels', 'parfums-naturels'),
  ('Soins Cheveux', 'soins-cheveux'),
  ('Bien-être', 'bien-etre')
ON CONFLICT (slug) DO NOTHING;

CREATE TABLE IF NOT EXISTS products (
  id                  UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  brand_id            UUID REFERENCES brands(id),
  category_id         UUID REFERENCES categories(id),
  title               TEXT NOT NULL,
  description         TEXT,
  ingredients         TEXT,
  usage_instructions  TEXT,
  review_status       TEXT DEFAULT 'pending' CHECK (review_status IN ('pending','approved','rejected'))
);

CREATE TABLE IF NOT EXISTS merchant_listings (
  id              UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  merchant_id     UUID REFERENCES merchant_profiles(id),
  product_id      UUID REFERENCES products(id),
  sku             TEXT,
  price_xof       INTEGER NOT NULL,
  stock_quantity  INTEGER DEFAULT 0,
  active          BOOLEAN DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS product_images (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id  UUID REFERENCES products(id),
  listing_id  UUID REFERENCES merchant_listings(id),
  storage_key TEXT NOT NULL,
  position    INTEGER DEFAULT 0
);

-- ────────────────────────────────────────────────────────────────
-- ZONES DE SERVICE
-- ────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS service_zones (
  id                  UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name                TEXT NOT NULL,
  coverage_definition JSONB,
  active              BOOLEAN DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS merchant_service_zones (
  merchant_id     UUID REFERENCES merchant_profiles(id),
  service_zone_id UUID REFERENCES service_zones(id),
  cod_enabled     BOOLEAN DEFAULT FALSE,
  PRIMARY KEY (merchant_id, service_zone_id)
);

-- Zones Abidjan par défaut
INSERT INTO service_zones (name) VALUES
  ('Cocody'), ('Plateau'), ('Marcory'), ('Treichville'),
  ('Adjamé'), ('Abobo'), ('Yopougon'), ('Koumassi'), ('Port-Bouët')
ON CONFLICT DO NOTHING;

-- ────────────────────────────────────────────────────────────────
-- ADRESSES CLIENTS
-- ────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS customer_addresses (
  id        UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id   UUID REFERENCES users(id),
  label     TEXT,
  area      TEXT,
  landmark  TEXT,
  latitude  DECIMAL(10,8),
  longitude DECIMAL(11,8)
);

-- ────────────────────────────────────────────────────────────────
-- INFLUENCEURS & CODES PROMO
-- ────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS influencers (
  id                    UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name                  TEXT NOT NULL,
  phone                 TEXT NOT NULL,
  social_handle         TEXT,
  platform              TEXT CHECK (platform IN ('instagram','tiktok','facebook','youtube','whatsapp','other')),
  promo_code            TEXT UNIQUE NOT NULL,
  commission_rate_bps   INTEGER DEFAULT 1000  CHECK (commission_rate_bps BETWEEN 0 AND 10000),
  discount_bps          INTEGER DEFAULT 0     CHECK (discount_bps BETWEEN 0 AND 5000),
  status                TEXT DEFAULT 'active' CHECK (status IN ('active','inactive','suspended')),
  total_sales_xof       INTEGER DEFAULT 0,
  total_commission_xof  INTEGER DEFAULT 0,
  total_paid_xof        INTEGER DEFAULT 0,
  notes                 TEXT,
  created_at            TIMESTAMPTZ DEFAULT NOW(),
  updated_at            TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS promo_code_usages (
  id              UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  influencer_id   UUID REFERENCES influencers(id),
  order_id        UUID,  -- FK added after orders table
  buyer_name      TEXT NOT NULL,
  buyer_phone     TEXT NOT NULL,
  promo_code      TEXT NOT NULL,
  order_total_xof INTEGER NOT NULL,
  discount_xof    INTEGER DEFAULT 0,
  commission_xof  INTEGER NOT NULL,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS influencer_payouts (
  id              UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  influencer_id   UUID REFERENCES influencers(id),
  amount_xof      INTEGER NOT NULL,
  status          TEXT DEFAULT 'pending' CHECK (status IN ('pending','paid','cancelled')),
  payment_method  TEXT CHECK (payment_method IN ('wave','orange_money','cash','other')),
  reference       TEXT,
  notes           TEXT,
  paid_at         TIMESTAMPTZ,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ────────────────────────────────────────────────────────────────
-- COMMANDES
-- ────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS orders (
  id                       UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_number             TEXT UNIQUE NOT NULL,
  customer_id              UUID REFERENCES users(id),
  merchant_id              UUID REFERENCES merchant_profiles(id),
  status                   TEXT DEFAULT 'pending_payment' CHECK (status IN (
    'pending_payment','paid','accepted','preparing',
    'ready_for_pickup','delivery_assigned','out_for_delivery',
    'delivered','completed','cancelled','refund_pending','refunded'
  )),
  currency                 TEXT DEFAULT 'XOF',
  merchandise_subtotal_xof INTEGER NOT NULL,
  delivery_fee_xof         INTEGER DEFAULT 0,
  discount_xof             INTEGER DEFAULT 0,
  total_xof                INTEGER NOT NULL,
  promo_code               TEXT,
  influencer_id            UUID REFERENCES influencers(id),
  delivery_address         JSONB,
  customer_notes           TEXT,
  created_at               TIMESTAMPTZ DEFAULT NOW(),
  updated_at               TIMESTAMPTZ DEFAULT NOW()
);

-- Ajouter FK order_id après création de orders
ALTER TABLE promo_code_usages
  ADD CONSTRAINT fk_promo_order
  FOREIGN KEY (order_id) REFERENCES orders(id)
  DEFERRABLE INITIALLY DEFERRED;

CREATE TABLE IF NOT EXISTS order_items (
  id                       UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id                 UUID REFERENCES orders(id),
  listing_id               UUID REFERENCES merchant_listings(id),
  product_title_snapshot   TEXT NOT NULL,
  sku_snapshot             TEXT,
  unit_price_xof           INTEGER NOT NULL,
  quantity                 INTEGER NOT NULL,
  line_total_xof           INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS order_status_events (
  id              UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id        UUID REFERENCES orders(id),
  previous_status TEXT,
  new_status      TEXT NOT NULL,
  actor_id        UUID REFERENCES users(id),
  notes           TEXT,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ────────────────────────────────────────────────────────────────
-- PAIEMENTS
-- ────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS payments (
  id                  UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id            UUID REFERENCES orders(id),
  provider            TEXT CHECK (provider IN ('wave','orange_money','cash_on_delivery','other')),
  provider_reference  TEXT,
  amount_xof          INTEGER NOT NULL,
  status              TEXT DEFAULT 'pending' CHECK (status IN (
    'pending','succeeded','failed','expired','cancelled',
    'refund_pending','refunded','requires_reconciliation'
  )),
  verified_at         TIMESTAMPTZ,
  created_at          TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS refunds (
  id                  UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  payment_id          UUID REFERENCES payments(id),
  amount_xof          INTEGER NOT NULL,
  reason              TEXT,
  status              TEXT DEFAULT 'pending' CHECK (status IN ('pending','approved','completed','rejected')),
  provider_reference  TEXT,
  created_at          TIMESTAMPTZ DEFAULT NOW()
);

-- ────────────────────────────────────────────────────────────────
-- LIVRAISON
-- ────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS delivery_jobs (
  id                UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id          UUID REFERENCES orders(id),
  provider          TEXT DEFAULT 'manual',
  booking_reference TEXT,
  quoted_fee_xof    INTEGER,
  status            TEXT DEFAULT 'pending' CHECK (status IN (
    'pending','assigned','picked_up','in_transit','delivered','failed','returned'
  )),
  dispatched_at     TIMESTAMPTZ,
  delivered_at      TIMESTAMPTZ,
  notes             TEXT,
  created_at        TIMESTAMPTZ DEFAULT NOW()
);

-- ────────────────────────────────────────────────────────────────
-- FINANCE / LEDGER
-- ────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS commission_rules (
  id              UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  merchant_id     UUID REFERENCES merchant_profiles(id),
  rate_basis_points INTEGER NOT NULL DEFAULT 1500,
  effective_from  TIMESTAMPTZ DEFAULT NOW(),
  effective_to    TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS ledger_entries (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  merchant_id UUID REFERENCES merchant_profiles(id),
  order_id    UUID REFERENCES orders(id),
  entry_type  TEXT CHECK (entry_type IN ('sale','commission','refund','adjustment','payout')),
  amount_xof  INTEGER NOT NULL,
  currency    TEXT DEFAULT 'XOF',
  reference   TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS payouts (
  id                  UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  merchant_id         UUID REFERENCES merchant_profiles(id),
  amount_xof          INTEGER NOT NULL,
  provider            TEXT,
  provider_reference  TEXT,
  status              TEXT DEFAULT 'pending' CHECK (status IN ('pending','processing','completed','failed')),
  created_at          TIMESTAMPTZ DEFAULT NOW()
);

-- ────────────────────────────────────────────────────────────────
-- AUDIT
-- ────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS audit_logs (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  actor_id    UUID REFERENCES users(id),
  action      TEXT NOT NULL,
  entity_type TEXT,
  entity_id   UUID,
  metadata    JSONB,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ────────────────────────────────────────────────────────────────
-- FONCTIONS RPC
-- ────────────────────────────────────────────────────────────────

-- Incrémenter les stats d'un influenceur après une vente
CREATE OR REPLACE FUNCTION increment_influencer_sales(
  p_influencer_id    UUID,
  p_sales_amount     INTEGER,
  p_commission_amount INTEGER
) RETURNS VOID AS $$
BEGIN
  UPDATE influencers
  SET
    total_sales_xof      = total_sales_xof + p_sales_amount,
    total_commission_xof = total_commission_xof + p_commission_amount,
    updated_at           = NOW()
  WHERE id = p_influencer_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Incrémenter le montant payé à un influenceur
CREATE OR REPLACE FUNCTION increment_influencer_paid(
  p_influencer_id UUID,
  p_paid_amount   INTEGER
) RETURNS VOID AS $$
BEGIN
  UPDATE influencers
  SET
    total_paid_xof = total_paid_xof + p_paid_amount,
    updated_at     = NOW()
  WHERE id = p_influencer_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ────────────────────────────────────────────────────────────────
-- ROW LEVEL SECURITY (RLS)
-- ────────────────────────────────────────────────────────────────

-- Activer RLS sur les tables sensibles
ALTER TABLE users                ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders               ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items          ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments             ENABLE ROW LEVEL SECURITY;
ALTER TABLE customer_addresses   ENABLE ROW LEVEL SECURITY;
ALTER TABLE merchant_listings    ENABLE ROW LEVEL SECURITY;
ALTER TABLE influencers          ENABLE ROW LEVEL SECURITY;
ALTER TABLE promo_code_usages    ENABLE ROW LEVEL SECURITY;
ALTER TABLE influencer_payouts   ENABLE ROW LEVEL SECURITY;

-- Policies: clients voient uniquement leurs données
CREATE POLICY "customers_own_orders"
  ON orders FOR SELECT
  USING (auth.uid() = customer_id);

CREATE POLICY "customers_own_addresses"
  ON customer_addresses FOR ALL
  USING (auth.uid() = user_id);

-- Influenceurs: lecture publique pour validation codes
CREATE POLICY "public_read_active_influencers"
  ON influencers FOR SELECT
  USING (status = 'active');

-- Produits actifs: lecture publique
ALTER TABLE products             ENABLE ROW LEVEL SECURITY;
ALTER TABLE merchant_profiles    ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public_read_approved_products"
  ON products FOR SELECT
  USING (review_status = 'approved');

CREATE POLICY "public_read_approved_merchants"
  ON merchant_profiles FOR SELECT
  USING (approval_status = 'approved');

-- ────────────────────────────────────────────────────────────────
-- INDEX DE PERFORMANCE
-- ────────────────────────────────────────────────────────────────

CREATE INDEX IF NOT EXISTS idx_orders_customer     ON orders(customer_id);
CREATE INDEX IF NOT EXISTS idx_orders_merchant     ON orders(merchant_id);
CREATE INDEX IF NOT EXISTS idx_orders_status       ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_influencer   ON orders(influencer_id);
CREATE INDEX IF NOT EXISTS idx_promo_influencer    ON promo_code_usages(influencer_id);
CREATE INDEX IF NOT EXISTS idx_listings_product    ON merchant_listings(product_id);
CREATE INDEX IF NOT EXISTS idx_listings_merchant   ON merchant_listings(merchant_id);
CREATE INDEX IF NOT EXISTS idx_influencer_code     ON influencers(promo_code);

-- ================================================================
-- FIN DU SCHÉMA
-- ================================================================
