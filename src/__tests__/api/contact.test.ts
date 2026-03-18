import type { NextApiRequest, NextApiResponse } from 'next';

import handler from '@/pages/api/contact';

jest.mock('nodemailer', () => ({
  createTransport: jest.fn().mockReturnValue({
    sendMail: jest.fn().mockResolvedValue({}),
  }),
}));

function createMockReq(
  overrides: Partial<NextApiRequest> = {}
): NextApiRequest {
  return {
    method: 'POST',
    body: {
      name: 'John',
      email: 'john@example.com',
      subject: 'Hello',
      message: 'Test message',
    },
    headers: { 'x-forwarded-for': '127.0.0.1' },
    socket: { remoteAddress: '127.0.0.1' },
    ...overrides,
  } as unknown as NextApiRequest;
}

function createMockRes(): NextApiResponse & {
  statusCode: number;
  jsonBody: any;
} {
  const res = {
    statusCode: 0,
    jsonBody: null,
    status(code: number) {
      res.statusCode = code;
      return res;
    },
    json(data: any) {
      res.jsonBody = data;
      return res;
    },
  } as unknown as NextApiResponse & { statusCode: number; jsonBody: any };
  return res;
}

describe('POST /api/contact', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = {
      ...originalEnv,
      SMTP_USER: 'test@gmail.com',
      SMTP_PASS: 'password',
    };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it('should reject non-POST methods', async () => {
    const req = createMockReq({ method: 'GET' });
    const res = createMockRes();
    await handler(req, res);
    expect(res.statusCode).toBe(405);
  });

  it('should reject missing required fields', async () => {
    const req = createMockReq({ body: { name: 'John' } });
    const res = createMockRes();
    await handler(req, res);
    expect(res.statusCode).toBe(400);
    expect(res.jsonBody.error).toBe('Missing required fields');
  });

  it('should reject invalid email', async () => {
    const req = createMockReq({
      body: { name: 'John', email: 'invalid', message: 'hi' },
    });
    const res = createMockRes();
    await handler(req, res);
    expect(res.statusCode).toBe(400);
    expect(res.jsonBody.error).toBe('Invalid email address');
  });

  it('should send email successfully', async () => {
    const req = createMockReq({
      headers: { 'x-forwarded-for': '10.0.0.1' },
    });
    const res = createMockRes();
    await handler(req, res);
    expect(res.statusCode).toBe(200);
    expect(res.jsonBody.success).toBe(true);
  });

  it('should return 500 when SMTP is not configured', async () => {
    delete process.env.SMTP_USER;
    delete process.env.SMTP_PASS;
    const req = createMockReq({
      headers: { 'x-forwarded-for': '10.0.0.2' },
    });
    const res = createMockRes();
    await handler(req, res);
    expect(res.statusCode).toBe(500);
    expect(res.jsonBody.error).toBe('Email service not configured');
  });
});
