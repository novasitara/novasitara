-- ============================================================
-- NOVA SITARA — Security Hardening SQL
-- Run this in Supabase → SQL Editor → New Query
-- ============================================================

-- ── DROP ALL EXISTING POLICIES FIRST ────────────────────────
DROP POLICY IF EXISTS "Public insert applications" ON applications;
DROP POLICY IF EXISTS "Admin read/update applications" ON applications;
DROP POLICY IF EXISTS "Admin read applications" ON applications;
DROP POLICY IF EXISTS "Admin update applications" ON applications;

DROP POLICY IF EXISTS "Public insert enquiries" ON enquiries;
DROP POLICY IF EXISTS "Admin read enquiries" ON enquiries;
DROP POLICY IF EXISTS "Admin update enquiries" ON enquiries;

DROP POLICY IF EXISTS "Public read active jobs" ON jobs;
DROP POLICY IF EXISTS "Admin full access jobs" ON jobs;
DROP POLICY IF EXISTS "Admin write jobs" ON jobs;
DROP POLICY IF EXISTS "Admin update jobs" ON jobs;
DROP POLICY IF EXISTS "Admin delete jobs" ON jobs;

DROP POLICY IF EXISTS "Public read site content" ON site_content;
DROP POLICY IF EXISTS "Admin write site content" ON site_content;

DROP POLICY IF EXISTS "Public upload resumes" ON storage.objects;
DROP POLICY IF EXISTS "Admin read resumes" ON storage.objects;
DROP POLICY IF EXISTS "Admin delete resumes" ON storage.objects;

-- ── JOBS ─────────────────────────────────────────────────────
CREATE POLICY "Public read active jobs"
  ON jobs FOR SELECT
  TO anon, authenticated
  USING (is_active = TRUE);

CREATE POLICY "Admin write jobs"
  ON jobs FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Admin update jobs"
  ON jobs FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Admin delete jobs"
  ON jobs FOR DELETE
  TO authenticated
  USING (true);

-- ── APPLICATIONS ─────────────────────────────────────────────
CREATE POLICY "Public insert applications"
  ON applications FOR INSERT
  TO anon
  WITH CHECK (
    full_name IS NOT NULL AND length(full_name) <= 100 AND
    email IS NOT NULL AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$' AND
    phone IS NOT NULL AND length(phone) <= 20 AND
    job_id IS NOT NULL AND job_id ~ '^[a-z0-9-]+$'
  );

CREATE POLICY "Admin read applications"
  ON applications FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admin update applications"
  ON applications FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Admin delete applications"
  ON applications FOR DELETE
  TO authenticated
  USING (true);

-- ── ENQUIRIES ────────────────────────────────────────────────
CREATE POLICY "Public insert enquiries"
  ON enquiries FOR INSERT
  TO anon
  WITH CHECK (
    name IS NOT NULL AND length(name) <= 100 AND
    email IS NOT NULL AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$' AND
    message IS NOT NULL AND length(message) <= 2000
  );

CREATE POLICY "Admin read enquiries"
  ON enquiries FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admin update enquiries"
  ON enquiries FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Admin delete enquiries"
  ON enquiries FOR DELETE
  TO authenticated
  USING (true);

-- ── SITE CONTENT ─────────────────────────────────────────────
CREATE POLICY "Public read site content"
  ON site_content FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Admin write site content"
  ON site_content FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Admin update site content"
  ON site_content FOR UPDATE
  TO authenticated
  USING (true);

-- ── STORAGE ──────────────────────────────────────────────────
CREATE POLICY "Public upload resumes"
  ON storage.objects FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    bucket_id = 'resumes' AND
    (storage.extension(name)) = 'pdf'
  );

CREATE POLICY "Admin read resumes"
  ON storage.objects FOR SELECT
  TO authenticated
  USING (bucket_id = 'resumes');

CREATE POLICY "Admin delete resumes"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'resumes');

-- ── STORAGE BUCKET LIMITS ────────────────────────────────────
UPDATE storage.buckets
SET file_size_limit = 512000,
    allowed_mime_types = ARRAY['application/pdf']
WHERE name = 'resumes';

-- ── REVOKE ANON WRITE PERMISSIONS ────────────────────────────
REVOKE UPDATE ON applications FROM anon;
REVOKE DELETE ON applications FROM anon;
REVOKE UPDATE ON enquiries FROM anon;
REVOKE DELETE ON enquiries FROM anon;
REVOKE UPDATE ON jobs FROM anon;
REVOKE DELETE ON jobs FROM anon;
REVOKE UPDATE ON site_content FROM anon;
REVOKE DELETE ON site_content FROM anon;
