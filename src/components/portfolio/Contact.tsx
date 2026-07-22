import { useTranslation } from 'next-i18next';
import React, { useState } from 'react';

import { ACCENT, ACCENT_B, Glass, Reveal, SectionLabel } from './atoms';

const Field = ({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  multiline,
}: {
  label: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  placeholder: string;
  type?: string;
  multiline?: boolean;
}) => (
  <label className="block">
    <span className="mb-1.5 block font-mono text-[10.5px] uppercase tracking-widest text-slate-500">
      {label}
    </span>
    {multiline ? (
      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={4}
        className="w-full rounded-lg px-3 py-2.5 text-[13.5px] text-slate-100 transition-colors focus:outline-none"
        style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.08)',
        }}
      />
    ) : (
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-lg px-3 py-2.5 text-[13.5px] text-slate-100 transition-colors focus:outline-none"
        style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.08)',
        }}
      />
    )}
  </label>
);

const ContactRow = ({
  icon,
  label,
  value,
  accent,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  accent: string;
  href?: string;
}) => {
  const inner = (
    <Glass className="contact-row group flex items-center gap-4 p-4">
      <div
        className="flex h-10 w-10 items-center justify-center rounded-lg"
        style={{
          background: `${accent}15`,
          color: accent,
          border: `1px solid ${accent}33`,
        }}
      >
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <div className="mb-0.5 font-mono text-[10.5px] uppercase tracking-widest text-slate-500">
          {label}
        </div>
        <div className="truncate text-[13.5px] text-slate-200">{value}</div>
      </div>
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        className="text-slate-500 transition group-hover:text-slate-200"
      >
        <path d="M7 7h10v10M7 17 17 7" />
      </svg>
    </Glass>
  );
  return href ? (
    <a href={href} target="_blank" rel="noreferrer" className="block">
      {inner}
    </a>
  ) : (
    inner
  );
};

type Status = 'idle' | 'sending' | 'sent' | 'error';

interface Props {
  accent?: string;
  accentB?: string;
  email?: string;
  username?: string;
}

