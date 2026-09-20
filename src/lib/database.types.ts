export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export interface Database {
  public: {
    Tables: {
      jobs: {
        Row: {
          id: string;
          title: string;
          location: string;
          type: string;
          experience: string;
          department: string;
          posted_date: string;
          overview: string;
          responsibilities: string[];
          requirements: string[];
          preferred_skills: string[];
          benefits: string[];
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['jobs']['Row'], 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['jobs']['Insert']>;
      };
      applications: {
        Row: {
          id: string;
          job_id: string;
          full_name: string;
          email: string;
          phone: string;
          current_location: string;
          years_of_experience: string;
          primary_skill: string;
          linkedin_url: string | null;
          cover_letter: string | null;
          resume_file_url: string | null;
          resume_file_name: string | null;
          status: 'new' | 'reviewed' | 'shortlisted' | 'rejected';
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['applications']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['applications']['Insert']>;
      };
      enquiries: {
        Row: {
          id: string;
          name: string;
          email: string;
          phone: string;
          company: string | null;
          service_requirement: string;
          message: string;
          status: 'new' | 'read' | 'responded';
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['enquiries']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['enquiries']['Insert']>;
      };
      site_content: {
        Row: {
          key: string;
          value: Json;
          updated_at: string;
        };
        Insert: Database['public']['Tables']['site_content']['Row'];
        Update: Partial<Database['public']['Tables']['site_content']['Row']>;
      };
    };
  };
}
