import { useEffect } from 'react';
import { ArrowRight, CheckCircle2, X } from 'lucide-react';
import type { PortfolioItem } from '../data/agencyData';

interface CaseStudyModalProps {
  item: PortfolioItem | null;
  onClose: () => void;
  onInquire: (serviceHint: string) => void;
}

export function CaseStudyModal({ item, onClose, onInquire }: CaseStudyModalProps) {
  useEffect(() => {
    if (!item) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [item, onClose]);

  if (!item) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="case-study-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 sm:p-6 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl rounded-2xl bg-[#0E0E13] border border-white/15 text-white shadow-2xl my-auto max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="h-1.5 w-full oracle-gradient-line rounded-t-2xl" />

        <div className="p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-400">
                <span className="font-semibold text-[#FFA302]">{item.attributionType}</span>
                <span aria-hidden="true">·</span>
                <span>{item.category}</span>
                <span aria-hidden="true">·</span>
                <span>{item.timeframe}</span>
              </div>
              <h2
                id="case-study-title"
                className="mt-2 font-display text-2xl sm:text-3xl font-bold tracking-tight"
              >
                {item.title}
              </h2>
              <p className="mt-1 text-sm text-neutral-300">
                {item.organization} — <span className="text-neutral-400">{item.roleAttribution}</span>
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close case study details"
              className="rounded-lg border border-white/15 p-2 text-neutral-300 hover:bg-white/10 hover:text-white transition-colors shrink-0 cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="mt-6 rounded-xl bg-white/5 border border-white/10 p-4 sm:p-5">
            <p className="text-xs font-medium text-neutral-400">Documented Highlight</p>
            <p className="mt-1 font-display text-xl sm:text-2xl font-bold text-[#FFA302]">
              {item.headlineMetric}
            </p>
          </div>

          <div className="mt-6 space-y-6 text-sm leading-relaxed text-neutral-300">
            <div>
              <h3 className="font-display text-base font-bold text-white">Strategic Mandate</h3>
              <p className="mt-2">{item.challenge}</p>
            </div>

            <div>
              <h3 className="font-display text-base font-bold text-white">Execution &amp; Deliverables</h3>
              <ul className="mt-3 space-y-2.5">
                {item.execution.map((point) => (
                  <li key={point} className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 mt-0.5 text-[#CC1DB9] shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-display text-base font-bold text-white">Verified Outcome</h3>
              <p className="mt-2 text-neutral-200">{item.outcome}</p>
            </div>

            <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="text-xs text-neutral-400">
                Channels &amp; Capabilities:{' '}
                <span className="text-neutral-200">{item.platforms.join(' · ')}</span>
              </div>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onInquire(item.category);
                }}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#FFA302] px-4 py-2.5 text-sm font-semibold text-black hover:bg-[#ffb636] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <span>Build Something Similar</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
