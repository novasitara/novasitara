export type OpportunitySourceType = 'nova_sitara' | 'sourced';

export interface OpportunitySource {
  type: OpportunitySourceType;
  company?: string;
  reference?: string;
  url?: string;
  workModel?: string;
  startDate?: string;
  duration?: string;
  workload?: string;
  languages?: string;
  sourcePublished?: string;
  lastVerified?: string;
  expiresAt?: string;
}

export interface JobItem {
  id: string;
  title: string;
  location: string;
  type: string;
  experience: string;
  department: string;
  postedDate: string;
  overview: string;
  responsibilities: string[];
  requirements: string[];
  preferredSkills: string[];
  benefits: string[];
  source?: OpportunitySource;
  de?: Partial<Pick<JobItem, 'title' | 'department' | 'overview' | 'responsibilities' | 'requirements' | 'preferredSkills' | 'benefits'>>;
}

const META_PATTERN = /^\[ns:([a-z_]+)\](.*)$/;

const META_KEYS: Record<string, keyof OpportunitySource> = {
  source_type: 'type', source_company: 'company', source_reference: 'reference', source_url: 'url',
  work_model: 'workModel', start_date: 'startDate', duration: 'duration', workload: 'workload',
  languages: 'languages', source_published: 'sourcePublished', last_verified: 'lastVerified', expires_at: 'expiresAt',
};

/** Extracts Nova Sitara's internal sourcing metadata from the existing benefits field. */
export function parseJobMetadata(values: string[] = []): { benefits: string[]; source?: OpportunitySource } {
  const benefits: string[] = [];
  const metadata: Partial<OpportunitySource> = {};
  values.forEach((value) => {
    const match = value.match(META_PATTERN);
    if (!match) { benefits.push(value); return; }
    const key = META_KEYS[match[1]];
    if (key) (metadata as Record<string, string>)[key] = match[2].trim();
  });
  if (!metadata.type) return { benefits };
  return { benefits, source: metadata as OpportunitySource };
}

export function isJobExpired(job: JobItem): boolean {
  const expires = job.source?.expiresAt;
  if (!expires) return false;
  const deadline = new Date(`${expires}T23:59:59`);
  return !Number.isNaN(deadline.getTime()) && deadline.getTime() < Date.now();
}

export function formatOpportunityDate(value?: string): string {
  if (!value) return '';
  const date = new Date(`${value}T12:00:00`);
  return Number.isNaN(date.getTime()) ? value : new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).format(date);
}

/** Returns the job in German where a German value was entered in admin, else English. */
export function localizeJob(job: JobItem, language: 'EN' | 'DE'): JobItem {
  if (language !== 'DE' || !job.de) return job;
  const d = job.de;
  const list = (de?: string[], en?: string[]) => (de && de.length ? de : (en ?? []));
  return {
    ...job,
    title: d.title || job.title,
    department: d.department || job.department,
    overview: d.overview || job.overview,
    responsibilities: list(d.responsibilities, job.responsibilities),
    requirements: list(d.requirements, job.requirements),
    preferredSkills: list(d.preferredSkills, job.preferredSkills),
    benefits: list(d.benefits, job.benefits),
  };
}

