import { ArrowRight, Award, BookOpen, ExternalLink, Globe, ShieldCheck } from 'lucide-react';
import {
  AGENCY_CONTACT,
  BRAND_ASSETS,
  FOUNDER_PROFILE,
  WHY_CHOOSE_US,
} from '../data/agencyData';
import type { PageRoute } from '../utils/catalogFilters';

interface AboutPageProps {
  onNavigate: (route: PageRoute) => void;
}

export function AboutPage({ onNavigate }: AboutPageProps) {
  return (
    <div>
      {/* Agency Intro Header */}
      <section className="bg-black text-white pt-14 pb-16 lg:pt-20 lg:pb-20 border-b border-white/10">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-8">
              <p className="text-sm font-semibold text-[#FFA302]">About Online Oracle</p>
              <h1 className="mt-3 font-display text-4xl sm:text-5xl font-bold tracking-tight [text-wrap:balance]">
                Where research-grade storytelling meets AI-accelerated digital execution
              </h1>
              <p className="mt-5 text-base sm:text-lg leading-relaxed text-neutral-300 max-w-3xl">
                Founded in February 2022, Online Oracle is an independent digital content agency
                and creative platform dedicated to helping individuals, startups, consultancies,
                and organizations build durable authority across content, social media, automation,
                and web experiences.
              </p>
            </div>

            <div className="lg:col-span-4 flex lg:justify-end">
              <div className="rounded-2xl border border-white/10 bg-[#0B0B0F] p-6 flex items-center gap-4 max-w-sm">
                <img
                  src={BRAND_ASSETS.logoDark}
                  alt="Online Oracle official dark logo"
                  referrerPolicy="no-referrer"
                  className="h-20 w-20 object-contain shrink-0"
                />
                <div>
                  <p className="font-display text-lg font-bold text-white">Online Oracle</p>
                  <p className="text-xs text-neutral-400 mt-1">
                    Independent Digital Content Agency · Est. February 2022 · Pakistan &amp; Global
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Vision, Mission & Philosophy */}
          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-white/10 bg-[#0B0B0F] p-6 sm:p-7">
              <p className="font-display text-sm font-bold text-[#FFA302]">01. Vision</p>
              <h2 className="mt-2 font-display text-2xl font-bold text-white">
                Clarity in a Noisy Digital Economy
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-neutral-300">
                To be the trusted creative and strategic partner for ambitious brands seeking
                intelligent, culturally fluent, and verifiable digital presence across local and
                international markets.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#0B0B0F] p-6 sm:p-7">
              <p className="font-display text-sm font-bold text-[#CC1DB9]">02. Mission</p>
              <h2 className="mt-2 font-display text-2xl font-bold text-white">
                Unite Editorial Craft with Modern Tech
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-neutral-300">
                To deliver strategic content, omnichannel social growth, executive ghostwriting,
                hybrid AI workflows, and responsive web platforms that convert audience attention
                into measurable business authority.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#0B0B0F] p-6 sm:p-7">
              <p className="font-display text-sm font-bold text-[#FFA302]">03. Philosophy</p>
              <h2 className="mt-2 font-display text-2xl font-bold text-white">
                Research First, AI Second, Outcomes Always
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-neutral-300">
                Tools never replace thinking. Every campaign begins with 360° source verification
                and human strategic judgment, then leverages generative AI responsibly for speed
                and creative scale.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Profile Section (Documented Personal Experience) */}
      <section aria-labelledby="founder-profile-heading" className="bg-white text-black py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-4 lg:sticky lg:top-24">
              <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-100">
                <img
                  src={BRAND_ASSETS.founderPortrait}
                  alt="Bilal Shoukat Azad — Founder, CEO & Content Marketing Director"
                  referrerPolicy="no-referrer"
                  className="w-full aspect-square object-cover object-top"
                />
              </div>

              <div className="mt-6 rounded-2xl border border-neutral-200 bg-[#F8F8FA] p-5 space-y-4">
                <div>
                  <p className="font-display text-xl font-bold text-black">
                    {FOUNDER_PROFILE.name}
                  </p>
                  <p className="text-xs text-neutral-600 mt-0.5">{FOUNDER_PROFILE.headline}</p>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-3 border-t border-neutral-200">
                  <div>
                    <p className="font-display text-2xl font-bold text-[#FFA302] tabular-nums">
                      {FOUNDER_PROFILE.experienceYears}
                    </p>
                    <p className="text-xs text-neutral-600">Years Experience</p>
                  </div>
                  <div>
                    <p className="font-display text-2xl font-bold text-[#CC1DB9] tabular-nums">
                      {FOUNDER_PROFILE.publishedPieces}
                    </p>
                    <p className="text-xs text-neutral-600">Published Pieces</p>
                  </div>
                </div>

                <div className="pt-3 border-t border-neutral-200 flex flex-col gap-2">
                  <a
                    href={AGENCY_CONTACT.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-between rounded-lg bg-black px-4 py-2.5 text-xs font-semibold text-white hover:bg-[#CC1DB9] transition-colors"
                  >
                    <span>View LinkedIn Profile</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                  <a
                    href={BRAND_ASSETS.resumePdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-between rounded-lg border border-neutral-300 bg-white px-4 py-2.5 text-xs font-semibold text-black hover:border-black transition-colors"
                  >
                    <span>Read Executive Resume (PDF)</span>
                    <BookOpen className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </div>

            <div className="lg:col-span-8">
              <p className="text-sm font-semibold text-[#CC1DB9]">
                Founder&apos;s Documented Background &amp; Credibility
              </p>
              <h2
                id="founder-profile-heading"
                className="mt-2 font-display text-3xl sm:text-4xl font-bold tracking-tight"
              >
                Led by Bilal Shoukat Azad
              </h2>
              <p className="mt-2 text-xs text-neutral-500">
                Note: The career engagements, publications, and awards below document the
                founder&apos;s personal professional track record alongside his direction of Online
                Oracle.
              </p>

              <div className="mt-6 space-y-4 text-base leading-relaxed text-neutral-700">
                {FOUNDER_PROFILE.bioParagraphs.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>

              {/* Career Timeline */}
              <div className="mt-12">
                <h3 className="font-display text-2xl font-bold text-black">
                  Documented Career Trajectory
                </h3>
                <div className="mt-6 divide-y divide-neutral-200 border-t border-b border-neutral-200">
                  {FOUNDER_PROFILE.timeline.map((item) => (
                    <div
                      key={`${item.organization}-${item.period}`}
                      className="py-5 grid grid-cols-1 sm:grid-cols-12 gap-3"
                    >
                      <div className="sm:col-span-4">
                        <p className="text-xs font-semibold text-[#CC1DB9] tabular-nums">
                          {item.period}
                        </p>
                        <p className="mt-1 font-display text-base font-bold text-black">
                          {item.organization}
                        </p>
                        <p className="text-xs text-neutral-500">{item.location}</p>
                      </div>
                      <div className="sm:col-span-8">
                        <p className="text-sm font-semibold text-neutral-900">{item.role}</p>
                        <p className="mt-1.5 text-sm leading-relaxed text-neutral-600">
                          {item.highlight}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Certifications & Academic Credentials */}
              <div className="mt-12">
                <h3 className="font-display text-2xl font-bold text-black">
                  Certifications, Governance &amp; Education
                </h3>
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-5">
                  {FOUNDER_PROFILE.certifications.map((group) => (
                    <div
                      key={group.issuer}
                      className="rounded-2xl border border-neutral-200 bg-[#F8F8FA] p-5"
                    >
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="h-4 w-4 text-[#FFA302] shrink-0" />
                        <h4 className="font-display text-base font-bold text-black">
                          {group.issuer}
                        </h4>
                      </div>
                      <ul className="mt-3 space-y-2 text-sm text-neutral-700">
                        {group.items.map((cert) => (
                          <li key={cert} className="leading-snug">
                            · {cert}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}

                  {/* Civic Leadership & Languages */}
                  <div className="rounded-2xl border border-neutral-200 bg-[#F8F8FA] p-5">
                    <div className="flex items-center gap-2">
                      <Award className="h-4 w-4 text-[#CC1DB9] shrink-0" />
                      <h4 className="font-display text-base font-bold text-black">
                        Civic PR &amp; Elected Leadership
                      </h4>
                    </div>
                    <ul className="mt-3 space-y-2 text-sm text-neutral-700">
                      {FOUNDER_PROFILE.civicLeadership.map((item) => (
                        <li key={item} className="leading-snug">
                          · {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Languages & Production Tool Stack */}
              <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="rounded-2xl border border-neutral-200 p-5">
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-[#FFA302]" />
                    <h4 className="font-display text-base font-bold text-black">
                      Multilingual Fluency
                    </h4>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-y-2 gap-x-4 text-sm">
                    {FOUNDER_PROFILE.languages.map((lang) => (
                      <div key={lang.name} className="flex items-baseline justify-between gap-2">
                        <span className="font-medium text-black">{lang.name}</span>
                        <span className="text-xs text-neutral-500">{lang.level}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-neutral-200 p-5">
                  <h4 className="font-display text-base font-bold text-black">
                    Core Production &amp; Analytics Stack
                  </h4>
                  <ul className="mt-3 space-y-1.5 text-sm text-neutral-700">
                    {FOUNDER_PROFILE.toolStack.map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Summary Banner */}
      <section className="bg-black text-white py-16 border-t border-white/10">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold">
                {WHY_CHOOSE_US.length} pillars of measurable agency partnership
              </h2>
              <p className="mt-2 text-sm text-neutral-400">
                Explore how our 9 specialized services translate this experience into outcomes for
                your brand.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
              <button
                type="button"
                onClick={() => onNavigate('services')}
                className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-5 py-3 text-sm font-semibold text-white hover:border-white transition-colors cursor-pointer"
              >
                <span>Explore Services</span>
              </button>
              <button
                type="button"
                onClick={() => onNavigate('contact')}
                className="inline-flex items-center gap-2 rounded-lg bg-[#FFA302] px-5 py-3 text-sm font-semibold text-black hover:bg-[#ffb636] transition-colors cursor-pointer"
              >
                <span>Let&apos;s Work Together</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
