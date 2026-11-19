import { useCallback, useEffect, useState } from 'react';
import type { InsightArticle, PortfolioItem } from './data/agencyData';
import {
  getPathForRoute,
  resolveRouteFromPath,
  type PageRoute,
} from './utils/catalogFilters';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CaseStudyModal } from './components/CaseStudyModal';
import { ArticleReaderModal } from './components/ArticleReaderModal';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { PortfolioPage } from './pages/PortfolioPage';
import { InsightsPage } from './pages/InsightsPage';
import { ContactPage } from './pages/ContactPage';

const PAGE_TITLES: Record<PageRoute, string> = {
  home: 'Online Oracle — Digital Content, AI & Creative Agency',
  about: 'About Online Oracle & Bilal Shoukat Azad — Digital Content Agency',
  services: 'Services — Social Media, Ghostwriting, AI & Web | Online Oracle',
  portfolio: 'Portfolio & Documented Engagements | Online Oracle',
  insights: 'Insights & Strategy Research | Online Oracle',
  contact: 'Contact & Start Your Project | Online Oracle',
};

export default function App() {
  const [activeRoute, setActiveRoute] = useState<PageRoute>(() =>
    typeof window !== 'undefined' ? resolveRouteFromPath(window.location.pathname) : 'home',
  );
  const [preselectedService, setPreselectedService] = useState<string | undefined>(undefined);
  const [activePortfolioItem, setActivePortfolioItem] = useState<PortfolioItem | null>(null);
  const [activeArticle, setActiveArticle] = useState<InsightArticle | null>(null);

  const navigate = useCallback((route: PageRoute, serviceHint?: string) => {
    setActiveRoute(route);
    if (serviceHint !== undefined) {
      setPreselectedService(serviceHint);
    }
    const targetPath = getPathForRoute(route);
    if (typeof window !== 'undefined' && window.location.pathname !== targetPath) {
      window.history.pushState({ route }, '', targetPath);
    }
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  useEffect(() => {
    document.title = PAGE_TITLES[activeRoute];
  }, [activeRoute]);

  useEffect(() => {
    const handlePopState = () => {
      setActiveRoute(resolveRouteFromPath(window.location.pathname));
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Navbar activeRoute={activeRoute} onNavigate={navigate} />

      <main className="flex-1" data-active-route={activeRoute}>
        {activeRoute === 'home' && (
          <HomePage
            onNavigate={navigate}
            onSelectPortfolio={setActivePortfolioItem}
            onSelectArticle={setActiveArticle}
          />
        )}
        {activeRoute === 'about' && <AboutPage onNavigate={navigate} />}
        {activeRoute === 'services' && (
          <ServicesPage
            onInquireService={(serviceTitle) => navigate('contact', serviceTitle)}
          />
        )}
        {activeRoute === 'portfolio' && (
          <PortfolioPage
            onSelectPortfolio={setActivePortfolioItem}
            onStartProject={(hint) => navigate('contact', hint)}
          />
        )}
        {activeRoute === 'insights' && (
          <InsightsPage
            onSelectArticle={setActiveArticle}
            onStartProject={() => navigate('contact')}
          />
        )}
        {activeRoute === 'contact' && (
          <ContactPage preselectedService={preselectedService} />
        )}
      </main>

      <Footer onNavigate={(route) => navigate(route)} />

      <CaseStudyModal
        item={activePortfolioItem}
        onClose={() => setActivePortfolioItem(null)}
        onInquire={(hint) => navigate('contact', hint)}
      />

      <ArticleReaderModal
        article={activeArticle}
        onClose={() => setActiveArticle(null)}
        onStartProject={() => navigate('contact')}
      />
    </div>
  );
}
