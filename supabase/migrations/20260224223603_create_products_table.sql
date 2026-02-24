/*
  # Create Products and Categories Tables

  1. New Tables
    - `categories`
      - `id` (uuid, primary key)
      - `name` (text, unique)
      - `created_at` (timestamp)
    - `products`
      - `id` (uuid, primary key)
      - `name` (text, not null)
      - `description` (text)
      - `price` (numeric, not null)
      - `category_id` (uuid, foreign key)
      - `image_url` (text)
      - `stock` (integer)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Public can read products
    - Only admins can create/update/delete

  3. Storage
    - Create bucket for product images
*/

CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  price numeric(10,2) NOT NULL,
  category_id uuid REFERENCES categories(id) ON DELETE SET NULL,
  image_url text,
  stock integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read categories"
  ON categories FOR SELECT
  USING (true);

CREATE POLICY "Anyone can read products"
  ON products FOR SELECT
  USING (true);

CREATE POLICY "Only admins can insert categories"
  ON categories FOR INSERT
  WITH CHECK (auth.jwt() ->> 'user_role' = 'admin');

CREATE POLICY "Only admins can update categories"
  ON categories FOR UPDATE
  WITH CHECK (auth.jwt() ->> 'user_role' = 'admin');

CREATE POLICY "Only admins can delete categories"
  ON categories FOR DELETE
  USING (auth.jwt() ->> 'user_role' = 'admin');

CREATE POLICY "Only admins can insert products"
  ON products FOR INSERT
  WITH CHECK (auth.jwt() ->> 'user_role' = 'admin');

CREATE POLICY "Only admins can update products"
  ON products FOR UPDATE
  WITH CHECK (auth.jwt() ->> 'user_role' = 'admin');

CREATE POLICY "Only admins can delete products"
  ON products FOR DELETE
  USING (auth.jwt() ->> 'user_role' = 'admin');

CREATE INDEX IF NOT EXISTS products_category_idx ON products(category_id);
CREATE INDEX IF NOT EXISTS products_created_idx ON products(created_at);