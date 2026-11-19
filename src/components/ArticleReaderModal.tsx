import { useEffect } from 'react';
import { ArrowRight, Check, X } from 'lucide-react';
import type { InsightArticle } from '../data/agencyData';

interface ArticleReaderModalProps {
  article: InsightArticle | null;
  onClose: () => void;
  onStartProject: () => void;
}

export function ArticleReaderModal({
  article,
  onClose,
  onStartProject,
}: ArticleReaderModalProps) {
  useEffect(() => {
    if (!article) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [article, onClose]);

  if (!article) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="article-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 sm:p-6 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl rounded-2xl bg-white text-black shadow-2xl my-auto max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="h-1.5 w-full oracle-gradient-line rounded-t-2xl" />
        <article className="p-6 sm:p-10">
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-600">
              <span className="font-semibold text-[#CC1DB9]">{article.category}</span>
              <span aria-hidden="true">·</span>
              <span>{article.publishedDate}</span>
              <span aria-hidden="true">·</span>
              <span>{article.readTime}</span>
              <span aria-hidden="true">·</span>
              <span>By {article.author}</span>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close article reader"
              className="rounded-lg border border-neutral-200 p-2 text-neutral-600 hover:bg-neutral-100 hover:text-black transition-colors shrink-0 cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <h2
            id="article-modal-title"
            className="mt-4 font-display text-2xl sm:text-3xl font-bold tracking-tight [text-wrap:balance]"
          >
            {article.title}
          </h2>

          <p className="mt-4 text-base font-medium text-neutral-700 leading-relaxed">
            {article.excerpt}
          </p>

          <div className="mt-6 rounded-xl bg-[#F8F8FA] border border-neutral-200 p-5">
            <h3 className="font-display text-sm font-bold text-black">Key Takeaways</h3>
            <ul className="mt-3 space-y-2 text-sm text-neutral-700">
              {article.takeaways.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <Check className="h-4 w-4 mt-0.5 text-[#FFA302] shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 space-y-4 text-base leading-relaxed text-neutral-800">
            {article.body.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-neutral-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <p className="text-sm text-neutral-600">
              Want to apply this framework to your organization?
            </p>
            <button
              type="button"
              onClick={() => {
                onClose();
                onStartProject();
              }}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-black px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#CC1DB9] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>Let&apos;s Work Together</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </article>
      </div>
    </div>
  );
}
