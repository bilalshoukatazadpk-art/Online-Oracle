import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react';
import { AGENCY_CONTACT, BRAND_ASSETS } from '../data/agencyData';
import type { PageRoute } from '../utils/catalogFilters';

interface FooterProps {
  onNavigate: (route: PageRoute) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const navItems: { route: PageRoute; label: string }[] = [
    { route: 'home', label: 'Home' },
    { route: 'about', label: 'About Online Oracle' },
    { route: 'services', label: 'Services' },
    { route: 'portfolio', label: 'Portfolio' },
    { route: 'insights', label: 'Insights' },
    { route: 'contact', label: 'Contact Us' },
  ];

  return (
    <footer className="bg-black border-t border-white/10 text-neutral-300">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="flex items-center gap-3">
              <img
                src={BRAND_ASSETS.logoDark}
                alt="Online Oracle official logo"
                referrerPolicy="no-referrer"
                className="h-14 w-14 rounded-lg object-contain"
              />
              <div>
                <p className="font-display text-2xl font-bold text-white tracking-tight">
                  <span className="text-[#CC1DB9]">O</span>nline{' '}
                  <span className="text-[#FFA302]">O</span>racle
                </p>
                <p className="text-xs text-neutral-400">
                  Digital Content, AI Production &amp; Creative Strategy
                </p>
              </div>
            </div>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-neutral-400">
              Independent digital content agency founded by Bilal Shoukat Azad—combining
              360° editorial research, omnichannel social media growth, executive ghostwriting,
              AI-powered workflows, and modern web design for ambitious organizations.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-5 text-sm">
              {AGENCY_CONTACT.socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith('http') ? '_blank' : undefined}
                  rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="inline-flex items-center gap-1 font-medium text-neutral-200 hover:text-[#FFA302] transition-colors"
                >
                  <span>{social.label}</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              ))}
            </div>
          </div>

          <div className="md:col-span-3">
            <h2 className="font-display text-sm font-semibold text-white tracking-wide">
              Navigation
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {navItems.map((item) => (
                <li key={item.route}>
                  <a
                    href={item.route === 'home' ? '/' : `/${item.route}`}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate(item.route);
                    }}
                    className="text-neutral-400 hover:text-white transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <h2 className="font-display text-sm font-semibold text-white tracking-wide">
              Direct Contact
            </h2>
            <ul className="mt-4 space-y-3 text-sm text-neutral-400">
              <li className="flex items-start gap-2.5">
                <Mail className="h-4 w-4 mt-0.5 text-[#FFA302] shrink-0" />
                <a
                  href={`mailto:${AGENCY_CONTACT.email}`}
                  className="hover:text-white transition-colors break-all"
                >
                  {AGENCY_CONTACT.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="h-4 w-4 mt-0.5 text-[#CC1DB9] shrink-0" />
                <div className="space-y-0.5 tabular-nums">
                  {AGENCY_CONTACT.phones.map((phone) => (
                    <div key={phone}>{phone}</div>
                  ))}
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 mt-0.5 text-[#FFA302] shrink-0" />
                <span>
                  {AGENCY_CONTACT.location}
                  <span className="block text-xs text-neutral-500 mt-0.5">
                    {AGENCY_CONTACT.serviceReach}
                  </span>
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-neutral-500">
          <p>© {new Date().getFullYear()} Online Oracle. Founded &amp; Directed by Bilal Shoukat Azad.</p>
          <p>Lahore, Pakistan · Serving Global Digital Brands</p>
        </div>
      </div>
    </footer>
  );
}
