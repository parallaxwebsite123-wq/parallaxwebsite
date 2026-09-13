-- ==============================================================================
-- PARALLAX PERFUMERY — SUPABASE INITIAL DATABASE SCHEMA & SECURITY SETUP
-- ==============================================================================

-- 1. INQUIRIES TABLE
-- Holds submissions from "DOUBTS? CONTACT US" and "GET A QUICK QUOTE"
CREATE TABLE IF NOT EXISTS public.inquiries (
  id TEXT PRIMARY KEY DEFAULT 'inq_' || extract(epoch from now())::bigint || '_' || substr(md5(random()::text), 1, 6),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  service TEXT NOT NULL,
  source TEXT DEFAULT 'Website Inquiry',
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'resolved')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Index for fast status & date sorting in Admin Portal
CREATE INDEX IF NOT EXISTS idx_inquiries_status ON public.inquiries(status);
CREATE INDEX IF NOT EXISTS idx_inquiries_created_at ON public.inquiries(created_at DESC);

-- 2. HOMEPAGE CONTENT TABLE
-- Stores full CMS JSON layout for Hero, Banners, Products & Capabilities sections
CREATE TABLE IF NOT EXISTS public.homepage_content (
  id TEXT PRIMARY KEY DEFAULT 'published',
  hero JSONB NOT NULL DEFAULT '{}'::jsonb,
  mobile_hero JSONB NOT NULL DEFAULT '{}'::jsonb,
  about_banner JSONB NOT NULL DEFAULT '{}'::jsonb,
  about_mobile_banner JSONB NOT NULL DEFAULT '{}'::jsonb,
  products JSONB NOT NULL DEFAULT '[]'::jsonb,
  capabilities JSONB NOT NULL DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 3. HOMEPAGE PRODUCTS TABLE
CREATE TABLE IF NOT EXISTS public.homepage_products (
  id TEXT PRIMARY KEY,
  category TEXT NOT NULL,
  title TEXT NOT NULL,
  link TEXT NOT NULL,
  image_url TEXT NOT NULL,
  image_alt TEXT DEFAULT '',
  sort_order INT DEFAULT 0,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 4. CAPABILITIES TABLE
CREATE TABLE IF NOT EXISTS public.capabilities (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  image_url TEXT NOT NULL,
  image_alt TEXT DEFAULT '',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 5. SITE SETTINGS TABLE
CREATE TABLE IF NOT EXISTS public.site_settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ==============================================================================
-- STORAGE BUCKETS SETUP
-- ==============================================================================
INSERT INTO storage.buckets (id, name, public)
VALUES ('website-assets', 'website-assets', true)
ON CONFLICT (id) DO NOTHING;

-- Recommended directory structure inside 'website-assets' bucket:
-- website-assets/
--   ├── homepage/
--   ├── capabilities/
--   ├── manufacturing-formats/
--   ├── fragrance-library/
--   ├── about/
--   └── branding/

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

-- Enable RLS on all tables
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.homepage_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.homepage_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.capabilities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- ------------------------------------------------------------------------------
-- POLICIES: INQUIRIES
-- ------------------------------------------------------------------------------
-- Public visitors can create inquiries (both DOUBTS? CONTACT US & GET A QUICK QUOTE)
CREATE POLICY "Public insert inquiries" 
  ON public.inquiries FOR INSERT 
  WITH CHECK (true);

-- Only authenticated admins can view, update, or delete inquiries
CREATE POLICY "Admins select inquiries" 
  ON public.inquiries FOR SELECT 
  TO authenticated 
  USING (true);

CREATE POLICY "Admins update inquiries" 
  ON public.inquiries FOR UPDATE 
  TO authenticated 
  USING (true);

CREATE POLICY "Admins delete inquiries" 
  ON public.inquiries FOR DELETE 
  TO authenticated 
  USING (true);

-- ------------------------------------------------------------------------------
-- POLICIES: PUBLIC CONTENT (homepage_content, products, capabilities, settings)
-- ------------------------------------------------------------------------------
CREATE POLICY "Public select homepage_content" 
  ON public.homepage_content FOR SELECT USING (true);

CREATE POLICY "Public select homepage_products" 
  ON public.homepage_products FOR SELECT USING (true);

CREATE POLICY "Public select capabilities" 
  ON public.capabilities FOR SELECT USING (true);

CREATE POLICY "Public select site_settings" 
  ON public.site_settings FOR SELECT USING (true);

-- Admins full access to content tables
CREATE POLICY "Admin manage homepage_content" 
  ON public.homepage_content FOR ALL TO authenticated USING (true);

CREATE POLICY "Admin manage homepage_products" 
  ON public.homepage_products FOR ALL TO authenticated USING (true);

CREATE POLICY "Admin manage capabilities" 
  ON public.capabilities FOR ALL TO authenticated USING (true);

CREATE POLICY "Admin manage site_settings" 
  ON public.site_settings FOR ALL TO authenticated USING (true);

-- ------------------------------------------------------------------------------
-- POLICIES: STORAGE (website-assets)
-- ------------------------------------------------------------------------------
CREATE POLICY "Public read website-assets" 
  ON storage.objects FOR SELECT 
  USING (bucket_id = 'website-assets');

CREATE POLICY "Admin upload website-assets" 
  ON storage.objects FOR INSERT 
  TO authenticated 
  WITH CHECK (bucket_id = 'website-assets');

CREATE POLICY "Admin update website-assets" 
  ON storage.objects FOR UPDATE 
  TO authenticated 
  USING (bucket_id = 'website-assets');

CREATE POLICY "Admin delete website-assets" 
  ON storage.objects FOR DELETE 
  TO authenticated 
  USING (bucket_id = 'website-assets');
