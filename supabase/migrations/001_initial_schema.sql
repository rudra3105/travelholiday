-- Travel Holiday Travel Agency - Complete Database Schema
-- Run this in your Supabase SQL editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================
-- DESTINATIONS TABLE
-- =====================
CREATE TABLE destinations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  country VARCHAR(100) DEFAULT 'India',
  region VARCHAR(50) CHECK (region IN ('domestic', 'international')) NOT NULL,
  description TEXT,
  short_description VARCHAR(500),
  cover_image TEXT,
  gallery_images TEXT[] DEFAULT '{}',
  highlights TEXT[] DEFAULT '{}',
  best_time_to_visit VARCHAR(100),
  climate VARCHAR(255),
  language VARCHAR(100),
  currency VARCHAR(50),
  timezone VARCHAR(50),
  visa_required BOOLEAN DEFAULT false,
  featured BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================
-- PACKAGES TABLE
-- =====================
CREATE TABLE packages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(500) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  destination_id UUID REFERENCES destinations(id) ON DELETE SET NULL,
  type VARCHAR(50) CHECK (type IN ('domestic', 'international', 'honeymoon', 'adventure', 'pilgrimage')) NOT NULL,
  duration_days INTEGER NOT NULL CHECK (duration_days > 0),
  price_per_person DECIMAL(10,2) NOT NULL,
  original_price DECIMAL(10,2),
  max_people INTEGER DEFAULT 20,
  min_people INTEGER DEFAULT 1,
  cover_image TEXT,
  short_description VARCHAR(500),
  description TEXT,
  inclusions TEXT[] DEFAULT '{}',
  exclusions TEXT[] DEFAULT '{}',
  highlights TEXT[] DEFAULT '{}',
  featured BOOLEAN DEFAULT false,
  best_seller BOOLEAN DEFAULT false,
  rating DECIMAL(3,1) DEFAULT 4.5,
  reviews_count INTEGER DEFAULT 0,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================
-- PACKAGE IMAGES TABLE
-- =====================
CREATE TABLE package_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  package_id UUID REFERENCES packages(id) ON DELETE CASCADE NOT NULL,
  url TEXT NOT NULL,
  alt VARCHAR(255) DEFAULT '',
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================
-- ITINERARIES TABLE
-- =====================
CREATE TABLE itineraries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  package_id UUID REFERENCES packages(id) ON DELETE CASCADE NOT NULL,
  day_number INTEGER NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  activities TEXT[] DEFAULT '{}',
  meals TEXT[] DEFAULT '{}',
  accommodation VARCHAR(255) DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================
