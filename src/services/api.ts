import { supabase } from '../lib/supabase';
import type { JobItem } from '../data/jobs';

// Simple in-memory rate limiter — max 3 submissions per IP-like key per 10 minutes
const submissionTracker = new Map<string, { count: number; firstAt: number }>();
function isRateLimited(key: string, maxCount = 3, windowMs = 10 * 60 * 1000): boolean {
  const now = Date.now();
  const entry = submissionTracker.get(key);
  if (!entry || now - entry.firstAt > windowMs) {
    submissionTracker.set(key, { count: 1, firstAt: now });
    return false;
  }
  if (entry.count >= maxCount) return true;
  entry.count++;
  return false;
}

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

function mapJob(row: any): JobItem {
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
    benefits: row.benefits ?? [],
  };
}

export const api = {
  async getJobs(): Promise<ApiResponse<JobItem[]>> {
    const { data, error } = await supabase
      .from('jobs')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (error) return { success: false, message: error.message };
    return { success: true, message: 'Jobs fetched successfully.', data: (data ?? []).map(mapJob) };
  },

  async getJobById(id: string): Promise<ApiResponse<JobItem | null>> {
    const { data, error } = await supabase
      .from('jobs')
      .select('*')
      .eq('id', id)
      .eq('is_active', true)
      .single();

    if (error) return { success: false, message: 'Job not found.', data: null };
    return { success: true, message: 'Job fetched successfully.', data: mapJob(data) };
  },

  async submitApplication(jobId: string, formData: ApplicationFormData): Promise<ApiResponse> {
    if (!formData.fullName || !formData.email || !formData.phone || !formData.resumeFile) {
      return { success: false, message: 'Please complete all required fields and upload your resume.' };
    }

    // Rate limit: max 3 applications per session per 10 mins
    if (isRateLimited(`app_${formData.email.toLowerCase()}`)) {
      return { success: false, message: 'Too many submissions. Please wait a few minutes before trying again.' };
    }

    // Validate email format
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      return { success: false, message: 'Please enter a valid email address.' };
    }

    // Validate jobId is a safe slug (prevent injection)
    if (!/^[a-z0-9-]+$/.test(jobId)) {
      return { success: false, message: 'Invalid job reference.' };
    }

    // Sanitize text inputs — strip HTML tags
    const sanitize = (s: string) => s.replace(/<[^>]*>/g, '').trim().substring(0, 500);
    const sanitizedName = sanitize(formData.fullName);
    const sanitizedLocation = sanitize(formData.currentLocation);
    const sanitizedSkill = sanitize(formData.primarySkill);
    const sanitizedCover = formData.coverLetter ? sanitize(formData.coverLetter).substring(0, 2000) : null;

    // Enforce 500KB limit and PDF only
    if (formData.resumeFile.size > 500 * 1024) {
      return { success: false, message: 'Resume must be under 500KB. Please compress your PDF and try again.' };
    }
    if (!formData.resumeFile.name.toLowerCase().endsWith('.pdf')) {
      return { success: false, message: 'Only PDF files are accepted.' };
    }

    // Short filename: jobId/timestamp_name.pdf
    const safeName = formData.fullName.replace(/[^a-zA-Z0-9]/g, '_').substring(0, 20);
    const fileName = `${jobId}/${Date.now()}_${safeName}.pdf`;

    const { error: uploadError } = await supabase.storage
      .from('resumes')
      .upload(fileName, formData.resumeFile, { upsert: false });

    if (uploadError) return { success: false, message: 'Failed to upload resume. Please try again.' };

    const applicationRow = {
      job_id: jobId,
      full_name: sanitizedName,
      email: formData.email.toLowerCase().trim(),
      phone: formData.phone.replace(/[^0-9+\-\s()]/g, '').trim().substring(0, 20),
      current_location: sanitizedLocation,
      years_of_experience: formData.yearsOfExperience.replace(/<[^>]*>/g, '').trim().substring(0, 20),
      primary_skill: sanitizedSkill,
      linkedin_url: formData.linkedInUrl ? formData.linkedInUrl.trim().substring(0, 200) : null,
      cover_letter: sanitizedCover,
      resume_file_url: fileName,
      resume_file_name: formData.resumeFile.name.replace(/[^a-zA-Z0-9._-]/g, '_').substring(0, 100),
      status: 'new' as const,
    };

    const { error: insertError } = await (supabase.from('applications') as any).insert(applicationRow);

    if (insertError) return { success: false, message: 'Failed to submit application. Please try again.' };

    return {
      success: true,
      message: `Thank you, ${formData.fullName}! Your application has been received. Our talent acquisition team will review your profile and reach out shortly.`,
    };
  },

  async submitContactForm(data: ContactFormData): Promise<ApiResponse> {
    if (!data.name || !data.email || !data.message) {
      return { success: false, message: 'Please fill out all required contact fields.' };
    }

    // Rate limit: max 3 enquiries per email per 10 mins
    if (isRateLimited(`enq_${data.email.toLowerCase()}`)) {
      return { success: false, message: 'Too many submissions. Please wait a few minutes before trying again.' };
    }

    // Validate email
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      return { success: false, message: 'Please enter a valid email address.' };
    }

    const sanitize = (s: string) => s.replace(/<[^>]*>/g, '').trim();

    const enquiryRow = {
      name: sanitize(data.name).substring(0, 100),
      email: data.email.toLowerCase().trim().substring(0, 200),
      phone: data.phone.replace(/[^0-9+\-\s()]/g, '').trim().substring(0, 20),
      company: data.company ? sanitize(data.company).substring(0, 100) : null,
      service_requirement: sanitize(data.serviceRequirement).substring(0, 100),
      message: sanitize(data.message).substring(0, 2000),
      status: 'new' as const,
    };

    const { error } = await (supabase.from('enquiries') as any).insert(enquiryRow);

    if (error) return { success: false, message: 'Failed to send message. Please try again.' };

    return {
      success: true,
      message: `Thank you, ${data.name}! We have received your inquiry regarding '${data.serviceRequirement || 'General Inquiry'}'. A Nova Sitara specialist will respond within 1 business day.`,
    };
  },
};
