import type { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';

const RATE_LIMIT_MS = 60_000;
const lastSent = new Map<string, number>();

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Invalid email address' });
  }

  // Simple rate limiting by IP
  const ip =
    (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ||
    req.socket.remoteAddress ||
    'unknown';
  const now = Date.now();
  const last = lastSent.get(ip);
  if (last && now - last < RATE_LIMIT_MS) {
    return res
      .status(429)
      .json({ error: 'Please wait before sending another message' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM || 'onboarding@resend.dev';
  const to = process.env.CONTACT_EMAIL || 'lucascdemorais@gmail.com';

  if (!apiKey) {
    // eslint-disable-next-line no-console
    console.error(
      '[API] POST /api/contact failed: RESEND_API_KEY not configured'
    );
    return res.status(500).json({ error: 'Email service not configured' });
  }

  const resend = new Resend(apiKey);

  try {
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: subject
        ? `[Portfolio] ${subject}`
        : `[Portfolio] Message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px;">
          <h2 style="color: #1d6df7;">New message from your portfolio</h2>
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          ${
            subject
              ? `<p><strong>Subject:</strong> ${escapeHtml(subject)}</p>`
              : ''
          }
          <hr style="border: none; border-top: 1px solid #e5e7eb;" />
          <p style="white-space: pre-wrap;">${escapeHtml(message)}</p>
        </div>
      `,
    });

    if (error) {
      // eslint-disable-next-line no-console
      console.error('[API] POST /api/contact failed:', error);
      return res.status(500).json({ error: 'Failed to send email' });
    }

    lastSent.set(ip, now);
    return res.status(200).json({ success: true });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('[API] POST /api/contact failed:', err);
    return res.status(500).json({ error: 'Failed to send email' });
  }
}