-- FIXED DEPARTURES TABLE
-- =====================
CREATE TABLE fixed_departures (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  package_id UUID REFERENCES packages(id) ON DELETE CASCADE NOT NULL,
  departure_date DATE NOT NULL,
  return_date DATE NOT NULL,
  price_per_person DECIMAL(10,2) NOT NULL,
  available_seats INTEGER NOT NULL DEFAULT 0,
  total_seats INTEGER NOT NULL DEFAULT 20,
  status VARCHAR(20) CHECK (status IN ('available', 'limited', 'sold_out', 'cancelled')) DEFAULT 'available',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================
-- INQUIRIES TABLE
-- =====================
CREATE TABLE inquiries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  type VARCHAR(20) CHECK (type IN ('general', 'package', 'destination', 'contact')) DEFAULT 'general',
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  destination VARCHAR(255),
  package_id UUID REFERENCES packages(id) ON DELETE SET NULL,
  travel_date VARCHAR(50),
  num_travelers INTEGER,
  budget VARCHAR(50),
  message TEXT NOT NULL,
  status VARCHAR(20) CHECK (status IN ('new', 'contacted', 'converted', 'closed')) DEFAULT 'new',
  admin_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================
-- TESTIMONIALS TABLE
-- =====================
CREATE TABLE testimonials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  location VARCHAR(255),
  avatar TEXT,
  rating INTEGER CHECK (rating BETWEEN 1 AND 5) NOT NULL DEFAULT 5,
  review TEXT NOT NULL,
  destination VARCHAR(255),
  travel_date VARCHAR(50),
  verified BOOLEAN DEFAULT false,
  featured BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================
-- GALLERY TABLE
-- =====================
CREATE TABLE gallery (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  url TEXT NOT NULL,
  alt VARCHAR(255) DEFAULT '',
  destination VARCHAR(255),
  category VARCHAR(100) DEFAULT 'general',
  featured BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================
-- FAQ TABLE
-- =====================
CREATE TABLE faq (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  category VARCHAR(100) DEFAULT 'general',
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================
-- SETTINGS TABLE
-- =====================
CREATE TABLE settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  key VARCHAR(255) UNIQUE NOT NULL,
  value TEXT,
  type VARCHAR(20) CHECK (type IN ('text', 'number', 'boolean', 'json', 'image')) DEFAULT 'text',
  label VARCHAR(255),
  group_name VARCHAR(100) DEFAULT 'general',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================
-- USERS (ADMIN) TABLE
-- =====================
CREATE TABLE admin_users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  role VARCHAR(20) CHECK (role IN ('admin', 'editor')) DEFAULT 'editor',
  last_login TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================
-- INDEXES
-- =====================
CREATE INDEX idx_packages_destination ON packages(destination_id);
CREATE INDEX idx_packages_type ON packages(type);
CREATE INDEX idx_packages_featured ON packages(featured);
CREATE INDEX idx_fixed_departures_date ON fixed_departures(departure_date);
CREATE INDEX idx_fixed_departures_status ON fixed_departures(status);
CREATE INDEX idx_inquiries_status ON inquiries(status);
CREATE INDEX idx_inquiries_created ON inquiries(created_at DESC);
CREATE INDEX idx_destinations_region ON destinations(region);
CREATE INDEX idx_destinations_slug ON destinations(slug);

-- =====================
-- ROW LEVEL SECURITY
-- =====================
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Public read access for content tables
CREATE POLICY "Public read destinations" ON destinations FOR SELECT USING (true);
CREATE POLICY "Public read packages" ON packages FOR SELECT USING (true);
CREATE POLICY "Public read testimonials" ON testimonials FOR SELECT USING (true);
CREATE POLICY "Public read gallery" ON gallery FOR SELECT USING (true);
CREATE POLICY "Public read faq" ON faq FOR SELECT USING (true);
CREATE POLICY "Public read fixed_departures" ON fixed_departures FOR SELECT USING (true);

-- Allow inquiry insertions from public
CREATE POLICY "Public insert inquiries" ON inquiries FOR INSERT WITH CHECK (true);

-- =====================
-- SEED DEFAULT SETTINGS
-- =====================
INSERT INTO settings (key, value, type, label, group_name) VALUES
  ('site_name', 'Travel Holiday', 'text', 'Site Name', 'general'),
  ('site_tagline', 'Crafting Extraordinary Journeys', 'text', 'Tagline', 'general'),
  ('contact_email', 'info.travelholidays@gmail.com', 'text', 'Contact Email', 'contact'),
  ('contact_phone', '+91 8108101218', 'text', 'Phone', 'contact'),
  ('whatsapp_number', '+91 7383751218', 'text', 'WhatsApp', 'contact'),
  ('address', 'Jetpur, Gujarat, India', 'text', 'Address', 'contact'),
  ('facebook_url', 'https://facebook.com/travelholiday', 'text', 'Facebook', 'social'),
  ('instagram_url', 'https://instagram.com/travelholiday', 'text', 'Instagram', 'social'),
  ('twitter_url', 'https://twitter.com/travelholiday', 'text', 'Twitter', 'social'),
  ('youtube_url', 'https://youtube.com/@travelholiday', 'text', 'YouTube', 'social');

-- =====================
-- UPDATED_AT TRIGGER
-- =====================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_destinations_updated BEFORE UPDATE ON destinations FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_packages_updated BEFORE UPDATE ON packages FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_settings_updated BEFORE UPDATE ON settings FOR EACH ROW EXECUTE FUNCTION update_updated_at();
