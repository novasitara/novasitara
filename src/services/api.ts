import { parseJobMetadata, type JobItem } from '../data/jobs';

export interface ApplicationFormData {
  fullName: string;
  email: string;
  phone: string;
  currentLocation: string;
  yearsOfExperience: string;
  primarySkill: string;
  linkedInUrl?: string;
  coverLetter?: string;
  resumeFile: File | null;
  sharingConsent: boolean;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  serviceRequirement: string;
  message: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
}

/** Calls the Nova Sitara API on the same origin (/api is proxied by Vite in dev and Nginx in production). */
async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`/api${path}`, init);
  const data = await res.json().catch(() => null);
  if (!res.ok) {
    const message = res.status === 429
      ? 'Too many submissions. Please wait a few minutes before trying again.'
      : Array.isArray(data?.message) ? data.message.join('. ') : data?.message;
    throw new Error(message || 'Something went wrong. Please try again.');
  }
  return data as T;
}

const errorMessage = (e: unknown) => (e instanceof Error ? e.message : 'Something went wrong. Please try again.');

function mapJob(row: any): JobItem {
  const parsed = parseJobMetadata(row.benefits ?? []);
  return {
    id: row.id,
    title: row.title,
    location: row.location,
    type: row.type,
    experience: row.experience,
    department: row.department,
    postedDate: row.posted_date,
    overview: row.overview,
    responsibilities: row.responsibilities ?? [],
    requirements: row.requirements ?? [],
    preferredSkills: row.preferred_skills ?? [],
    benefits: parsed.benefits,
    source: parsed.source,
    de: {
      title: row.title_de ?? undefined,
      department: row.department_de ?? undefined,
      overview: row.overview_de ?? undefined,
      responsibilities: row.responsibilities_de ?? [],
      requirements: row.requirements_de ?? [],
      preferredSkills: row.preferred_skills_de ?? [],
      benefits: row.benefits_de ?? [],
    },
  };
}

export const api = {
  async getJobs(): Promise<ApiResponse<JobItem[]>> {
    try {
      const rows = await request<any[]>('/jobs');
      return { success: true, message: 'Jobs fetched successfully.', data: rows.map(mapJob) };
    } catch (e) {
      return { success: false, message: errorMessage(e) };
    }
  },

  async getJobById(id: string): Promise<ApiResponse<JobItem | null>> {
    try {
      const row = await request<any>(`/jobs/${encodeURIComponent(id)}`);
      return { success: true, message: 'Job fetched successfully.', data: mapJob(row) };
    } catch {
      return { success: false, message: 'Job not found.', data: null };
    }
  },

  async submitApplication(job: JobItem, formData: ApplicationFormData): Promise<ApiResponse> {
    if (!formData.fullName || !formData.email || !formData.phone || !formData.resumeFile) {
      return { success: false, message: 'Please complete all required fields and upload your resume.' };
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      return { success: false, message: 'Please enter a valid email address.' };
    }
    if (formData.resumeFile.size > 5 * 1024 * 1024) {
      return { success: false, message: 'Resume must be under 5 MB. Please compress your PDF and try again.' };
    }
    if (!formData.resumeFile.name.toLowerCase().endsWith('.pdf')) {
      return { success: false, message: 'Only PDF files are accepted.' };
    }
    if (job.source?.type === 'sourced' && !formData.sharingConsent) {
      return { success: false, message: 'Please provide consent before we can review you for this third-party opportunity.' };
    }

    // The server validates and stores everything; these checks just give faster feedback.
    const body = new FormData();
    body.append('job_id', job.id);
    body.append('full_name', formData.fullName);
    body.append('email', formData.email);
    body.append('phone', formData.phone);
    body.append('current_location', formData.currentLocation);
    body.append('years_of_experience', formData.yearsOfExperience);
    body.append('primary_skill', formData.primarySkill);
    body.append('linkedin_url', formData.linkedInUrl ?? '');
    const consentRecord = job.source?.type === 'sourced'
      ? `Candidate sharing consent: I authorize Nova Sitara Private Limited to share my CV and application details with ${job.source.company || 'the named source agency'} for ${job.title}${job.source.reference ? ` (${job.source.reference})` : ''} only. I understand Nova Sitara is an independent candidate-sourcing company, is not the original advertiser, and I will not be charged a placement fee. Consent recorded at ${new Date().toISOString()}.`
      : '';
    body.append('cover_letter', [formData.coverLetter?.trim(), consentRecord].filter(Boolean).join('\n\n'));
    body.append('resume', formData.resumeFile);

    try {
      await request('/applications', { method: 'POST', body });
    } catch (e) {
      return { success: false, message: errorMessage(e) };
    }
    return {
      success: true,
      message: `Thank you, ${formData.fullName}! Your application has been received. Our talent acquisition team will review your profile and reach out shortly.`,
    };
  },

  async submitContactForm(data: ContactFormData): Promise<ApiResponse> {
    if (!data.name || !data.email || !data.message) {
      return { success: false, message: 'Please fill out all required contact fields.' };
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      return { success: false, message: 'Please enter a valid email address.' };
    }

    try {
      await request('/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: data.phone,
          company: data.company,
          service_requirement: data.serviceRequirement,
          message: data.message,
        }),
      });
    } catch (e) {
      return { success: false, message: errorMessage(e) };
    }
    return {
      success: true,
      message: `Thank you, ${data.name}! We have received your inquiry regarding '${data.serviceRequirement || 'General Inquiry'}'. A Nova Sitara specialist will respond within 1 business day.`,
    };
  },
};
