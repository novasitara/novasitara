export interface InsightArticle {
  id: string;
  titleEn: string;
  titleDe: string;
  categoryEn: string;
  categoryDe: string;
  readTimeEn: string;
  readTimeDe: string;
  excerptEn: string;
  excerptDe: string;
  image: string;
  accentColor: string;
  dateEn: string;
  dateDe: string;
  slug: string;
}

export const insightsData: InsightArticle[] = [
  {
    id: 'ai-enterprise-tech',
    titleEn: 'How AI Is Changing Enterprise Technology',
    titleDe: 'Wie KI die Unternehmenstechnologie transformiert',
    categoryEn: 'ENTERPRISE TECH & AI',
    categoryDe: 'UNTERNEHMENS-IT & KI',
    readTimeEn: '5 min read',
    readTimeDe: '5 Min. Lesezeit',
    excerptEn: 'Exploring how generative AI, machine intelligence, and predictive workflows are reshaping enterprise ERP, analytics, and cloud automation architectures.',
    excerptDe: 'Erfahren Sie, wie generative KI und prädiktive Workflows ERP-Systeme, Datenanalysen und Automatisierungsarchitekturen nachhaltig modernisieren.',
    image: '/images/insights/insight-1.jpg',
    accentColor: '#8F5CE6', // Purple
    dateEn: 'Insights & Technology',
    dateDe: 'Einblicke & Technologie',
    slug: 'how-ai-is-changing-enterprise-technology',
  },
  {
    id: 'flexible-staffing',
    titleEn: 'The Future of Flexible Technology Staffing',
    titleDe: 'Die Zukunft flexibler IT-Personalvermittlung',
    categoryEn: 'STAFFING STRATEGY',
    categoryDe: 'PERSONALSTRATEGIE',
    readTimeEn: '4 min read',
    readTimeDe: '4 Min. Lesezeit',
    excerptEn: 'Why on-demand specialized SAP and Vistex consultants deliver superior project velocity, reduced overhead, and higher ROI compared to rigid legacy models.',
    excerptDe: 'Warum hochspezialisierte On-Demand SAP- und Vistex-Berater herkömmlichen monolithischen Teammodellen in Umsetzungsgeschwindigkeit und ROI überlegen sind.',
    image: '/images/insights/insight-2.jpg',
    accentColor: '#FFB629', // Amber
    dateEn: 'Workforce & Strategy',
    dateDe: 'Arbeitswelt & Strategie',
    slug: 'the-future-of-flexible-technology-staffing',
  },
  {
    id: 'sap-challenges',
    titleEn: 'Five Common Challenges in SAP Implementations',
    titleDe: 'Fünf typische Herausforderungen bei SAP-Einführungen',
    categoryEn: 'SAP ARCHITECTURE',
    categoryDe: 'SAP ARCHITEKTUR',
    readTimeEn: '6 min read',
    readTimeDe: '6 Min. Lesezeit',
    excerptEn: 'From custom RICEFW scope creep to data migration and integration bottlenecks: key lessons and proven strategies for zero-downtime go-lives.',
    excerptDe: 'Von individuellem RICEFW-Mehraufwand bis zu Schnittstellen-Engpässen: bewährte Strategien für reibungslose Go-Lives und nachhaltigen Betrieb.',
    image: '/images/insights/insight-3.jpg',
    accentColor: '#E86BCD', // Pink
    dateEn: 'Implementation & Practice',
    dateDe: 'Implementierung & Praxis',
    slug: 'five-common-challenges-in-sap-implementations',
  },
  {
    id: 'remote-teams',
    titleEn: 'Building High-Performing Remote Project Teams',
    titleDe: 'Aufbau leistungsstarker Remote-Projektteams',
    categoryEn: 'TALENT & LEADERSHIP',
    categoryDe: 'FÜHRUNG & TALENT',
    readTimeEn: '5 min read',
    readTimeDe: '5 Min. Lesezeit',
    excerptEn: 'Proven frameworks for orchestrating distributed SAP functional and technical experts across time zones and critical implementation milestones.',
    excerptDe: 'Erprobte Methoden zur erfolgreichen Führung und Synchronisation verteilter SAP-Funktions- und Technikexperten über verschiedene Zeitzonen.',
    image: '/images/insights/insight-4.png',
    accentColor: '#FF351A', // Coral-red
    dateEn: 'Delivery & Excellence',
    dateDe: 'Projekterfolg & Exzellenz',
    slug: 'building-high-performing-remote-project-teams',
  },
];
