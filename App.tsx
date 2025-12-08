import React, { useState, useEffect, lazy, Suspense } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Analytics } from './components/Analytics';
import { BackToTop } from './components/BackToTop';
import { HomePage } from './pages/HomePage';
import { PropertiesPage } from './pages/PropertiesPage';
import { ServicesPage } from './pages/ServicesPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { AuthProvider } from './contexts/AuthContext';
import { autoSeed } from './utils/seedData';

// Lazy load non-critical pages
const BlogPage = lazy(() => import('./pages/Blog'));
const TestimonialsPage = lazy(() => import('./pages/TestimonialsPage'));
const PrivacyPage = lazy(() => import('./pages/PrivacyPage'));
const TermsPage = lazy(() => import('./pages/TermsPage'));
const CookiesPage = lazy(() => import('./pages/CookiesPage'));
const CommercialPropertyPage = lazy(() => import('./pages/CommercialPropertyPage'));
const ResidentialEstatesPage = lazy(() => import('./pages/ResidentialEstatesPage'));
const DesignRenovationPage = lazy(() => import('./pages/DesignRenovationPage'));
const InvestmentAdvisoryPage = lazy(() => import('./pages/InvestmentAdvisoryPage'));
const AuthPage = lazy(() => import('./pages/AuthPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const BlogPostPage = lazy(() => import('./pages/BlogPost'));

// Lazy load admin pages
const AdminBlog = lazy(() => import('./pages/AdminBlog'));
const AdminProperties = lazy(() => import('./components/AdminProperties'));
const AdminTestimonials = lazy(() => import('./components/AdminTestimonials'));
const AdminRecognition = lazy(() => import('./components/AdminRecognition'));
const AdminPartnerships = lazy(() => import('./components/AdminPartnerships'));
const SeedPage = lazy(() => import('./pages/SeedPage'));

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
    
    // Auto-seed data on first load
    autoSeed().then((seeded) => {
      if (seeded) {
        console.log('✅ Initial data seeded successfully');
      }
    });
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
      case '/seed':
        return <SeedPage />;
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
            <Suspense fallback={
              <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#E5E4E2]"></div>
              </div>
            }>
              {renderPage()}
            </Suspense>
          </main>
          <BackToTop />
          <Footer />
        </div>
      </AuthProvider>
    </HelmetProvider>
  );
}