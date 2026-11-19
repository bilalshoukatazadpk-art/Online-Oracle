import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { BRAND_ASSETS } from '../data/agencyData';
import type { PageRoute } from '../utils/catalogFilters';

interface NavbarProps {
  activeRoute: PageRoute;
  onNavigate: (route: PageRoute, preselectedService?: string) => void;
}

const NAV_LINKS: { route: PageRoute; label: string }[] = [
  { route: 'about', label: 'About' },
  { route: 'services', label: 'Services' },
  { route: 'portfolio', label: 'Portfolio' },
  { route: 'insights', label: 'Insights' },
  { route: 'contact', label: 'Contact' },
];

export function Navbar({ activeRoute, onNavigate }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLinkClick = (route: PageRoute) => {
    setMobileOpen(false);
    onNavigate(route);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-black border-b border-white/10">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-8 px-5 sm:px-8">
        {/* Zone 1: Single-line Brand Wordmark */}
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick('home');
          }}
          className="inline-flex items-center gap-3 text-xl font-bold tracking-tight text-white whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FFA302]"
          aria-label="Online Oracle Home"
        >
          <span className="h-7 w-13 overflow-hidden rounded shrink-0 block">
            <img
              src={BRAND_ASSETS.logoDark}
              alt="Online Oracle emblem"
              referrerPolicy="no-referrer"
              className="h-14 w-14 max-w-none -mt-7 -ml-0.5 object-contain"
            />
          </span>
          <span className="font-display text-xl font-bold tracking-tight">
            <span className="text-[#CC1DB9]">O</span>nline{' '}
            <span className="text-[#FFA302]">O</span>racle
          </span>
        </a>

        {/* Zone 2: 5 concise single-line nav links */}
        <nav aria-label="Primary navigation" className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map((link) => {
            const isActive = activeRoute === link.route;
            return (
              <a
                key={link.route}
                href={`/${link.route}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.route);
                }}
                aria-current={isActive ? 'page' : undefined}
                className={`relative py-1 text-sm font-medium transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FFA302] ${
                  isActive ? 'text-white' : 'text-neutral-300 hover:text-white'
                }`}
              >
                {link.label}
                <span
                  aria-hidden="true"
                  className={`absolute bottom-0 left-0 h-0.5 w-full transition-opacity duration-150 ${
                    isActive
                      ? 'opacity-100 oracle-gradient-line'
                      : 'opacity-0 group-hover:opacity-100'
                  }`}
                />
              </a>
            );
          })}
        </nav>

        {/* Zone 3: 1 Primary Action + Mobile Menu Trigger */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => handleLinkClick('contact')}
            className="hidden sm:inline-flex items-center justify-center rounded-lg bg-[#FFA302] px-4 py-2 text-sm font-semibold text-black hover:bg-[#ffb636] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Start Your Project
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="inline-flex md:hidden items-center justify-center rounded-lg border border-white/15 p-2 text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <nav
          aria-label="Mobile navigation"
          className="md:hidden border-t border-white/10 bg-[#0A0A0D] px-5 py-4"
        >
          <div className="flex flex-col gap-1">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('home');
              }}
              aria-current={activeRoute === 'home' ? 'page' : undefined}
              className={`rounded-lg px-3 py-2.5 text-base font-medium ${
                activeRoute === 'home'
                  ? 'bg-white/10 text-[#FFA302]'
                  : 'text-neutral-200 hover:bg-white/5'
              }`}
            >
              Home
            </a>
            {NAV_LINKS.map((link) => {
              const isActive = activeRoute === link.route;
              return (
                <a
                  key={link.route}
                  href={`/${link.route}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(link.route);
                  }}
                  aria-current={isActive ? 'page' : undefined}
                  className={`rounded-lg px-3 py-2.5 text-base font-medium ${
                    isActive
                      ? 'bg-white/10 text-[#FFA302]'
                      : 'text-neutral-200 hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
            <button
              type="button"
              onClick={() => handleLinkClick('contact')}
              className="mt-3 w-full rounded-lg bg-[#FFA302] px-4 py-3 text-center text-sm font-semibold text-black hover:bg-[#ffb636] transition-colors cursor-pointer"
            >
              Start Your Project
            </button>
          </div>
        </nav>
      )}
    </header>
  );
}
