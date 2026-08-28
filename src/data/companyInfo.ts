export interface CompanyInfo {
  name: string;
  fullName: string;
  tagline: string;
  description: string;
  shortDescription: string;
  phones: {
    india: string;
    germany: string;
  };
  email: string;
  businessHours: {
    weekdays: string;
    weekends: string;
  };
  linkedin: string;
  highlights: Array<{
    title: string;
    label: string;
  }>;
}

export const companyInfo: CompanyInfo = {
  name: "Nova Sitara",
  fullName: "Nova Sitara Private Limited",
  tagline: "Specialized SAP & Vistex Expertise. Built for Your Success.",
  description: "Nova Sitara connects organizations with experienced SAP and Vistex professionals who help accelerate implementations, enhancements, migrations and application support.",
  shortDescription: "Specialized SAP & Vistex consulting and technology staffing company.",
  phones: {
    india: "+91 8980808305",
    germany: "+49 15510196326"
  },
  email: "info@novasitara.com",
  businessHours: {
    weekdays: "Monday – Friday: 9:00 AM – 5:00 PM",
    weekends: "Saturday – Sunday: Holiday"
  },
  linkedin: "https://www.linkedin.com/company/novasitara/",
  highlights: [
    { title: "Specialized Focus", label: "Dedicated Vistex & SAP Niche" },
    { title: "Qualified Experts", label: "Carefully Selected Professionals" },
    { title: "Flexible Engagement", label: "Tailored Staffing & Project Roles" },
    { title: "Project Reliability", label: "Implementations & Enhancements" }
  ]
};
