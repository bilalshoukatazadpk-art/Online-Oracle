export interface InquiryPayload {
  fullName: string;
  email: string;
  phone?: string;
  company?: string;
  service: string;
  budget: string;
  timeline: string;
  message: string;
}

export interface InquiryValidationResult {
  valid: boolean;
  errors: Partial<Record<keyof InquiryPayload, string>>;
  sanitized?: InquiryPayload;
}

export interface StoredInquiry extends InquiryPayload {
  id: string;
  referenceCode: string;
  createdAt: string;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_PATTERN = /^[+\d\s().-]{7,24}$/;

export function validateInquiryPayload(raw: Partial<InquiryPayload>): InquiryValidationResult {
  const errors: Partial<Record<keyof InquiryPayload, string>> = {};

  const fullName = (raw.fullName ?? '').trim();
  const email = (raw.email ?? '').trim().toLowerCase();
  const phone = (raw.phone ?? '').trim();
  const company = (raw.company ?? '').trim();
  const service = (raw.service ?? '').trim();
  const budget = (raw.budget ?? '').trim();
  const timeline = (raw.timeline ?? '').trim();
  const message = (raw.message ?? '').trim();

  if (fullName.length < 2) {
    errors.fullName = 'Please enter your full name (at least 2 characters).';
  }

  if (!email) {
    errors.email = 'Please enter your email address.';
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.email = 'Please enter a valid email address (e.g. name@company.com).';
  }

  if (phone && !PHONE_PATTERN.test(phone)) {
    errors.phone = 'Please enter a valid phone or WhatsApp number.';
  }

  if (!service) {
    errors.service = 'Please select the primary service you need.';
  }

  if (!budget) {
    errors.budget = 'Please choose an estimated budget range.';
  }

  if (!timeline) {
    errors.timeline = 'Please choose a target timeline.';
  }

  if (message.length < 15) {
    errors.message = 'Please share a brief overview of your project (at least 15 characters).';
  }

  if (Object.keys(errors).length > 0) {
    return { valid: false, errors };
  }

  return {
    valid: true,
    errors: {},
    sanitized: {
      fullName,
      email,
      phone: phone || undefined,
      company: company || undefined,
      service,
      budget,
      timeline,
      message,
    },
  };
}

export function generateInquiryReference(now: Date = new Date(), sequence: number = 1): string {
  const year = now.getUTCFullYear();
  const month = String(now.getUTCMonth() + 1).padStart(2, '0');
  const padded = String(Math.max(1, sequence)).padStart(4, '0');
  return `OO-${year}${month}-${padded}`;
}
