import { ArrowRight, ArrowUpRight } from 'lucide-react';
import {
  BRAND_ASSETS,
  FOUNDER_PROFILE,
  INSIGHT_ARTICLES,
  PORTFOLIO_ITEMS,
  SERVICES,
  WHY_CHOOSE_US,
  type InsightArticle,
  type PortfolioItem,
} from '../data/agencyData';
import type { PageRoute } from '../utils/catalogFilters';
import { OracleHeroScene } from '../components/OracleHeroScene';
import { TiltServiceCard } from '../components/TiltServiceCard';
import { ProcessSection } from '../components/ProcessSection';

interface HomePageProps {
  onNavigate: (route: PageRoute, preselectedService?: string) => void;
  onSelectPortfolio: (item: PortfolioItem) => void;
  onSelectArticle: (article: InsightArticle) => void;
}

export function HomePage({
  onNavigate,
  onSelectPortfolio,
  onSelectArticle,
}: HomePageProps) {
  const featuredServices = SERVICES.slice(0, 6);
  const featuredWork = PORTFOLIO_ITEMS.slice(0, 3);
  const featuredInsights = INSIGHT_ARTICLES.slice(0, 3);

  return (
    <div>
      {/* 1. IMMERSIVE 3D HERO SECTION */}
      <section className="relative bg-black text-white pt-10 pb-16 lg:pt-14 lg:pb-24 overflow-hidden">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <div className="lg:col-span-6">
              <p className="text-sm font-semibold text-[#FFA302]">
                Online Oracle · Independent Digital Content &amp; Creative Agency
              </p>
              <h1 className="mt-4 font-display text-4xl sm:text-5xl lg:text-[3.75rem] font-bold leading-[1.06] tracking-tight [text-wrap:balance]">
                Strategic content, human editorial depth, and{' '}
                <span className="oracle-gradient-text">AI-powered scale</span>
              </h1>
              <p className="mt-6 text-base sm:text-lg leading-relaxed text-neutral-300 max-w-xl">
                We help entrepreneurs, startups, consultancies, and institutions build authority
                online—uniting 360° research, omnichannel social media, executive ghostwriting,
                generative AI workflows, and modern web design.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => onNavigate('contact')}
                  className="inline-flex items-center gap-2 rounded-lg bg-[#FFA302] px-6 py-3.5 text-sm font-semibold text-black hover:bg-[#ffb636] transition-colors whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  <span>Start Your Project</span>
                  <ArrowRight className="h-4 w-4" />
                </button>

                <button
                  type="button"
                  onClick={() => onNavigate('services')}
                  className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-6 py-3.5 text-sm font-semibold text-white hover:border-[#CC1DB9] hover:text-[#FFA302] transition-colors whitespace-nowrap cursor-pointer"
                >
                  <span>Explore Our Services</span>
                </button>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 text-xs text-neutral-400 flex flex-wrap items-center gap-x-4 gap-y-1.5">
                <span>Founded by Bilal Shoukat Azad</span>
                <span>Lahore &amp; Global Remote</span>
                <span>English &amp; Urdu Production</span>
              </div>
            </div>

            <div className="lg:col-span-6">
              <OracleHeroScene activeSectionHint="hero" />
            </div>
          </div>

          {/* Full-width 4-Column Verifiable Proof Strip (below hero split) */}
          <div className="mt-12 lg:mt-16 grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 rounded-2xl overflow-hidden border border-white/10">
            {[
              {
                value: FOUNDER_PROFILE.experienceYears,
                label: 'Years Cross-Sector Experience',
                sub: 'Founder career across PR, media & sales',
              },
              {
                value: FOUNDER_PROFILE.publishedPieces,
                label: 'Published Articles & Scripts',
                sub: 'Two unbroken decades of editorial craft',
              },
              {
                value: FOUNDER_PROFILE.engagementGrowth,
                label: 'Documented Engagement Lift',
                sub: 'Omnichannel growth across 3 global markets',
              },
              {
                value: FOUNDER_PROFILE.certificationsCount,
                label: 'Google & Oxford/UNESCO Certs',
                sub: 'AI, UX Design, Analytics & Governance',
              },
            ].map((stat) => (
              <div key={stat.label} className="bg-[#09090C] p-5 sm:p-6">
                <p className="font-display text-3xl sm:text-4xl font-bold text-[#FFA302] tabular-nums">
                  {stat.value}
                </p>
                <p className="mt-1.5 text-sm font-semibold text-white">{stat.label}</p>
                <p className="mt-1 text-xs text-neutral-400">{stat.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. CORE SERVICES HIGHLIGHTS */}
      <section aria-labelledby="home-services-heading" className="bg-[#050507] text-white py-20 lg:py-24 border-t border-white/10">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold text-[#FFA302]">Agency Capabilities</p>
              <h2
                id="home-services-heading"
                className="mt-2 font-display text-3xl sm:text-4xl font-bold tracking-tight [text-wrap:balance]"
              >
                Nine integrated disciplines built to grow brand authority
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('services')}
              className="inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-[#FFA302] transition-colors whitespace-nowrap self-start md:self-auto cursor-pointer"
            >
              <span>View all 9 services</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredServices.map((service) => (
              <TiltServiceCard
                key={service.id}
                accent={service.accent}
                className="p-6 sm:p-7 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-neutral-400">
                    <span className="font-display text-sm font-bold text-[#FFA302] tabular-nums">
                      {service.number}
                    </span>
                    <span>{service.category}</span>
                  </div>
                  <h3 className="mt-4 font-display text-xl font-bold text-white">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-neutral-300">
                    {service.shortDescription}
                  </p>
                </div>

                <div className="mt-6 pt-5 border-t border-white/10 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => onNavigate('contact', service.title)}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#FFA302] hover:text-white transition-colors cursor-pointer"
                  >
                    <span>Inquire now</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onNavigate('services')}
                    className="text-xs text-neutral-400 hover:text-white transition-colors cursor-pointer"
                  >
                    Details
                  </button>
                </div>
              </TiltServiceCard>
            ))}
          </div>
        </div>
      </section>

      {/* 3. WHY CHOOSE ONLINE ORACLE (Crisp Editorial White Section) */}
      <section aria-labelledby="why-choose-heading" className="bg-white text-black py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5 lg:sticky lg:top-24">
              <p className="text-sm font-semibold text-[#CC1DB9]">Why Choose Online Oracle</p>
              <h2
                id="why-choose-heading"
                className="mt-2 font-display text-3xl sm:text-4xl font-bold tracking-tight [text-wrap:balance]"
              >
                Editorial depth meets commercial accountability
              </h2>
              <p className="mt-4 text-base leading-relaxed text-neutral-600">
                Many digital agencies trade substance for volume. Online Oracle pairs two decades
                of research-driven publishing with eight years of award-winning sales leadership
                and certified AI production fluency.
              </p>

              <div className="mt-8 rounded-2xl bg-[#F8F8FA] border border-neutral-200 p-6 flex items-center gap-5">
                <img
                  src={BRAND_ASSETS.logoLight}
                  alt="Online Oracle light emblem"
                  referrerPolicy="no-referrer"
                  className="h-20 w-20 object-contain shrink-0"
                />
                <div>
                  <p className="font-display text-lg font-bold text-black">
                    Built for Clarity &amp; Conversion
                  </p>
                  <p className="mt-1 text-sm text-neutral-600">
                    Every article, reel, campaign, and web page is engineered around measurable
                    brand authority and business growth.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 divide-y divide-neutral-200 border-t border-b border-neutral-200">
              {WHY_CHOOSE_US.map((item) => (
                <div key={item.number} className="py-6 sm:py-7 grid grid-cols-1 sm:grid-cols-12 gap-4">
                  <div className="sm:col-span-2">
                    <span className="font-display text-2xl font-bold text-[#FFA302] tabular-nums">
                      {item.number}
                    </span>
                  </div>
                  <div className="sm:col-span-10">
                    <h3 className="font-display text-xl font-bold text-black">{item.title}</h3>
                    <p className="mt-2 text-sm sm:text-base leading-relaxed text-neutral-600">
                      {item.description}
                    </p>
                    <p className="mt-2.5 text-xs font-semibold text-[#CC1DB9]">{item.proof}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. FEATURED WORK / DOCUMENTED PORTFOLIO PREVIEW */}
      <section aria-labelledby="home-work-heading" className="bg-black text-white py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold text-[#FFA302]">Documented Track Record</p>
              <h2
                id="home-work-heading"
                className="mt-2 font-display text-3xl sm:text-4xl font-bold tracking-tight [text-wrap:balance]"
              >
                Agency practice &amp; founder-led strategic engagements
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('portfolio')}
              className="inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-[#FFA302] transition-colors whitespace-nowrap self-start md:self-auto cursor-pointer"
            >
              <span>Explore full portfolio</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-6">
            {featuredWork.map((project) => (
              <div
                key={project.id}
                className="rounded-2xl border border-white/10 bg-[#0C0C10] p-6 sm:p-7 flex flex-col justify-between hover:border-[#FFA302]/50 transition-colors"
              >
                <div>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-400">
                    <span className="font-semibold text-[#FFA302]">{project.attributionType}</span>
                    <span aria-hidden="true">·</span>
                    <span>{project.category}</span>
                  </div>
                  <h3 className="mt-3 font-display text-2xl font-bold text-white leading-snug">
                    {project.organization}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-neutral-300">{project.title}</p>
                  <p className="mt-4 font-display text-lg font-bold text-[#CC1DB9]">
                    {project.headlineMetric}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-neutral-400">
                    {project.summary}
                  </p>
                </div>

                <div className="mt-6 pt-5 border-t border-white/10 flex items-center justify-between gap-3">
                  <span className="text-xs text-neutral-500">{project.timeframe}</span>
                  <button
                    type="button"
                    onClick={() => onSelectPortfolio(project)}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-white hover:text-[#FFA302] transition-colors cursor-pointer"
                  >
                    <span>Read case study</span>
                    <ArrowUpRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. INTERACTIVE 7-STAGE PROCESS */}
      <ProcessSection variant="light" onStartProject={() => onNavigate('contact')} />

      {/* 6. FOUNDER LEADERSHIP SPOTLIGHT */}
      <section aria-labelledby="founder-spotlight-heading" className="bg-[#07070A] text-white py-20 lg:py-24 border-t border-white/10">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <div className="lg:col-span-5">
              <div className="overflow-hidden rounded-2xl border border-white/15 bg-[#121216]">
                <img
                  src={BRAND_ASSETS.founderPortrait}
                  alt="Bilal Shoukat Azad, Founder and CEO of Online Oracle"
                  referrerPolicy="no-referrer"
                  className="w-full aspect-square object-cover object-top"
                />
              </div>
            </div>

            <div className="lg:col-span-7">
              <p className="text-sm font-semibold text-[#FFA302]">Founder &amp; Creative Director</p>
              <h2
                id="founder-spotlight-heading"
                className="mt-2 font-display text-3xl sm:text-4xl font-bold tracking-tight"
              >
                {FOUNDER_PROFILE.name}
              </h2>
              <p className="mt-2 text-sm text-neutral-400">{FOUNDER_PROFILE.currentLeadership}</p>

              <p className="mt-6 text-base leading-relaxed text-neutral-300">
                {FOUNDER_PROFILE.bioParagraphs[0]}
              </p>
              <p className="mt-4 text-base leading-relaxed text-neutral-300">
                {FOUNDER_PROFILE.bioParagraphs[1]}
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-neutral-400">
                <span>Google Certified AI Professional</span>
                <span aria-hidden="true">·</span>
                <span>Oxford / UNESCO AI Governance Certified</span>
                <span aria-hidden="true">·</span>
                <span>Former PFUC Elected Leadership</span>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => onNavigate('about')}
                  className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-black hover:bg-[#FFA302] transition-colors cursor-pointer"
                >
                  <span>Full Founder Profile &amp; Credentials</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. INSIGHTS PREVIEW */}
      <section aria-labelledby="home-insights-heading" className="bg-white text-black py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <p className="text-sm font-semibold text-[#CC1DB9]">Insights &amp; Research</p>
              <h2
                id="home-insights-heading"
                className="mt-2 font-display text-3xl sm:text-4xl font-bold tracking-tight"
              >
                Perspectives on content strategy &amp; AI production
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('insights')}
              className="inline-flex items-center gap-2 text-sm font-semibold text-black hover:text-[#CC1DB9] transition-colors whitespace-nowrap self-start md:self-auto cursor-pointer"
            >
              <span>Read all insights</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredInsights.map((article) => (
              <article
                key={article.id}
                className="rounded-2xl border border-neutral-200 bg-[#FAFAFC] p-6 flex flex-col justify-between hover:border-black transition-colors"
              >
                <div>
                  <div className="flex items-center gap-2 text-xs text-neutral-500">
                    <span className="font-semibold text-[#CC1DB9]">{article.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{article.readTime}</span>
                  </div>
                  <h3 className="mt-3 font-display text-xl font-bold leading-snug text-black">
                    {article.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-neutral-600">{article.excerpt}</p>
                </div>

                <div className="mt-6 pt-4 border-t border-neutral-200 flex items-center justify-between text-xs text-neutral-500">
                  <span>{article.publishedDate}</span>
                  <button
                    type="button"
                    onClick={() => onSelectArticle(article)}
                    className="inline-flex items-center gap-1 text-sm font-semibold text-black hover:text-[#CC1DB9] transition-colors cursor-pointer"
                  >
                    <span>Read article</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 8. CONVERSION CTA SECTION */}
      <section className="bg-black text-white py-20 border-t border-white/10">
        <div className="mx-auto max-w-5xl px-5 sm:px-8 text-center">
          <p className="text-sm font-semibold text-[#FFA302]">Ready to Build Authority?</p>
          <h2 className="mt-3 font-display text-3xl sm:text-5xl font-bold tracking-tight [text-wrap:balance]">
            Let&apos;s turn your ideas into a measurable digital presence
          </h2>
          <p className="mt-5 mx-auto max-w-2xl text-base text-neutral-300 leading-relaxed">
            Whether you need omnichannel social media governance, confidential executive
            ghostwriting, AI-accelerated video workflows, or a flagship website, let&apos;s map
            your roadmap together.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => onNavigate('contact')}
              className="inline-flex items-center gap-2 rounded-lg bg-[#FFA302] px-7 py-3.5 text-sm font-semibold text-black hover:bg-[#ffb636] transition-colors cursor-pointer"
            >
              <span>Let&apos;s Work Together</span>
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => onNavigate('portfolio')}
              className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-7 py-3.5 text-sm font-semibold text-white hover:border-white transition-colors cursor-pointer"
            >
              <span>Inspect Track Record</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
