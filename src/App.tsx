import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { SiteContentProvider } from './lib/siteContent';
import { BlogPostPage } from './pages/BlogPostPage';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { ExpertisePage } from './pages/ExpertisePage';
import { CareersPage } from './pages/CareersPage';
import { JobDetailsPage } from './pages/JobDetailsPage';
import { ContactPage } from './pages/ContactPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { PortalPage } from './pages/PortalPage';

// Scroll to top helper on route change
const ScrollToTop: React.FC = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
    } else {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [pathname, hash]);

  return null;
};

const PublicSite: React.FC = () => (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Navbar />
          <div style={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/expertise" element={<ExpertisePage />} />
              <Route path="/careers" element={<CareersPage />} />
              <Route path="/careers/:jobId" element={<JobDetailsPage />} />
              <Route path="/insights/:slug" element={<BlogPostPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/404" element={<NotFoundPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
          <Footer />
        </div>
);

export const App: React.FC = () => {
  return (
    <SiteContentProvider>
    <LanguageProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/portal" element={<PortalPage mode="employee" />} />
          <Route path="/portal/owner" element={<PortalPage mode="owner" />} />
          <Route path="/portal/activate" element={<PortalPage mode="activate" />} />
          <Route path="*" element={<PublicSite />} />
        </Routes>
      </Router>
    </LanguageProvider>
    </SiteContentProvider>
  );
};

export default App;
