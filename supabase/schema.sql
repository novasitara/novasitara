-- ============================================================
-- NOVA SITARA — Supabase Schema
-- Run this in Supabase → SQL Editor → New Query
-- ============================================================

-- ── JOBS ────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS jobs (
  id              TEXT PRIMARY KEY,
  title           TEXT NOT NULL,
  location        TEXT NOT NULL,
  type            TEXT NOT NULL,
  experience      TEXT NOT NULL,
  department      TEXT NOT NULL,
  posted_date     TEXT NOT NULL DEFAULT 'Recent',
  overview        TEXT NOT NULL,
  responsibilities TEXT[] NOT NULL DEFAULT '{}',
  requirements    TEXT[] NOT NULL DEFAULT '{}',
  preferred_skills TEXT[] NOT NULL DEFAULT '{}',
  benefits        TEXT[] NOT NULL DEFAULT '{}',
  is_active       BOOLEAN NOT NULL DEFAULT TRUE,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── APPLICATIONS ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS applications (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id              TEXT NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
  full_name           TEXT NOT NULL,
  email               TEXT NOT NULL,
  phone               TEXT NOT NULL,
  current_location    TEXT NOT NULL,
  years_of_experience TEXT NOT NULL,
  primary_skill       TEXT NOT NULL,
  linkedin_url        TEXT,
  cover_letter        TEXT,
  resume_file_url     TEXT,
  resume_file_name    TEXT,
  status              TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new','reviewed','shortlisted','rejected')),
  created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── ENQUIRIES ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS enquiries (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name                TEXT NOT NULL,
  email               TEXT NOT NULL,
  phone               TEXT NOT NULL,
  company             TEXT,
  service_requirement TEXT NOT NULL,
  message             TEXT NOT NULL,
  status              TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new','read','responded')),
  created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── SITE CONTENT ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS site_content (
  key        TEXT PRIMARY KEY,
  value      JSONB NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── AUTO UPDATE updated_at ───────────────────────────────────
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER jobs_updated_at
  BEFORE UPDATE ON jobs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER site_content_updated_at
  BEFORE UPDATE ON site_content
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

ALTER TABLE jobs         ENABLE ROW LEVEL SECURITY;
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE enquiries    ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;

-- JOBS: anyone can read active jobs, only admin can write
CREATE POLICY "Public read active jobs"
  ON jobs FOR SELECT
  USING (is_active = TRUE);

CREATE POLICY "Admin full access jobs"
  ON jobs FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- APPLICATIONS: anyone can insert, only admin can read/update
CREATE POLICY "Public insert applications"
  ON applications FOR INSERT
  WITH CHECK (TRUE);

CREATE POLICY "Admin read/update applications"
  ON applications FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Admin update applications"
  ON applications FOR UPDATE
  USING (auth.role() = 'authenticated');

-- ENQUIRIES: anyone can insert, only admin can read/update
CREATE POLICY "Public insert enquiries"
  ON enquiries FOR INSERT
  WITH CHECK (TRUE);

CREATE POLICY "Admin read enquiries"
  ON enquiries FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Admin update enquiries"
  ON enquiries FOR UPDATE
  USING (auth.role() = 'authenticated');

-- SITE CONTENT: anyone can read, only admin can write
CREATE POLICY "Public read site content"
  ON site_content FOR SELECT
  USING (TRUE);

CREATE POLICY "Admin write site content"
  ON site_content FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- ============================================================
-- STORAGE BUCKET (run separately if needed)
-- ============================================================
-- Go to Supabase → Storage → New Bucket
-- Name: resumes
-- Public: FALSE (private)
-- Then add these policies:

-- INSERT policy (anyone can upload):
-- (storage.foldername(name))[1] is the jobId folder
CREATE POLICY "Public upload resumes"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'resumes');

-- SELECT policy (only admin can download):
CREATE POLICY "Admin read resumes"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'resumes' AND auth.role() = 'authenticated');

-- ============================================================
-- SEED JOBS DATA (existing jobs from frontend)
-- ============================================================
INSERT INTO jobs (id, title, location, type, experience, department, overview, responsibilities, requirements, preferred_skills, benefits) VALUES
(
  'vistex-consultant', 'SAP Vistex Consultant', 'India', 'Full Time', '3+ Years', 'Vistex Practice',
  'Nova Sitara is seeking an experienced SAP Vistex Consultant to join our consulting practice.',
  ARRAY['Support Vistex solution configuration and functional requirement mapping.','Collaborate with SAP SD and functional teams to ensure system alignment.','Participate in requirement discussions, documentation, and testing.','Support functional enhancements and troubleshooting during project lifecycles.','Provide user support and hypercare assistance during system cutover.'],
  ARRAY['Minimum 3 years of hands-on experience in SAP Vistex consulting.','Solid understanding of SAP SD and pricing concepts.','Experience in Vistex implementation or enhancement projects.','Strong communication and collaborative stakeholder management skills.'],
  ARRAY['Experience with custom Vistex enhancements.','Familiarity with ABAP debugging concepts.'],
  ARRAY['Competitive compensation structure.','Flexible engagement and working arrangements.','Opportunities to work on diverse project environments.']
),
(
  'sap-ewm-consultant', 'SAP EWM Consultant', 'India', 'Full Time', '3+ Years', 'Logistics Practice',
  'We are looking for a skilled SAP EWM Consultant to support warehouse logistics and inventory optimization projects.',
  ARRAY['Configure SAP Extended Warehouse Management (EWM) functional structures and process flows.','Support RF framework setup and warehouse process alignment.','Assist in integration testing between SAP EWM and core modules.','Deliver functional documentation and key-user guidance.'],
  ARRAY['3+ years of experience in SAP EWM functional configuration.','Solid domain knowledge in warehouse logistics and inventory operations.','Proven track record in client project environments.'],
  ARRAY['Experience with mobile device and RF framework integration.','Familiarity with SAP MM integration.'],
  ARRAY['Competitive compensation package.','Professional growth opportunities.','Collaborative project environment.']
),
(
  'sap-sd-consultant', 'SAP SD Consultant', 'India', 'Full Time', '3+ Years', 'SAP Functional Practice',
  'Join Nova Sitara as an SAP SD Consultant to support Sales & Distribution order-to-cash process configuration.',
  ARRAY['Configure SAP SD order management, pricing, delivery, and billing processes.','Assist with pricing condition technique setup and output determination.','Collaborate with technical teams for custom user exit specifications.','Support issue resolution and change request delivery.'],
  ARRAY['3+ years of functional experience in SAP SD.','Strong understanding of order-to-cash processes.','Experience in configuration and documentation.'],
  ARRAY['Exposure to Vistex solution alignment.','EDI interface support experience.'],
  ARRAY['Competitive salary and benefits.','Flexible work arrangements.','Professional development opportunities.']
),
(
  'sap-mm-consultant', 'SAP MM Consultant', 'India', 'Full Time', '3+ Years', 'Procurement Practice',
  'Nova Sitara is hiring an SAP MM Consultant to support procurement, inventory management, and logistics invoice verification.',
  ARRAY['Configure Material Master, Purchasing Documents, and Release Procedures.','Support Goods Receipt, Goods Issue, and Inventory Management workflows.','Assist with Logistics Invoice Verification setup.','Provide functional support to end-users and key project stakeholders.'],
  ARRAY['3+ years of hands-on experience in SAP MM module configuration.','Knowledge of procure-to-pay business processes.','Strong analytical and problem-solving skills.'],
  ARRAY['Experience with cross-module integration.','Knowledge of inventory valuation processes.'],
  ARRAY['Competitive compensation package.','Career growth potential.','Health and wellness benefits.']
),
(
  'abap-developer', 'ABAP Developer', 'India', 'Full Time', '2+ Years', 'Technical Engineering',
  'We are seeking a dedicated ABAP Developer to build custom SAP extensions, reports, interfaces, and technical enhancements.',
  ARRAY['Develop custom ABAP RICEFW objects based on technical specifications.','Create custom reports, user exits, and enhancement framework implementations.','Perform code optimization and SQL performance tuning.','Support technical integration testing and issue resolution.'],
  ARRAY['2+ years of experience in custom ABAP development.','Proficiency in Data Dictionary, Reports, Enhancements, and BAPIs.','Strong debugging and code documentation skills.'],
  ARRAY['Experience with interface building (IDoc, RFC).','Familiarity with Vistex technical enhancements.'],
  ARRAY['Competitive salary structure.','Flexible working options.','Continuous technical skill development.']
)
ON CONFLICT (id) DO NOTHING;
