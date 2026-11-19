import express from 'express';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  generateInquiryReference,
  validateInquiryPayload,
  type StoredInquiry,
} from './src/utils/inquiryValidation.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT ?? 3000);
const isProduction = process.env.NODE_ENV === 'production';

const inquiries: StoredInquiry[] = [];

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '256kb' }));

  app.get('/api/health', (_req, res) => {
    res.json({ ok: true, service: 'online-oracle-api' });
  });

  app.get('/api/inquiries/summary', (_req, res) => {
    res.json({
      count: inquiries.length,
      latestReference: inquiries.length > 0 ? inquiries[inquiries.length - 1].referenceCode : null,
    });
  });

  app.post('/api/inquiries', (req, res) => {
    const result = validateInquiryPayload(req.body ?? {});
    if (!result.valid || !result.sanitized) {
      res.status(400).json({
        ok: false,
        message: 'Please correct the highlighted fields before submitting.',
        errors: result.errors,
      });
      return;
    }

    const now = new Date();
    const sequence = inquiries.length + 1;
    const referenceCode = generateInquiryReference(now, sequence);
    const record: StoredInquiry = {
      ...result.sanitized,
      id: `inq_${now.getTime()}_${sequence}`,
      referenceCode,
      createdAt: now.toISOString(),
    };
    inquiries.push(record);

    res.status(201).json({
      ok: true,
      inquiry: {
        id: record.id,
        referenceCode: record.referenceCode,
        fullName: record.fullName,
        email: record.email,
        service: record.service,
        budget: record.budget,
        timeline: record.timeline,
        createdAt: record.createdAt,
      },
    });
  });

  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(__dirname, 'dist');
    app.use(express.static(distDir));
    app.get('*', (_req, res) => {
      const indexFile = path.join(distDir, 'index.html');
      if (fs.existsSync(indexFile)) {
        res.sendFile(indexFile);
      } else {
        res.status(404).send('Build output not found.');
      }
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Online Oracle server listening on http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start Online Oracle server:', err);
  process.exit(1);
});
