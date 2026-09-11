import React from 'react';
import { SEO } from '../components/common/SEO';
import { Hero } from '../sections/home/Hero';
import { AboutPreview } from '../sections/home/AboutPreview';
import { WhyNovaSitara } from '../sections/home/WhyNovaSitara';
import { ExpertiseDiagram } from '../sections/home/ExpertiseDiagram';
import { InsightsSection } from '../sections/home/InsightsSection';
import { ServicesOverview } from '../sections/home/ServicesOverview';
import { VistexFeature } from '../sections/home/VistexFeature';
import { ProjectEnvironments } from '../sections/home/ProjectEnvironments';
import { CareersPreview } from '../sections/home/CareersPreview';
import { CTASection } from '../sections/common/CTASection';

export const HomePage: React.FC = () => {
  return (
    <>
      <SEO
        title="SAP & Vistex Consulting + Technology Staffing"
        description="Nova Sitara Private Limited connects organizations with experienced SAP and Vistex consultants who help accelerate implementations, enhancements, migrations and application support."
      />

      <main>
        {/* Approved Hero */}
        <Hero />

        {/* Section 1: About Nova Sitara */}
        <AboutPreview />

        {/* Section 2: Why Nova Sitara / How We Work */}
        <WhyNovaSitara />

        {/* Section 3: Specialized Expertise (Bento Showcase) */}
        <ExpertiseDiagram />

        {/* Section 4: Perspectives & Insights (Inherited directly above How We Help) */}
        <InsightsSection />

        {/* Section 5: Services Index (How We Help) */}
        <ServicesOverview />

        {/* Section 6: Vistex Specialization Feature */}
        <VistexFeature />

        {/* Section 7: Who We Support (Built for Different Project Needs) */}
        <ProjectEnvironments />

        {/* Section 8: Careers Preview */}
        <CareersPreview />

        {/* Section 9: Final Contact CTA */}
        <CTASection />
      </main>
    </>
  );
};
