import { useEffect, useState, type FormEvent } from 'react';
import {
  ArrowUpRight,
  Check,
  CheckCircle2,
  Copy,
  Mail,
  MapPin,
  Phone,
  Send,
} from 'lucide-react';
import { AGENCY_CONTACT, SERVICES } from '../data/agencyData';
import {
  validateInquiryPayload,
  type InquiryPayload,
} from '../utils/inquiryValidation';

interface ContactPageProps {
  preselectedService?: string;
}

interface InquiryReceipt {
  id: string;
  referenceCode: string;
  fullName: string;
  email: string;
  service: string;
  budget: string;
  timeline: string;
  createdAt: string;
}

const BUDGET_OPTIONS = [
  'Under $1,000 (Starter Scope)',
  '$1,000 – $3,000 (Growth Retainer / Project)',
  '$3,000 – $7,500 (Full-Funnel / Platform)',
  '$7,500+ (Enterprise / Multi-Month)',
  'Let’s discuss after scoping',
];

const TIMELINE_OPTIONS = [
  'Immediate (Within 2 weeks)',
  'Within 1 month',
  '1–3 months',
  'Flexible / Exploratory',
];

export function ContactPage({ preselectedService }: ContactPageProps) {
  const [formData, setFormData] = useState<InquiryPayload>({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    service: preselectedService || SERVICES[0].title,
    budget: BUDGET_OPTIONS[1],
    timeline: TIMELINE_OPTIONS[1],
    message: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof InquiryPayload, string>>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [receipt, setReceipt] = useState<InquiryReceipt | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);

  useEffect(() => {
    if (preselectedService) {
      setFormData((prev) => ({ ...prev, service: preselectedService }));
    }
  }, [preselectedService]);

  const serviceOptions = Array.from(
    new Set([
      ...SERVICES.map((s) => s.title),
      'Full Digital Content & Strategy Retainer',
      ...(preselectedService ? [preselectedService] : []),
    ]),
  );

  const handleFieldChange = (field: keyof InquiryPayload, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(AGENCY_CONTACT.email);
      setCopiedEmail(true);
      window.setTimeout(() => setCopiedEmail(false), 2500);
    } catch {
      setCopiedEmail(false);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError(null);

    const validation = validateInquiryPayload(formData);
    if (!validation.valid || !validation.sanitized) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(validation.sanitized),
      });

      const data = await response.json();
      if (!response.ok || !data.ok) {
        if (data.errors) {
          setErrors(data.errors);
        }
        setSubmitError(data.message || 'Unable to submit your inquiry. Please try again.');
        return;
      }

      setReceipt(data.inquiry as InquiryReceipt);
      window.scrollTo({ top: 180, behavior: 'smooth' });
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        company: '',
        service: SERVICES[0].title,
        budget: BUDGET_OPTIONS[1],
        timeline: TIMELINE_OPTIONS[1],
        message: '',
      });
    } catch {
      setSubmitError('Network error while sending your project brief. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <section className="bg-black text-white pt-14 pb-12 lg:pt-20 lg:pb-16 border-b border-white/10">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <p className="text-sm font-semibold text-[#FFA302]">Contact Online Oracle</p>
          <h1 className="mt-3 font-display text-4xl sm:text-5xl font-bold tracking-tight max-w-3xl [text-wrap:balance]">
            Start your next content, AI, social, or web project
          </h1>
          <p className="mt-4 text-base text-neutral-300 max-w-2xl leading-relaxed">
            Share your objectives, service priorities, and timeline below. Every inquiry is
            reviewed directly by founder Bilal Shoukat Azad with a structured response and clear
            next steps.
          </p>
        </div>
      </section>

      <section className="bg-[#060609] text-white py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Project Inquiry Form */}
            <div className="lg:col-span-7 rounded-2xl border border-white/10 bg-[#0D0D12] p-6 sm:p-9">
              {receipt ? (
                <div
                  role="status"
                  data-testid="inquiry-confirmation"
                  className="py-4 space-y-6"
                >
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#FFA302]/15 text-[#FFA302]">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-[#FFA302] tabular-nums">
                      Reference Code: {receipt.referenceCode}
                    </p>
                    <h2 className="mt-2 font-display text-2xl sm:text-3xl font-bold text-white">
                      Project brief received
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-neutral-300">
                      Thank you, <strong className="text-white">{receipt.fullName}</strong>. Your
                      inquiry regarding <strong className="text-white">{receipt.service}</strong>{' '}
                      has been logged and queued for direct review. Confirmation details will be
                      addressed to <span className="text-white">{receipt.email}</span>.
                    </p>
                  </div>

                  <div className="rounded-xl bg-black/50 border border-white/10 p-5 text-sm space-y-2">
                    <div className="flex justify-between gap-4">
                      <span className="text-neutral-400">Selected Service</span>
                      <span className="font-medium text-white text-right">{receipt.service}</span>
                    </div>
                    <div className="flex justify-between gap-4">
                      <span className="text-neutral-400">Budget Range</span>
                      <span className="font-medium text-white text-right">{receipt.budget}</span>
                    </div>
                    <div className="flex justify-between gap-4">
                      <span className="text-neutral-400">Target Timeline</span>
                      <span className="font-medium text-white text-right">{receipt.timeline}</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setReceipt(null)}
                    className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-5 py-2.5 text-sm font-semibold text-white hover:border-[#FFA302] hover:text-[#FFA302] transition-colors cursor-pointer"
                  >
                    Submit Another Project Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <div>
                    <h2 className="font-display text-2xl font-bold text-white">
                      Project Inquiry Form
                    </h2>
                    <p className="mt-1 text-sm text-neutral-400">
                      Fields marked with * are required so we can prepare a relevant scope.
                    </p>
                  </div>

                  {submitError && (
                    <div
                      role="alert"
                      className="rounded-xl border border-red-500/40 bg-red-950/40 px-4 py-3 text-sm text-red-200"
                    >
                      {submitError}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="fullName" className="block text-sm font-medium text-neutral-200">
                        Full Name *
                      </label>
                      <input
                        id="fullName"
                        name="fullName"
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => handleFieldChange('fullName', e.target.value)}
                        placeholder="Your full name"
                        aria-invalid={Boolean(errors.fullName)}
                        className="mt-1.5 w-full rounded-lg border border-white/15 bg-black px-3.5 py-2.5 text-sm text-white placeholder:text-neutral-500 focus:border-[#FFA302] focus:outline-none"
                      />
                      {errors.fullName && (
                        <p className="mt-1.5 text-xs text-red-400">{errors.fullName}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-neutral-200">
                        Email Address *
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => handleFieldChange('email', e.target.value)}
                        placeholder="you@company.com"
                        aria-invalid={Boolean(errors.email)}
                        className="mt-1.5 w-full rounded-lg border border-white/15 bg-black px-3.5 py-2.5 text-sm text-white placeholder:text-neutral-500 focus:border-[#FFA302] focus:outline-none"
                      />
                      {errors.email && (
                        <p className="mt-1.5 text-xs text-red-400">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-neutral-200">
                        Phone / WhatsApp (Optional)
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone ?? ''}
                        onChange={(e) => handleFieldChange('phone', e.target.value)}
                        placeholder="+92-300-0000000"
                        aria-invalid={Boolean(errors.phone)}
                        className="mt-1.5 w-full rounded-lg border border-white/15 bg-black px-3.5 py-2.5 text-sm text-white placeholder:text-neutral-500 focus:border-[#FFA302] focus:outline-none"
                      />
                      {errors.phone && (
                        <p className="mt-1.5 text-xs text-red-400">{errors.phone}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-neutral-200">
                        Company / Brand (Optional)
                      </label>
                      <input
                        id="company"
                        name="company"
                        type="text"
                        value={formData.company ?? ''}
                        onChange={(e) => handleFieldChange('company', e.target.value)}
                        placeholder="Organization or venture"
                        className="mt-1.5 w-full rounded-lg border border-white/15 bg-black px-3.5 py-2.5 text-sm text-white placeholder:text-neutral-500 focus:border-[#FFA302] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="service" className="block text-sm font-medium text-neutral-200">
                      Primary Service Needed *
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={(e) => handleFieldChange('service', e.target.value)}
                      className="mt-1.5 w-full rounded-lg border border-white/15 bg-black px-3.5 py-2.5 text-sm text-white focus:border-[#FFA302] focus:outline-none"
                    >
                      {serviceOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                    {errors.service && (
                      <p className="mt-1.5 text-xs text-red-400">{errors.service}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="budget" className="block text-sm font-medium text-neutral-200">
                        Estimated Budget *
                      </label>
                      <select
                        id="budget"
                        name="budget"
                        value={formData.budget}
                        onChange={(e) => handleFieldChange('budget', e.target.value)}
                        className="mt-1.5 w-full rounded-lg border border-white/15 bg-black px-3.5 py-2.5 text-sm text-white focus:border-[#FFA302] focus:outline-none"
                      >
                        {BUDGET_OPTIONS.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="timeline" className="block text-sm font-medium text-neutral-200">
                        Target Timeline *
                      </label>
                      <select
                        id="timeline"
                        name="timeline"
                        value={formData.timeline}
                        onChange={(e) => handleFieldChange('timeline', e.target.value)}
                        className="mt-1.5 w-full rounded-lg border border-white/15 bg-black px-3.5 py-2.5 text-sm text-white focus:border-[#FFA302] focus:outline-none"
                      >
                        {TIMELINE_OPTIONS.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-neutral-200">
                      Project Brief &amp; Objectives *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      value={formData.message}
                      onChange={(e) => handleFieldChange('message', e.target.value)}
                      placeholder="Tell us about your audience, channels, goals, or deliverables..."
                      aria-invalid={Boolean(errors.message)}
                      className="mt-1.5 w-full rounded-lg border border-white/15 bg-black px-3.5 py-2.5 text-sm text-white placeholder:text-neutral-500 focus:border-[#FFA302] focus:outline-none resize-y"
                    />
                    {errors.message && (
                      <p className="mt-1.5 text-xs text-red-400">{errors.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg bg-[#FFA302] px-7 py-3.5 text-sm font-semibold text-black hover:bg-[#ffb636] disabled:opacity-60 transition-colors cursor-pointer"
                  >
                    <Send className="h-4 w-4" />
                    <span>{isSubmitting ? 'Submitting Project Brief...' : 'Send Project Inquiry'}</span>
                  </button>
                </form>
              )}
            </div>

            {/* Direct Contact Channels */}
            <aside className="lg:col-span-5 space-y-6">
              <div className="rounded-2xl border border-white/10 bg-[#0D0D12] p-6 sm:p-7">
                <h2 className="font-display text-xl font-bold text-white">Direct Channels</h2>
                <p className="mt-2 text-sm text-neutral-400">
                  Prefer direct correspondence? Reach Online Oracle and Bilal Shoukat Azad via
                  email, phone, or LinkedIn.
                </p>

                <div className="mt-6 space-y-5 text-sm">
                  <div className="flex items-start justify-between gap-3 pb-4 border-b border-white/10">
                    <div className="flex items-start gap-3 min-w-0">
                      <Mail className="h-4 w-4 mt-1 text-[#FFA302] shrink-0" />
                      <div className="min-w-0">
                        <p className="text-xs text-neutral-400">Official Email</p>
                        <a
                          href={`mailto:${AGENCY_CONTACT.email}`}
                          className="font-medium text-white hover:text-[#FFA302] break-all"
                        >
                          {AGENCY_CONTACT.email}
                        </a>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      aria-label="Copy email address"
                      className="inline-flex items-center gap-1 rounded-md border border-white/15 px-2.5 py-1.5 text-xs text-neutral-300 hover:text-white hover:border-white/30 transition-colors shrink-0 cursor-pointer"
                    >
                      {copiedEmail ? (
                        <>
                          <Check className="h-3.5 w-3.5 text-[#FFA302]" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="flex items-start gap-3 pb-4 border-b border-white/10">
                    <Phone className="h-4 w-4 mt-1 text-[#CC1DB9] shrink-0" />
                    <div>
                      <p className="text-xs text-neutral-400">Phone &amp; WhatsApp Lines</p>
                      <div className="mt-1 space-y-1 font-medium text-white tabular-nums">
                        {AGENCY_CONTACT.phones.map((p) => (
                          <div key={p}>{p}</div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="h-4 w-4 mt-1 text-[#FFA302] shrink-0" />
                    <div>
                      <p className="text-xs text-neutral-400">Headquarters &amp; Coverage</p>
                      <p className="mt-1 font-medium text-white">{AGENCY_CONTACT.location}</p>
                      <p className="mt-0.5 text-xs text-neutral-400">
                        {AGENCY_CONTACT.serviceReach}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#0D0D12] p-6 sm:p-7">
                <h3 className="font-display text-lg font-bold text-white">Connect Online</h3>
                <div className="mt-4 space-y-2.5">
                  {AGENCY_CONTACT.socialLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target={link.href.startsWith('http') ? '_blank' : undefined}
                      rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="flex items-center justify-between rounded-xl border border-white/10 bg-black/50 px-4 py-3 text-sm font-medium text-neutral-200 hover:border-[#FFA302] hover:text-white transition-colors"
                    >
                      <span>{link.label}</span>
                      <ArrowUpRight className="h-4 w-4 text-[#FFA302]" />
                    </a>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
