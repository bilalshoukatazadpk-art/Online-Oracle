import { useState } from 'react';
import { ArrowRight, ArrowUpRight, Search } from 'lucide-react';
import {
  PORTFOLIO_ITEMS,
  type PortfolioCategory,
  type PortfolioItem,
} from '../data/agencyData';
import { filterPortfolio } from '../utils/catalogFilters';

interface PortfolioPageProps {
  onSelectPortfolio: (item: PortfolioItem) => void;
  onStartProject: (serviceHint?: string) => void;
}

const CATEGORIES: PortfolioCategory[] = [
  'All',
  'Social Media & PR',
  'Digital Ecosystems',
  'Ghostwriting & Editorial',
  'AI & Automation',
  'Growth Campaigns',
];

export function PortfolioPage({ onSelectPortfolio, onStartProject }: PortfolioPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<PortfolioCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = filterPortfolio(PORTFOLIO_ITEMS, selectedCategory, searchQuery);

  return (
    <div>
      <section className="bg-black text-white pt-14 pb-12 lg:pt-20 lg:pb-16 border-b border-white/10">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <p className="text-sm font-semibold text-[#FFA302]">Portfolio &amp; Track Record</p>
          <h1 className="mt-3 font-display text-4xl sm:text-5xl font-bold tracking-tight max-w-3xl [text-wrap:balance]">
            Documented creative campaigns, digital ecosystems &amp; editorial leadership
          </h1>
          <p className="mt-4 text-base text-neutral-300 max-w-3xl leading-relaxed">
            Every engagement featured below reflects verified work from Online Oracle&apos;s
            agency practice or founder Bilal Shoukat Azad&apos;s documented leadership roles across
            sustainability consultancies, engineering firms, national platforms, travel brands, and
            newsrooms.
          </p>

          <div className="mt-10 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div
              role="group"
              aria-label="Filter portfolio by discipline"
              className="flex flex-wrap items-center gap-1.5 rounded-xl bg-[#0D0D12] border border-white/10 p-1.5"
            >
              {CATEGORIES.map((category) => {
                const active = selectedCategory === category;
                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setSelectedCategory(category)}
                    aria-pressed={active}
                    className={`rounded-lg px-3.5 py-2 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      active
                        ? 'bg-[#FFA302] text-black font-semibold'
                        : 'text-neutral-300 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>

            <div className="relative w-full lg:w-72">
              <label htmlFor="portfolio-search" className="sr-only">
                Search portfolio
              </label>
              <Search className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
              <input
                id="portfolio-search"
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search organization or channel..."
                className="w-full rounded-xl border border-white/15 bg-[#0D0D12] pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-neutral-500 focus:border-[#FFA302] focus:outline-none"
              />
            </div>
          </div>
        </div>
      </section>

      <section aria-label="Portfolio showcase" className="bg-[#050507] text-white py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <p className="text-xs text-neutral-400 mb-6 tabular-nums" data-testid="portfolio-count">
            Showing {filtered.length} of {PORTFOLIO_ITEMS.length} documented engagements
          </p>

          {filtered.length === 0 ? (
            <div className="rounded-2xl border border-white/10 bg-[#0D0D11] p-12 text-center">
              <p className="font-display text-xl font-bold text-white">No matching projects found</p>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('All');
                  setSearchQuery('');
                }}
                className="mt-4 rounded-lg bg-[#FFA302] px-4 py-2 text-sm font-semibold text-black hover:bg-[#ffb636] transition-colors cursor-pointer"
              >
                Show All Projects
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filtered.map((item) => (
                <article
                  key={item.id}
                  className="rounded-2xl border border-white/10 bg-[#0D0D11] p-6 sm:p-8 flex flex-col justify-between hover:border-[#FFA302]/60 transition-colors"
                >
                  <div>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-400">
                      <span
                        className={`font-semibold ${
                          item.accent === 'orange' ? 'text-[#FFA302]' : 'text-[#CC1DB9]'
                        }`}
                      >
                        {item.attributionType}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{item.category}</span>
                      <span aria-hidden="true">·</span>
                      <span>{item.timeframe}</span>
                    </div>

                    <h2 className="mt-3 font-display text-2xl sm:text-3xl font-bold text-white">
                      {item.organization}
                    </h2>
                    <p className="mt-1 text-base font-medium text-neutral-200">{item.title}</p>
                    <p className="mt-1 text-xs text-neutral-400">{item.roleAttribution}</p>

                    <div className="mt-5 py-3 border-y border-white/10">
                      <p className="font-display text-lg font-bold text-[#FFA302]">
                        {item.headlineMetric}
                      </p>
                    </div>

                    <p className="mt-4 text-sm leading-relaxed text-neutral-300">{item.summary}</p>
                  </div>

                  <div className="mt-6 pt-5 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                    <span className="text-xs text-neutral-400">
                      {item.platforms.slice(0, 3).join(' · ')}
                    </span>
                    <button
                      type="button"
                      onClick={() => onSelectPortfolio(item)}
                      aria-label={`Inspect case study for ${item.organization}`}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-white hover:text-[#FFA302] transition-colors cursor-pointer"
                    >
                      <span>View Case Study</span>
                      <ArrowUpRight className="h-4 w-4" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* Bottom CTA */}
          <div className="mt-16 rounded-2xl border border-white/10 bg-[#0D0D11] p-8 sm:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">
                Have a campaign, platform, or publication in mind?
              </h2>
              <p className="mt-2 text-sm text-neutral-400 max-w-xl">
                Share your objectives and receive a clear, research-informed scope of work from
                Online Oracle.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onStartProject()}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#FFA302] px-6 py-3 text-sm font-semibold text-black hover:bg-[#ffb636] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>Start Your Project</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
