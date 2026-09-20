import { jobsData, JobItem } from '../data/jobs';

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

/**
 * Mock API Service Layer
 * Isolates data fetching and form submissions.
 * Ready to be connected to real backend endpoints:
 * - GET /api/jobs
 * - GET /api/jobs/:id
 * - POST /api/applications
 * - POST /api/contact
 */
export const api = {
  /**
   * Fetch all active job listings
   */
  async getJobs(): Promise<ApiResponse<JobItem[]>> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return {
      success: true,
      message: "Jobs fetched successfully.",
      data: jobsData,
    };
  },

  /**
   * Fetch a single job by ID
   */
  async getJobById(id: string): Promise<ApiResponse<JobItem | null>> {
    await new Promise((resolve) => setTimeout(resolve, 200));
    const job = jobsData.find((j) => j.id === id) || null;
    if (!job) {
      return {
        success: false,
        message: `Job position with ID '${id}' was not found.`,
        data: null,
      };
    }
    return {
      success: true,
      message: "Job details fetched successfully.",
      data: job,
    };
  },

  /**
   * Submit job application form (frontend mock simulation)
   */
  async submitApplication(jobId: string, formData: ApplicationFormData): Promise<ApiResponse> {
    // Simulate network latency
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Basic frontend verification
    if (!formData.fullName || !formData.email || !formData.phone || !formData.resumeFile) {
      return {
        success: false,
        message: "Please complete all required fields and upload your resume.",
      };
    }

    console.log(`[Mock API] Application submitted for job '${jobId}':`, {
      jobId,
      applicant: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      resumeFileName: formData.resumeFile.name,
      resumeFileSize: `${(formData.resumeFile.size / 1024 / 1024).toFixed(2)} MB`,
    });

    return {
      success: true,
      message: `Thank you, ${formData.fullName}! Your application has been received. Our talent acquisition team will review your profile and reach out shortly.`,
    };
  },

  /**
   * Submit contact form inquiry (frontend mock simulation)
   */
  async submitContactForm(data: ContactFormData): Promise<ApiResponse> {
    // Simulate network latency
    await new Promise((resolve) => setTimeout(resolve, 900));

    if (!data.name || !data.email || !data.message) {
      return {
        success: false,
        message: "Please fill out all required contact fields.",
      };
    }

    console.log("[Mock API] Contact inquiry submitted:", data);

    return {
      success: true,
      message: `Thank you, ${data.name}! We have received your inquiry regarding '${data.serviceRequirement || 'General Inquiry'}'. A Nova Sitara specialist will respond within 1 business day.`,
    };
  },
};
