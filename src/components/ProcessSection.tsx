import { useState } from 'react';
import { Check, ArrowRight } from 'lucide-react';
import { PROCESS_STEPS } from '../data/agencyData';

interface ProcessSectionProps {
  onStartProject?: () => void;
  variant?: 'light' | 'dark';
}

export function ProcessSection({ onStartProject, variant = 'light' }: ProcessSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeStep = PROCESS_STEPS[activeIndex];
  const isLight = variant === 'light';

  return (
    <section
      aria-labelledby="process-heading"
      className={isLight ? 'bg-[#F8F8FA] text-black py-20 lg:py-24' : 'bg-[#08080B] text-white py-20 lg:py-24'}
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-[#CC1DB9]">Our Methodology</p>
            <h2
              id="process-heading"
              className="mt-2 font-display text-3xl sm:text-4xl font-bold tracking-tight [text-wrap:balance]"
            >
              Seven disciplined stages from discovery to measurable growth
            </h2>
          </div>
          <p
            className={`max-w-md text-sm leading-relaxed ${
              isLight ? 'text-neutral-600' : 'text-neutral-400'
            }`}
          >
            Every engagement follows a structured editorial and strategic workflow—replacing
            improvised posting with repeatable, analytics-backed execution.
          </p>
        </div>

        {/* Interactive Stage Selector Bar */}
        <div
          role="tablist"
          aria-label="Online Oracle 7-step process"
          className="mt-10 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2"
        >
          {PROCESS_STEPS.map((step, idx) => {
            const isSelected = idx === activeIndex;
            return (
              <button
                key={step.number}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => setActiveIndex(idx)}
                className={`flex flex-col items-start rounded-xl border p-3.5 text-left transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFA302] ${
                  isSelected
                    ? isLight
                      ? 'bg-black text-white border-black'
                      : 'bg-[#FFA302] text-black border-[#FFA302]'
                    : isLight
                      ? 'bg-white text-neutral-800 border-neutral-200 hover:border-neutral-400'
                      : 'bg-[#101015] text-neutral-300 border-white/10 hover:border-white/25'
                }`}
              >
                <span
                  className={`font-display text-xs font-bold tabular-nums ${
                    isSelected
                      ? isLight
                        ? 'text-[#FFA302]'
                        : 'text-black'
                      : 'text-[#CC1DB9]'
                  }`}
                >
                  {step.number}
                </span>
                <span className="mt-1 font-display text-sm font-bold leading-snug">
                  {step.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Stage Detail Panel */}
        <div
          role="tabpanel"
          className={`mt-6 rounded-2xl border p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start ${
            isLight
              ? 'bg-white border-neutral-200'
              : 'bg-[#0F0F14] border-white/10'
          }`}
        >
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 text-sm font-medium">
              <span className="font-display text-2xl font-bold text-[#FFA302] tabular-nums">
                Stage {activeStep.number}
              </span>
              <span aria-hidden="true" className={isLight ? 'text-neutral-300' : 'text-neutral-600'}>
                /
              </span>
              <span className={isLight ? 'text-neutral-600' : 'text-neutral-400'}>
                {activeStep.subtitle}
              </span>
            </div>
            <h3 className="mt-3 font-display text-2xl sm:text-3xl font-bold tracking-tight">
              {activeStep.title}
            </h3>
            <p
              className={`mt-4 text-base leading-relaxed max-w-2xl ${
                isLight ? 'text-neutral-700' : 'text-neutral-300'
              }`}
            >
              {activeStep.description}
            </p>
          </div>

          <div
            className={`lg:col-span-5 rounded-xl p-6 ${
              isLight ? 'bg-[#F8F8FA] border border-neutral-200/80' : 'bg-black/50 border border-white/10'
            }`}
          >
            <h4 className="font-display text-sm font-bold tracking-wide">
              Key Stage Deliverables
            </h4>
            <ul className="mt-4 space-y-3">
              {activeStep.outputs.map((output) => (
                <li key={output} className="flex items-start gap-2.5 text-sm">
                  <Check className="h-4 w-4 mt-0.5 text-[#FFA302] shrink-0" />
                  <span className={isLight ? 'text-neutral-800' : 'text-neutral-200'}>
                    {output}
                  </span>
                </li>
              ))}
            </ul>
            {onStartProject && (
              <button
                type="button"
                onClick={onStartProject}
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#CC1DB9] hover:text-[#FFA302] transition-colors cursor-pointer"
              >
                <span>Discuss your roadmap with Online Oracle</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
