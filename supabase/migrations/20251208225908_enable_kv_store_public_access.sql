-- Enable public read access to kv_store_dcec270f table
-- This allows the client to read seeded data without authentication

-- Enable RLS on the table (if not already enabled)
ALTER TABLE kv_store_dcec270f ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if any
DROP POLICY IF EXISTS "allow_public_read" ON kv_store_dcec270f;

-- Create policy to allow public read access
CREATE POLICY "allow_public_read"
ON kv_store_dcec270f
FOR SELECT
TO public
USING (true);

-- Optional: Add policy for service role to write (used by seed function)
DROP POLICY IF EXISTS "allow_service_role_all" ON kv_store_dcec270f;

CREATE POLICY "allow_service_role_all"
ON kv_store_dcec270f
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);
