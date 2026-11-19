import { useState } from 'react';
import { ArrowRight, Check, Search } from 'lucide-react';
import { SERVICES, type ServiceCategory } from '../data/agencyData';
import { filterServices } from '../utils/catalogFilters';
import { TiltServiceCard } from '../components/TiltServiceCard';
import { ProcessSection } from '../components/ProcessSection';

interface ServicesPageProps {
  onInquireService: (serviceTitle: string) => void;
}

const CATEGORIES: ServiceCategory[] = [
  'All',
  'Social & Growth',
  'Writing & Editorial',
  'AI & Automation',
  'Web & Experience',
];

export function ServicesPage({ onInquireService }: ServicesPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = filterServices(SERVICES, selectedCategory, searchQuery);

  return (
    <div>
      {/* Header */}
      <section className="bg-black text-white pt-14 pb-12 lg:pt-20 lg:pb-16 border-b border-white/10">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <p className="text-sm font-semibold text-[#FFA302]">Comprehensive Agency Services</p>
          <h1 className="mt-3 font-display text-4xl sm:text-5xl font-bold tracking-tight max-w-3xl [text-wrap:balance]">
            Nine core disciplines designed to strengthen brand authority and growth
          </h1>
          <p className="mt-4 text-base sm:text-lg text-neutral-300 max-w-2xl leading-relaxed">
            Every Online Oracle service pairs human strategic direction with disciplined research
            and modern production systems. Filter by category or inquire directly on any discipline.
          </p>

          {/* Interactive Filter Bar & Search */}
          <div className="mt-10 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div
              role="group"
              aria-label="Filter services by category"
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
              <label htmlFor="service-search" className="sr-only">
                Search services
              </label>
              <Search className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
              <input
                id="service-search"
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search deliverables or tools..."
                className="w-full rounded-xl border border-white/15 bg-[#0D0D12] pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-neutral-500 focus:border-[#FFA302] focus:outline-none"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section aria-label="Services catalog" className="bg-[#050507] text-white py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <p className="text-xs text-neutral-400 mb-6 tabular-nums" data-testid="services-count">
            Showing {filtered.length} of {SERVICES.length} services
          </p>

          {filtered.length === 0 ? (
            <div className="rounded-2xl border border-white/10 bg-[#0D0D11] p-12 text-center">
              <p className="font-display text-xl font-bold text-white">No matching services found</p>
              <p className="mt-2 text-sm text-neutral-400">
                Try clearing your search term or switching back to all service categories.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('All');
                  setSearchQuery('');
                }}
                className="mt-5 rounded-lg bg-[#FFA302] px-4 py-2 text-sm font-semibold text-black hover:bg-[#ffb636] transition-colors cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((service) => (
                <TiltServiceCard
                  key={service.id}
                  accent={service.accent}
                  className="p-6 sm:p-7 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs text-neutral-400">
                      <span
                        className={`font-display text-sm font-bold tabular-nums ${
                          service.accent === 'orange' ? 'text-[#FFA302]' : 'text-[#CC1DB9]'
                        }`}
                      >
                        {service.number}
                      </span>
                      <span>{service.category}</span>
                    </div>

                    <h2 className="mt-3 font-display text-2xl font-bold text-white">
                      {service.title}
                    </h2>

                    <p className="mt-3 text-sm leading-relaxed text-neutral-300">
                      {service.fullDescription}
                    </p>

                    <div className="mt-5 pt-5 border-t border-white/10">
                      <p className="text-xs font-semibold text-neutral-400">Key Deliverables</p>
                      <ul className="mt-3 space-y-2 text-sm text-neutral-200">
                        {service.deliverables.map((item) => (
                          <li key={item} className="flex items-start gap-2">
                            <Check
                              className={`h-4 w-4 mt-0.5 shrink-0 ${
                                service.accent === 'orange' ? 'text-[#FFA302]' : 'text-[#CC1DB9]'
                              }`}
                            />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-6 pt-5 border-t border-white/10">
                    <p className="text-xs text-neutral-400">
                      Best suited for: <span className="text-neutral-200">{service.idealFor}</span>
                    </p>
                    <button
                      type="button"
                      onClick={() => onInquireService(service.title)}
                      aria-label={`Inquire about ${service.title}`}
                      className="mt-4 w-full inline-flex items-center justify-center gap-2 rounded-lg bg-white/10 hover:bg-[#FFA302] text-white hover:text-black px-4 py-2.5 text-sm font-semibold transition-colors cursor-pointer"
                    >
                      <span>Inquire About This Service</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </TiltServiceCard>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Process Section */}
      <ProcessSection
        variant="light"
        onStartProject={() => onInquireService('Full Digital Content & Strategy Retainer')}
      />
    </div>
  );
}
