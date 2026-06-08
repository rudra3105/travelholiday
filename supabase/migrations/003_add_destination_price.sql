-- Add starting_price column to destinations table
-- This allows admins to manually set a display price for each destination
-- (overrides the auto-computed minimum price from packages)
ALTER TABLE destinations 
  ADD COLUMN IF NOT EXISTS starting_price DECIMAL(10,2) DEFAULT 0;
