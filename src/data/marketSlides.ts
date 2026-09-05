export interface MarketSlide {
  id: string;
  badgeEn: string;
  badgeDe: string;
  titleEn: string;
  titleDe: string;
  subtitleEn: string;
  subtitleDe: string;
  targetMarketEn: string;
  targetMarketDe: string;
  tags: string[];
  actionLink: string;
  actionTextEn: string;
  actionTextDe: string;
  isCurrentPrimary?: boolean;
}

export const marketSlidesData: MarketSlide[] = [
  {
    id: 'vistex',
    badgeEn: 'ACTIVE PRIMARY FOCUS',
    badgeDe: 'AKTUELLER HAUPTFOKUS',
    titleEn: 'Specialized Vistex Staffing & Sourcing Solutions',
    titleDe: 'Spezialisierte Vistex-Personal- und Beratungslösungen',
    subtitleEn: 'Connecting enterprise projects with pre-vetted consultants for Vistex Rebates, Chargebacks, Incentive Management, and SAP Pricing.',
    subtitleDe: 'Verbindung von Unternehmensprojekten mit geprüften Beratern für Vistex Rebates, Chargebacks, Incentive Management und SAP Pricing.',
    targetMarketEn: 'Vistex Enterprise Clients & Implementation Partners',
    targetMarketDe: 'Vistex-Unternehmenskunden & Implementierungspartner',
    tags: ['Vistex Rebates', 'Chargebacks & Royalties', 'Incentive Management', 'Pricing Engine'],
    actionLink: '/expertise#vistex',
    actionTextEn: 'Explore Vistex Practice',
    actionTextDe: 'Vistex-Praxis erkunden',
    isCurrentPrimary: true,
  },
  {
    id: 'scm-logistics',
    badgeEn: 'SUPPLY CHAIN FOCUS',
    badgeDe: 'SUPPLY CHAIN FOKUS',
    titleEn: 'SAP Extended Warehouse & SCM Functional Specialists',
    titleDe: 'SAP Extended Warehouse & SCM Funktionale Spezialisten',
    subtitleEn: 'Providing experienced functional professionals to streamline warehouse placement, order-to-cash, inventory, and procurement workflows.',
    subtitleDe: 'Erfahrene Funktionsexperten zur Optimierung von Lagerplatzierung, Order-to-Cash, Bestands- und Beschaffungsprozessen.',
    targetMarketEn: 'Logistics, Manufacturing & Wholesale Distribution',
    targetMarketDe: 'Logistik, Fertigungsindustrie & Großhandel',
    tags: ['SAP EWM Logistics', 'SAP SD Order-to-Cash', 'SAP MM Procurement', 'Inventory Control'],
    actionLink: '/expertise#sap-ewm',
    actionTextEn: 'Explore SCM Capabilities',
    actionTextDe: 'SCM-Kompetenzen erkunden',
  },
  {
    id: 'successfactors',
    badgeEn: 'CLOUD HXM FOCUS',
    badgeDe: 'CLOUD HXM FOKUS',
    titleEn: 'SAP SuccessFactors Cloud Transformation & Consulting',
    titleDe: 'SAP SuccessFactors Cloud-Transformation & Beratung',
    subtitleEn: 'End-to-end talent and functional consulting across Employee Central, Recruiting, Onboarding, Learning, Performance & Compensation.',
    subtitleDe: 'Ganzheitliche Beratung über Employee Central, Recruiting, Onboarding, Learning, Performance und Compensation.',
    targetMarketEn: 'Global Organizations Modernizing HR Operations & Cloud HXM',
    targetMarketDe: 'Globale Unternehmen mit moderner Cloud-HR-Transformation',
    tags: ['Employee Central', 'Talent & Recruiting', 'Performance & Goals', 'Cloud Integration'],
    actionLink: '/services#sap-successfactors-consulting',
    actionTextEn: 'Explore SuccessFactors Practice',
    actionTextDe: 'SuccessFactors erkunden',
  },
  {
    id: 'abap-engineering',
    badgeEn: 'TECHNICAL ARCHITECTURE',
    badgeDe: 'TECHNISCHE ARCHITEKTUR',
    titleEn: 'Custom ABAP, RICEFW Development & System Integration',
    titleDe: 'Individuelle ABAP-, RICEFW-Entwicklung & Systemintegration',
    subtitleEn: 'Senior technical developers engineering robust custom enhancements, BAPIs, IDocs, RFCs, and mission-critical integration pipelines.',
    subtitleDe: 'Erfahrene Entwickler für maßgeschneiderte Erweiterungen, BAPIs, IDocs, RFCs und unternehmenskritische Schnittstellen.',
    targetMarketEn: 'Implementation Teams Needing High-Velocity Technical Execution',
    targetMarketDe: 'Implementierungsteams mit Bedarf an schneller technischer Umsetzung',
    tags: ['RICEFW Development', 'Enhancement Frameworks', 'Interface Integration', 'Performance Tuning'],
    actionLink: '/expertise#abap',
    actionTextEn: 'Explore ABAP Practice',
    actionTextDe: 'ABAP-Praxis erkunden',
  },
  {
    id: 'strategic-staffing',
    badgeEn: 'STRATEGIC TALENT POOL',
    badgeDe: 'STRATEGISCHER TALENTPOOL',
    titleEn: 'Flexible On-Demand SAP & Vistex Project Staffing',
    titleDe: 'Flexible On-Demand Personalvermittlung für SAP & Vistex',
    subtitleEn: 'Rapid placement of qualified consultants for contract roles, project augmentation, and critical go-live execution support.',
    subtitleDe: 'Schnelle Bereitstellung qualifizierter Berater für Projektverstärkung, Interim-Rollen und Go-Live-Unterstützung.',
    targetMarketEn: 'Consulting Firms, Global SIs & Enterprise Program Managers',
    targetMarketDe: 'Beratungshäuser, Systemintegratoren & Programm-Manager',
    tags: ['Contract Roles', 'Project Augmentation', 'Go-Live Execution', 'Scalable Teams'],
    actionLink: '/contact',
    actionTextEn: 'Discuss Staffing Needs',
    actionTextDe: 'Personalbedarf anfragen',
  },
];