export const jobsData: JobItem[] = [
  {
    id: "vistex-consultant",
    title: "SAP Vistex Consultant",
    location: "India",
    type: "Full Time",
    experience: "3+ Years",
    department: "Vistex Practice",
    postedDate: "Recent",
    overview: "Nova Sitara is seeking an experienced SAP Vistex Consultant to join our consulting practice. You will support client implementations, functional configuration, and project-specific Vistex requirements.",
    responsibilities: [
      "Support Vistex solution configuration and functional requirement mapping.",
      "Collaborate with SAP SD and functional teams to ensure system alignment.",
      "Participate in requirement discussions, documentation, and testing.",
      "Support functional enhancements and troubleshooting during project lifecycles.",
      "Provide user support and hypercare assistance during system cutover."
    ],
    requirements: [
      "Minimum 3 years of hands-on experience in SAP Vistex consulting.",
      "Solid understanding of SAP SD and pricing concepts.",
      "Experience in Vistex implementation or enhancement projects.",
      "Strong communication and collaborative stakeholder management skills."
    ],
    preferredSkills: [
      "Experience with custom Vistex enhancements.",
      "Familiarity with ABAP debugging concepts."
    ],
    benefits: [
      "Competitive compensation structure.",
      "Flexible engagement and working arrangements.",
      "Opportunities to work on diverse project environments."
    ]
  },
  {
    id: "sap-ewm-consultant",
    title: "SAP EWM Consultant",
    location: "India",
    type: "Full Time",
    experience: "3+ Years",
    department: "Logistics Practice",
    postedDate: "Recent",
    overview: "We are looking for a skilled SAP EWM Consultant to support warehouse logistics and inventory optimization projects for client engagements.",
    responsibilities: [
      "Configure SAP Extended Warehouse Management (EWM) functional structures and process flows.",
      "Support RF framework setup and warehouse process alignment.",
      "Assist in integration testing between SAP EWM and core modules.",
      "Deliver functional documentation and key-user guidance."
    ],
    requirements: [
      "3+ years of experience in SAP EWM functional configuration.",
      "Solid domain knowledge in warehouse logistics and inventory operations.",
      "Proven track record in client project environments."
    ],
    preferredSkills: [
      "Experience with mobile device and RF framework integration.",
      "Familiarity with SAP MM integration."
    ],
    benefits: [
      "Competitive compensation package.",
      "Professional growth opportunities.",
      "Collaborative project environment."
    ]
  },
  {
    id: "sap-sd-consultant",
    title: "SAP SD Consultant",
    location: "India",
    type: "Full Time",
    experience: "3+ Years",
    department: "SAP Functional Practice",
    postedDate: "Recent",
    overview: "Join Nova Sitara as an SAP SD Consultant to support Sales & Distribution order-to-cash process configuration, enhancements, and client project delivery.",
    responsibilities: [
      "Configure SAP SD order management, pricing, delivery, and billing processes.",
      "Assist with pricing condition technique setup and output determination.",
      "Collaborate with technical teams for custom user exit specifications.",
      "Support issue resolution and change request delivery."
    ],
    requirements: [
      "3+ years of functional experience in SAP SD.",
      "Strong understanding of order-to-cash processes.",
      "Experience in configuration and documentation."
    ],
    preferredSkills: [
      "Exposure to Vistex solution alignment.",
      "EDI interface support experience."
    ],
    benefits: [
      "Competitive salary and benefits.",
      "Flexible work arrangements.",
      "Professional development opportunities."
    ]
  },
  {
    id: "sap-mm-consultant",
    title: "SAP MM Consultant",
    location: "India",
    type: "Full Time",
    experience: "3+ Years",
    department: "Procurement Practice",
    postedDate: "Recent",
    overview: "Nova Sitara is hiring an SAP MM Consultant to support procurement, inventory management, and logistics invoice verification workflows for project engagements.",
    responsibilities: [
      "Configure Material Master, Purchasing Documents, and Release Procedures.",
      "Support Goods Receipt, Goods Issue, and Inventory Management workflows.",
      "Assist with Logistics Invoice Verification setup.",
      "Provide functional support to end-users and key project stakeholders."
    ],
    requirements: [
      "3+ years of hands-on experience in SAP MM module configuration.",
      "Knowledge of procure-to-pay business processes.",
      "Strong analytical and problem-solving skills."
    ],
    preferredSkills: [
      "Experience with cross-module integration.",
      "Knowledge of inventory valuation processes."
    ],
    benefits: [
      "Competitive compensation package.",
      "Career growth potential.",
      "Health and wellness benefits."
    ]
  },
  {
    id: "abap-developer",
    title: "ABAP Developer",
    location: "India",
    type: "Full Time",
    experience: "2+ Years",
    department: "Technical Engineering",
    postedDate: "Recent",
    overview: "We are seeking a dedicated ABAP Developer to build custom SAP extensions, reports, interfaces, and technical enhancements for client project roles.",
    responsibilities: [
      "Develop custom ABAP RICEFW objects based on technical specifications.",
      "Create custom reports, user exits, and enhancement framework implementations.",
      "Perform code optimization and SQL performance tuning.",
      "Support technical integration testing and issue resolution."
    ],
    requirements: [
      "2+ years of experience in custom ABAP development.",
      "Proficiency in Data Dictionary, Reports, Enhancements, and BAPIs.",
      "Strong debugging and code documentation skills."
    ],
    preferredSkills: [
      "Experience with interface building (IDoc, RFC).",
      "Familiarity with Vistex technical enhancements."
    ],
    benefits: [
      "Competitive salary structure.",
      "Flexible working options.",
      "Continuous technical skill development."
    ]
  }
];