export default function ContactSection({
  accent = ACCENT,
  accentB = ACCENT_B,
  email = 'lucascdemorais@gmail.com',
  username = 'lucasheartcliff',
}: Props) {
  const { t } = useTranslation('common');
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<Status>('idle');
  const set =
    (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm({ ...form, [k]: e.target.value });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      // Trailing slash avoids a 308 redirect from Next's `trailingSlash: true`.
      const res = await fetch('/api/contact/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('failed');
      setStatus('sent');
      setForm({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 3500);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3500);
    }
  };

  const sent = status === 'sent';
  const sending = status === 'sending';
  const errored = status === 'error';

  let btnBg = `linear-gradient(135deg, ${accent}, ${accentB})`;
  let btnColor = '#0b1020';
  let btnBorder = 'none';
  if (sent) {
    btnBg = 'rgba(16,185,129,0.2)';
    btnColor = '#10b981';
    btnBorder = '1px solid rgba(16,185,129,0.4)';
  } else if (errored) {
    btnBg = 'rgba(244,63,94,0.2)';
    btnColor = '#f43f5e';
    btnBorder = '1px solid rgba(244,63,94,0.4)';
  }
  let btnLabel = t('contact.send');
  if (sent) btnLabel = t('contact.sent');
  else if (errored) btnLabel = t('contact.error');
  else if (sending) btnLabel = t('contact.sending');

  return (
    <section id="contact" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <Reveal>
          <SectionLabel num="06" label={t('contact.label')} accent={accent} />
        </Reveal>
        <Reveal delay={80}>
          <h2 className="mb-4 font-display text-3xl tracking-[-0.02em] text-slate-100 sm:text-5xl">
            {t('contact.title1')}{' '}
            <span
              style={{
                background: `linear-gradient(120deg, ${accent}, ${accentB})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {t('contact.title2')}
            </span>
          </h2>
        </Reveal>
        <Reveal delay={140}>
          <p className="mb-12 max-w-xl text-[15px] leading-relaxed text-slate-400">
            {t('contact.body')}
          </p>
        </Reveal>

        <div className="grid gap-5 lg:grid-cols-[1.1fr_1fr] lg:gap-6">
          <Reveal delay={180} className="h-full">
            <Glass className="h-full p-5 sm:p-7">
              <form onSubmit={submit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field
                    label={t('contact.name')}
                    value={form.name}
                    onChange={set('name')}
                    placeholder={t('contact.namePh')}
                  />
                  <Field
                    label={t('contact.email')}
                    value={form.email}
                    onChange={set('email')}
                    placeholder={t('contact.emailPh')}
                    type="email"
                  />
                </div>
                <Field
                  label={t('contact.subject')}
                  value={form.subject}
                  onChange={set('subject')}
                  placeholder={t('contact.subjectPh')}
                />
                <Field
                  label={t('contact.message')}
                  value={form.message}
                  onChange={set('message')}
                  placeholder={t('contact.messagePh')}
                  multiline
                />
                <div className="flex items-center justify-between pt-2">
                  <span className="font-mono text-[11px] text-slate-500">
                    {t('contact.replies')}
                  </span>
                  <button
                    type="submit"
                    disabled={sending}
                    className="rounded-lg px-5 py-2.5 text-[13px] font-medium transition-all"
                    style={{
                      background: btnBg,
                      color: btnColor,
                      boxShadow: `0 6px 24px ${accent}33`,
                      border: btnBorder,
                    }}
                  >
                    {btnLabel}
                  </button>
                </div>
              </form>
            </Glass>
          </Reveal>

          <Reveal delay={260}>
            <div className="space-y-4">
              <ContactRow
                icon={
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  >
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path d="m3 7 9 6 9-6" />
                  </svg>
                }
                label={t('contact.row.email')}
                value={email}
                accent={accent}
                href={`mailto:${email}`}
              />
              <ContactRow
                icon={
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1.1-.7.1-.7.1-.7 1.2.1 1.9 1.3 1.9 1.3 1.1 1.9 2.9 1.4 3.6 1 .1-.8.4-1.4.8-1.7-2.7-.3-5.5-1.3-5.5-6 0-1.3.5-2.4 1.3-3.3-.1-.3-.6-1.6.1-3.3 0 0 1-.3 3.3 1.3a11.5 11.5 0 0 1 6 0c2.3-1.6 3.3-1.3 3.3-1.3.7 1.7.2 3 .1 3.3.8.9 1.3 2 1.3 3.3 0 4.7-2.8 5.7-5.5 6 .4.3.8 1 .8 2v3c0 .3.2.7.8.6A12 12 0 0 0 12 .3" />
                  </svg>
                }
                label={t('contact.row.github')}
                value={`@${username}`}
                accent={accentB}
                href={`https://github.com/${username}`}
              />
              <ContactRow
                icon={
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M19 0h-14a5 5 0 0 0-5 5v14a5 5 0 0 0 5 5h14a5 5 0 0 0 5-5v-14a5 5 0 0 0-5-5zM8 19H5V8h3v11zM6.5 6.7a1.8 1.8 0 1 1 0-3.6 1.8 1.8 0 0 1 0 3.6zM20 19h-3v-5.7c0-3.4-4-3.1-4 0V19h-3V8h3v1.8c1.4-2.6 7-2.8 7 2.5V19z" />
                  </svg>
                }
                label={t('contact.row.linkedin')}
                value={`/in/${username}`}
                accent={accent}
                href={`https://linkedin.com/in/${username}`}
              />
              <ContactRow
                icon={
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  >
                    <circle cx="12" cy="12" r="9" />
                    <path d="M2 12h20M12 2a14 14 0 0 1 0 20M12 2a14 14 0 0 0 0 20" />
                  </svg>
                }
                label={t('contact.row.location')}
                value={t('contact.row.locationValue')}
                accent={accentB}
              />
              <Glass className="mt-2 p-5">
                <div className="mb-2 font-mono text-[10.5px] uppercase tracking-widest text-slate-500">
                  {t('contact.currentStatus')}
                </div>
                <div className="flex items-center gap-2 text-[13.5px] text-slate-200">
                  <span
                    className="relative inline-flex h-2 w-2 rounded-full"
                    style={{ background: '#10b981' }}
                  >
                    <span
                      className="absolute inset-0 animate-ping rounded-full"
                      style={{ background: '#10b981', opacity: 0.6 }}
                    />
                  </span>
                  {t('contact.openTo')}
                </div>
              </Glass>
            </div>
          </Reveal>
        </div>

        <div className="mt-20 flex flex-wrap items-center justify-between gap-4 border-t border-white/5 pt-6 font-mono text-[12px] text-slate-400">
          <span>
            © {new Date().getFullYear()} Lucas Morais · {t('footer.built')}
          </span>
          <span>
            <span style={{ color: accent }}>▍</span> v2.0 · dark mode
          </span>
        </div>
      </div>
    </section>
  );
}
