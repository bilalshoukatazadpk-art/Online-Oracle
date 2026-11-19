import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import {
  INSIGHT_ARTICLES,
  type InsightArticle,
  type InsightCategory,
} from '../data/agencyData';
import { filterInsights } from '../utils/catalogFilters';

interface InsightsPageProps {
  onSelectArticle: (article: InsightArticle) => void;
  onStartProject: () => void;
}

const CATEGORIES: InsightCategory[] = [
  'All',
  'AI & Production',
  'Social Strategy',
  'Editorial & Ghostwriting',
  'Digital Growth',
];

export function InsightsPage({ onSelectArticle, onStartProject }: InsightsPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<InsightCategory>('All');
  const filtered = filterInsights(INSIGHT_ARTICLES, selectedCategory);

  return (
    <div>
      <section className="bg-black text-white pt-14 pb-12 lg:pt-20 lg:pb-16 border-b border-white/10">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <p className="text-sm font-semibold text-[#FFA302]">Insights &amp; Editorial Research</p>
          <h1 className="mt-3 font-display text-4xl sm:text-5xl font-bold tracking-tight max-w-3xl [text-wrap:balance]">
            Practical strategy on AI production, social growth &amp; executive storytelling
          </h1>
          <p className="mt-4 text-base text-neutral-300 max-w-2xl leading-relaxed">
            Field-tested frameworks written from active agency execution and two decades of
            research-based publishing.
          </p>

          <div
            role="group"
            aria-label="Filter insights by topic"
            className="mt-10 inline-flex flex-wrap items-center gap-1.5 rounded-xl bg-[#0D0D12] border border-white/10 p-1.5"
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
        </div>
      </section>

      <section aria-label="Insights articles" className="bg-white text-black py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filtered.map((article) => (
              <article
                key={article.id}
                className="rounded-2xl border border-neutral-200 bg-[#FAFAFC] p-7 sm:p-8 flex flex-col justify-between hover:border-black transition-colors"
              >
                <div>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-500">
                    <span className="font-semibold text-[#CC1DB9]">{article.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{article.publishedDate}</span>
                    <span aria-hidden="true">·</span>
                    <span>{article.readTime}</span>
                  </div>

                  <h2 className="mt-3 font-display text-2xl sm:text-3xl font-bold leading-snug text-black">
                    {article.title}
                  </h2>

                  <p className="mt-4 text-sm sm:text-base leading-relaxed text-neutral-600">
                    {article.excerpt}
                  </p>

                  <div className="mt-5 pt-5 border-t border-neutral-200">
                    <p className="text-xs font-semibold text-neutral-500">Inside this essay</p>
                    <p className="mt-1.5 text-sm text-neutral-700 leading-relaxed">
                      {article.takeaways[0]}
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-5 border-t border-neutral-200 flex items-center justify-between">
                  <span className="text-xs text-neutral-500">By {article.author}</span>
                  <button
                    type="button"
                    onClick={() => onSelectArticle(article)}
                    aria-label={`Read full article: ${article.title}`}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-black hover:text-[#CC1DB9] transition-colors cursor-pointer"
                  >
                    <span>Read Full Article</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-16 rounded-2xl bg-black text-white p-8 sm:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold">
                Want bespoke content strategy or ghostwriting for your leadership team?
              </h2>
              <p className="mt-2 text-sm text-neutral-400">
                Let&apos;s build a research-backed publishing calendar tailored to your industry.
              </p>
            </div>
            <button
              type="button"
              onClick={onStartProject}
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
