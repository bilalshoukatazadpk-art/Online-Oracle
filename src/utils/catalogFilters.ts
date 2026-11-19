import type {
  InsightArticle,
  InsightCategory,
  PortfolioCategory,
  PortfolioItem,
  ServiceCategory,
  ServiceItem,
} from '../data/agencyData';

export type PageRoute = 'home' | 'about' | 'services' | 'portfolio' | 'insights' | 'contact';

const ROUTE_MAP: Record<string, PageRoute> = {
  '': 'home',
  '/': 'home',
  '/home': 'home',
  '/about': 'about',
  '/services': 'services',
  '/portfolio': 'portfolio',
  '/work': 'portfolio',
  '/insights': 'insights',
  '/blog': 'insights',
  '/contact': 'contact',
};

export function resolveRouteFromPath(pathname: string): PageRoute {
  const normalized = pathname.trim().toLowerCase().replace(/\/+$/, '') || '/';
  return ROUTE_MAP[normalized] ?? 'home';
}

export function getPathForRoute(route: PageRoute): string {
  return route === 'home' ? '/' : `/${route}`;
}

export function filterServices(
  items: ServiceItem[],
  category: ServiceCategory,
  query: string = '',
): ServiceItem[] {
  const normalizedQuery = query.trim().toLowerCase();
  return items.filter((item) => {
    const matchesCategory = category === 'All' || item.category === category;
    if (!matchesCategory) return false;
    if (!normalizedQuery) return true;
    const haystack = [
      item.title,
      item.shortDescription,
      item.fullDescription,
      item.idealFor,
      ...item.deliverables,
    ]
      .join(' ')
      .toLowerCase();
    return haystack.includes(normalizedQuery);
  });
}

export function filterPortfolio(
  items: PortfolioItem[],
  category: PortfolioCategory,
  query: string = '',
): PortfolioItem[] {
  const normalizedQuery = query.trim().toLowerCase();
  return items.filter((item) => {
    const matchesCategory = category === 'All' || item.category === category;
    if (!matchesCategory) return false;
    if (!normalizedQuery) return true;
    const haystack = [
      item.title,
      item.organization,
      item.summary,
      item.headlineMetric,
      ...item.platforms,
    ]
      .join(' ')
      .toLowerCase();
    return haystack.includes(normalizedQuery);
  });
}

export function filterInsights(
  items: InsightArticle[],
  category: InsightCategory,
): InsightArticle[] {
  if (category === 'All') return items;
  return items.filter((article) => article.category === category);
}
