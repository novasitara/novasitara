export interface ServiceItem {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  iconName: string;
  featured?: boolean;
  capabilities: string[];
  businessBenefits: string[];
}

export const servicesData: ServiceItem[] = [
  {
    id: "vistex-consulting",
    title: "Vistex Consulting",
    shortDescription: "Specialized Vistex solution consulting, configuration, system alignment, and project support.",
    fullDescription: "Nova Sitara has a particular focus on the niche Vistex market. We connect consulting firms, implementation partners, and enterprise clients with experienced Vistex consultants for specific project roles and solution requirements.",
    iconName: "Layers",
    featured: true,
    capabilities: [
      "Vistex Solution Design & Requirement Alignment",
      "Functional Configuration & System Alignment",
      "Custom Project Role Fulfillment & Staffing",
      "Vistex Enhancement & Upgrade Support",
      "User Support & System Maintenance"
    ],
    businessBenefits: [
      "Access to hard-to-find, niche Vistex talent",
      "Seamless integration with existing SAP modules",
      "Flexible engagement models suited for your project scope"
    ]
  },
  {
    id: "sap-consulting",
    title: "SAP Consulting",
    shortDescription: "Strategic SAP process guidance, architecture planning, and functional module consulting.",
    fullDescription: "Our experienced SAP consultants assist organizations in evaluating, planning, and optimizing their SAP systems to align with operational goals across key functional areas.",
    iconName: "Compass",
    featured: true,
    capabilities: [
      "SAP Process Assessment & Architecture Guidance",
      "Functional Module Optimization (SD, MM, EWM)",
      "System Enhancement & Customization Planning",
      "Integration Advisory Across Business Functions",
      "Governance & Best Practice Guidance"
    ],
    businessBenefits: [
      "Clarity on system architecture and implementation pathways",
      "Experienced guidance for functional decision-making",
      "Reduced implementation risks through domain expertise"
    ]
  },
  {
    id: "sap-implementation-support",
    title: "SAP Implementation Support",
    shortDescription: "Hands-on execution support across lifecycle phases from blueprint to go-live.",
    fullDescription: "We provide qualified SAP professionals to support your implementation teams during configuration, testing, data migration, and hypercare phases.",
    iconName: "Workflow",
    featured: false,
    capabilities: [
      "Requirement Analysis & Blueprint Support",
      "Functional & Technical System Configuration",
      "Data Migration & Validation Assistance",
      "User Acceptance Testing (UAT) Support",
      "Go-Live Assistance & Hypercare Support"
    ],
    businessBenefits: [
      "Dedicated capacity to keep implementation milestones on track",
      "Reduced workload on internal IT teams",
      "Quality assurance throughout the execution lifecycle"
    ]
  },
  {
    id: "sap-enhancement-migration",
    title: "SAP Enhancement & Migration",
    shortDescription: "Upgrades, system enhancements, technical migrations, and module expansions.",
    fullDescription: "Modernize and extend your SAP environment. We supply experienced specialists to assist with system upgrades, custom code adjustments, and migration tasks.",
    iconName: "ArrowUpRight",
    featured: false,
    capabilities: [
      "SAP System & Module Enhancement Execution",
      "Database & Interface Migration Assistance",
      "Custom Code Review & Optimization",
      "System Upgrade & Patching Support",
      "Integration Testing Across Connected Applications"
    ],
    businessBenefits: [
      "Smooth migration pathways with minimal operational impact",
      "Extended system lifespan through targeted enhancements",
      "Expert execution of complex technical changes"
    ]
  },
  {
    id: "application-support",
    title: "Application Support",
    shortDescription: "Dependable SAP and Vistex application support, troubleshooting, and system maintenance.",
    fullDescription: "Maintain high system availability and smooth operations. Nova Sitara provides experienced consultants to handle routine support, issue resolution, and system adjustments.",
    iconName: "ShieldCheck",
    featured: false,
    capabilities: [
      "Incident Management & Issue Troubleshooting",
      "System Bug Fixing & Configuration Adjustments",
      "Routine Maintenance & Minor Enhancements",
      "Knowledge Transfer & End-User Assistance",
      "Root Cause Analysis & Documentation"
    ],
    businessBenefits: [
      "Dependable support coverage tailored to your schedule",
      "Fast resolution of operational bottlenecks",
      "Predictable support resource allocation"
    ]
  },
  {
    id: "sap-technology-staffing",
    title: "SAP & Technology Staffing",
    shortDescription: "Specialized staffing solutions providing qualified SAP and Vistex professionals for project roles.",
    fullDescription: "Connect with carefully selected SAP and Vistex talent. We help consulting firms, implementation partners, and end clients fill specific project roles rapidly and flexibly.",
    iconName: "Users",
    featured: true,
    capabilities: [
      "Targeted Sourcing for Niche Vistex & SAP Roles",
      "Contract & Project-Based Staffing",
      "Dedicated Team Augmentation",
      "Rigorous Technical & Domain Screening",
      "Flexible Onboarding & Resource Scaling"
    ],
    businessBenefits: [
      "Immediate coverage for project talent gaps",
      "Pre-vetted professionals with relevant domain experience",
      "Scalable engagement aligned with project phases"
    ]
  },
  {
    id: "abap-development",
    title: "ABAP Development",
    shortDescription: "Custom ABAP development, enhancements, interfaces, and report engineering.",
    fullDescription: "Extend and customize your SAP software with custom ABAP solutions developed by experienced technical specialists who focus on maintainable, performant code.",
    iconName: "Code2",
    featured: false,
    capabilities: [
      "Custom RICEFW Development & Enhancements",
      "Interface Building (IDoc, BAPI, RFC, Web Services)",
      "Interactive Reporting & SmartForms",
      "User Exits & Enhancement Framework Implementations",
      "ABAP Performance Tuning & Code Optimization"
    ],
    businessBenefits: [
      "Customized functionality aligned with unique business rules",
      "Efficient data processing and interface reliability",
      "Clean, well-documented technical code"
    ]
  },
  {
    id: "sap-functional-expertise",
    title: "SAP Functional Expertise",
    shortDescription: "Functional consulting across SD, MM, and EWM modules.",
    fullDescription: "Bridge operational needs and system capabilities with functional specialists in Sales & Distribution (SD), Materials Management (MM), and Extended Warehouse Management (EWM).",
    iconName: "Cpu",
    featured: false,
    capabilities: [
      "SAP SD (Sales & Distribution) Process Alignment",
      "SAP MM (Materials Management) Procurement Support",
      "SAP EWM (Extended Warehouse Management) Configuration",
      "Cross-Module Workflow Integration",
      "Functional Master Data Setup & Validation"
    ],
    businessBenefits: [
      "Optimized functional workflows across key business areas",
      "Improved data accuracy and system usability",
      "Seamless cross-module integration"
    ]
  }
];
