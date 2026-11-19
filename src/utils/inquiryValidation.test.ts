import test from 'node:test';
import assert from 'node:assert/strict';
import {
  generateInquiryReference,
  validateInquiryPayload,
} from './inquiryValidation';

test('validateInquiryPayload rejects empty submission with field-specific errors', () => {
  const result = validateInquiryPayload({});
  assert.equal(result.valid, false);
  assert.ok(result.errors.fullName);
  assert.ok(result.errors.email);
  assert.ok(result.errors.service);
  assert.ok(result.errors.budget);
  assert.ok(result.errors.timeline);
  assert.ok(result.errors.message);
});

test('validateInquiryPayload rejects invalid email and malformed phone', () => {
  const result = validateInquiryPayload({
    fullName: 'Ayesha Khan',
    email: 'invalid-email',
    phone: 'abc-not-a-phone',
    service: 'AI-Powered Content Creation',
    budget: '$1,500 – $3,500',
    timeline: 'Within 1 month',
    message: 'We want to build a bilingual video and blog pipeline.',
  });
  assert.equal(result.valid, false);
  assert.ok(result.errors.email);
  assert.ok(result.errors.phone);
});

test('validateInquiryPayload accepts and normalizes a valid inquiry', () => {
  const result = validateInquiryPayload({
    fullName: '  Tariq Mahmood  ',
    email: '  TARIQ@Example.com ',
    phone: '+92-300-5550192',
    company: '  Indus Advisory  ',
    service: 'Executive Ghostwriting',
    budget: '$3,500 – $7,500',
    timeline: '1–3 months',
    message: 'Looking for executive ghostwriting for an urban sustainability publication.',
  });
  assert.equal(result.valid, true);
  assert.equal(result.sanitized?.fullName, 'Tariq Mahmood');
  assert.equal(result.sanitized?.email, 'tariq@example.com');
  assert.equal(result.sanitized?.company, 'Indus Advisory');
});

test('generateInquiryReference produces formatted year-month sequence codes', () => {
  const ref = generateInquiryReference(new Date('2026-11-19T10:00:00Z'), 7);
  assert.equal(ref, 'OO-202611-0007');
});
