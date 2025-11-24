import React, { useState, useEffect } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Analytics } from './components/Analytics';
import { BackToTop } from './components/BackToTop';
import { HomePage } from './pages/HomePage';
import { PropertiesPage } from './pages/PropertiesPage';
import { ServicesPage } from './pages/ServicesPage';
import BlogPage from './pages/Blog';
import { AboutPage } from './pages/AboutPage';
import { TestimonialsPage } from './pages/TestimonialsPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';
import { CookiesPage } from './pages/CookiesPage';
import { CommercialPropertyPage } from './pages/CommercialPropertyPage';
import { ResidentialEstatesPage } from './pages/ResidentialEstatesPage';
import { DesignRenovationPage } from './pages/DesignRenovationPage';
import { InvestmentAdvisoryPage } from './pages/InvestmentAdvisoryPage';
import { AuthPage } from './pages/AuthPage';
import { ProfilePage } from './pages/ProfilePage';
import { AuthProvider } from './contexts/AuthContext';
import AdminBlog from './pages/AdminBlog';
import { AdminProperties } from './components/AdminProperties';
import { AdminTestimonials } from './components/AdminTestimonials';
import { AdminRecognition } from './components/AdminRecognition';
import { AdminPartnerships } from './components/AdminPartnerships';

/*
═══════════════════════════════════════════════════════════════════
  LINART REALTY LLC - Main App with Client-Side Routing
  ✓ SEO Optimized with Helmet
  ✓ Analytics Integration
  ✓ Semantic HTML Structure
═══════════════════════════════════════════════════════════════════
*/

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  // Set favicon and page title on mount
  useEffect(() => {
    // Set favicon - using logo.png if available
    const setFavicon = () => {
      // Remove existing favicons
      const existingFavicons = document.querySelectorAll("link[rel*='icon']");
      existingFavicons.forEach(favicon => favicon.remove());

      // Add new favicon - try logo.png first, fallback to crown emoji
      const favicon = document.createElement('link');
      favicon.rel = 'icon';
      favicon.type = 'image/png';
      favicon.href = '/logo.png';
      
      // Fallback to crown emoji if logo.png doesn't load
      favicon.onerror = () => {
        favicon.href = "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>👑</text></svg>";
      };
      
      document.head.appendChild(favicon);
    };

    // Set default page title
    if (!document.title || document.title === 'Vite App') {
      document.title = 'Linart Realty LLC - Florida Luxury Real Estate';
    }

    setFavicon();
  }, []);

  useEffect(() => {
    // Handle browser back/forward buttons
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo(0, 0);
  }, [currentPath]);

  // Custom navigation function
  const navigate = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
  };

  // Make navigate available globally
  useEffect(() => {
    (window as any).navigateTo = navigate;
  }, []);

  // Route rendering
  const renderPage = () => {
    switch (currentPath) {
      case '/':
        return <HomePage />;
      case '/properties':
        return <PropertiesPage />;
      case '/services':
        return <ServicesPage />;
      case '/commercial-property':
        return <CommercialPropertyPage />;
      case '/residential-estates':
        return <ResidentialEstatesPage />;
      case '/design-renovation':
        return <DesignRenovationPage />;
      case '/investment-advisory':
        return <InvestmentAdvisoryPage />;
      case '/about':
        return <AboutPage />;
      case '/testimonials':
        return <TestimonialsPage />;
      case '/contact':
        return <ContactPage />;
      case '/privacy':
        return <PrivacyPage />;
      case '/terms':
        return <TermsPage />;
      case '/cookies':
        return <CookiesPage />;
      case '/auth':
        return <AuthPage />;
      case '/profile':
        return <ProfilePage />;
      case '/blog':
        return <BlogPage />;
      case '/admin/blog':
        return <AdminBlog />;
      case '/admin/properties':
        return <AdminProperties />;
      case '/admin/testimonials':
        return <AdminTestimonials />;
      case '/admin/recognition':
        return <AdminRecognition />;
      case '/admin/partnerships':
        return <AdminPartnerships />;
      default:
        return <HomePage />;
    }
  };

  return (
    <HelmetProvider>
      <AuthProvider>
        <div className="min-h-screen bg-[#0A0A0B] text-[#F2EEE7]">
          {/* Global Analytics - Replace with your IDs */}
          <Analytics 
            googleAnalyticsId="" // Add your GA4 ID: G-XXXXXXXXXX
            yandexMetrikaId=""   // Add your Yandex Metrika ID: 12345678
          />
          
          <Navbar />
          <main>
            {renderPage()}
          </main>
          <BackToTop />
          <Footer />
        </div>
      </AuthProvider>
    </HelmetProvider>
  );
}