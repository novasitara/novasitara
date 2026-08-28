export interface ExpertiseItem {
  id: string;
  name: string;
  category: string;
  tagline: string;
  overview: string;
  badge?: string;
  highlighted?: boolean;
  coreModules: string[];
  keyCapabilities: string[];
  useCases: string[];
}

export const expertiseData: ExpertiseItem[] = [
  {
    id: "vistex",
    name: "Vistex Solutions",
    category: "Primary Niche Specialty",
    tagline: "Specialized Vistex Consulting & Staffing Expertise",
    overview: "Nova Sitara has a particular focus on the niche Vistex market. We help consulting firms, implementation partners, and enterprise clients access qualified Vistex professionals for specific project roles and solution requirements.",
    badge: "Core Niche",
    highlighted: true,
    coreModules: [
      "Vistex Configuration",
      "Vistex Enhancements",
      "Vistex Functional Support",
      "Vistex Implementation Roles",
      "Vistex Data Alignment"
    ],
    keyCapabilities: [
      "End-to-End Vistex Solution Consulting",
      "Functional Configuration & Project Support",
      "Tailored Role Staffing for Partners & Clients",
      "Integration Alignment with SAP Modules",
      "Targeted System Troubleshooting & Enhancements"
    ],
    useCases: [
      "Implementation Partner Resource Augmentation",
      "Specialized Vistex Role Fulfillment",
      "Project-Specific Vistex Enhancements",
      "Ongoing Vistex Application Support"
    ]
  },
  {
    id: "sap-ewm",
    name: "SAP EWM (Extended Warehouse Management)",
    category: "Logistics & Warehouse",
    tagline: "Warehouse Logistics & Process Support",
    overview: "We connect organizations with experienced SAP EWM consultants who assist in configuring, optimizing, and supporting warehouse logistics and inventory operations.",
    coreModules: [
      "Inbound & Outbound Processing",
      "Storage & Bin Management",
      "Physical Inventory & Transfers",
      "RF Framework Configuration",
      "Warehouse Process Optimization"
    ],
    keyCapabilities: [
      "SAP EWM Functional Configuration",
      "Warehouse Workflow Support",
      "Integration Alignment with SAP MM & SD",
      "Custom Enhancements & Troubleshooting",
      "End-User Support & Process Guidance"
    ],
    useCases: [
      "Warehouse Implementation & Expansion Roles",
      "RF Device & Process Integration",
      "Logistics Functional Support"
    ]
  },
  {
    id: "sap-sd",
    name: "SAP SD (Sales & Distribution)",
    category: "Core Functional Module",
    tagline: "Commercial Operations & Order Management",
    overview: "Our SAP SD specialists support sales order processing, pricing configuration, billing, and customer delivery workflows for enterprise clients.",
    coreModules: [
      "Sales Order Processing",
      "Pricing Configuration",
      "Billing & Invoicing",
      "Availability Checks",
      "Customer Master Data"
    ],
    keyCapabilities: [
      "SAP SD Functional Configuration",
      "Order-to-Cash Workflow Optimization",
      "Integration Alignment with SAP MM & FICO",
      "EDI & Interface Support",
      "Issue Resolution & Process Enhancements"
    ],
    useCases: [
      "Sales & Distribution Implementation Support",
      "Commercial Pricing & Order Configuration",
      "Ongoing SD Module Enhancements"
    ]
  },
  {
    id: "sap-mm",
    name: "SAP MM (Materials Management)",
    category: "Core Functional Module",
    tagline: "Procurement & Inventory Governance",
    overview: "We supply experienced SAP MM consultants to assist with purchasing, inventory management, logistics invoice verification, and master data setup.",
    coreModules: [
      "Purchasing & Requisitions",
      "Inventory Management",
      "Invoice Verification",
      "Material Master Data",
      "Vendor Evaluation"
    ],
    keyCapabilities: [
      "SAP MM Functional Configuration",
      "Procure-to-Pay Workflow Optimization",
      "Inventory & Valuation Setup",
      "Integration Alignment with SD & EWM",
      "Process Troubleshooting & Support"
    ],
    useCases: [
      "Procurement Implementation Support",
      "Inventory Governance & Setup",
      "Vendor & Purchasing Workflow Optimization"
    ]
  },
  {
    id: "abap",
    name: "ABAP Development",
    tagline: "Custom Engineering & Technical Enhancements",
    category: "Technical Engineering",
    overview: "Our ABAP developers build maintainable custom SAP software extensions, reports, interfaces, and enhancements tailored to specific project requirements.",
    coreModules: [
      "Custom RICEFW Development",
      "Data Dictionary & ABAP Workbench",
      "Interface Building (IDoc, BAPI, RFC)",
      "User Exits & Enhancement Points",
      "ABAP Reporting & Forms"
    ],
    keyCapabilities: [
      "Custom Program & Report Development",
      "Interface & Integration Engineering",
      "Code Remediation & Performance Tuning",
      "User Exit & Enhancement Implementations",
      "Technical Documentation & Code Quality"
    ],
    useCases: [
      "Project-Specific ABAP Development",
      "Technical System Upgrades & Enhancements",
      "Interface & Data Integration Building"
    ]
  }
];
