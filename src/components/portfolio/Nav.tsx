import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import React, { useEffect, useRef, useState } from 'react';

import { ACCENT } from './atoms';
import ThemeToggle from './ThemeToggle';

const LangToggle = ({ accent }: { accent: string }) => {
  const router = useRouter();
  const current = (router.query.locale as string) || 'en';
  // Full reload so the target locale's translations are loaded fresh — a soft
  // client transition can leave the i18n bundle stale and surface raw keys.
  const switchTo = (code: string) => {
    window.location.assign(`/${code}`);
  };
  return (
    <div
      className="ml-1 flex items-center gap-0.5 rounded-full p-0.5"
      style={{
        background: 'var(--toggle-bg)',
        border: '1px solid var(--toggle-border)',
      }}
    >
      {['en', 'pt'].map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => switchTo(code)}
          className="rounded-full px-2 py-1 font-mono text-[10.5px] uppercase tracking-wider transition-all"
          style={{
            background: current === code ? `${accent}22` : 'transparent',
            color: current === code ? accent : 'var(--text-mute)',
            fontWeight: current === code ? 600 : 400,
          }}
        >
          {code}
        </button>
      ))}
    </div>
  );
};

interface Props {
  accent?: string;
}

export default function Nav({ accent = ACCENT }: Props) {
  const { t } = useTranslation('common');
  const [open, setOpen] = useState(false);
  const openButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const links: [string, string][] = [
    [t('nav.about'), '#about'],
    [t('nav.architecture'), '#architecture'],
    [t('nav.stack'), '#stack'],
    [t('nav.languages'), '#languages'],
    [t('nav.projects'), '#projects'],
    [t('nav.writing'), '#writing'],
    [t('nav.contact'), '#contact'],
  ];

  useEffect(() => {
    if (!open) return undefined;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKeyDown);
      openButtonRef.current?.focus();
    };
  }, [open]);

  return (
    <>
      {/* Desktop nav */}
      <nav
        aria-label="Primary"
        className="glass-nav fixed left-1/2 top-4 z-50 hidden -translate-x-1/2 items-center gap-1 rounded-full p-2 lg:flex"
        style={{ maxWidth: 'calc(100vw - 32px)' }}
      >
        <div className="flex items-center gap-2 px-3 py-1">
          <span
            className="inline-block h-2 w-2 rounded-full"
            style={{ background: accent, boxShadow: `0 0 12px ${accent}` }}
          />
          <span className="font-mono text-[13px] tracking-tight text-fg">
            lucasheartcliff
          </span>
        </div>
        <div className="flex items-center gap-0.5">
          {links.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="rounded-full px-2.5 py-1.5 text-[12.5px] text-soft transition-colors hover:text-fg"
            >
              {label}
            </a>
          ))}
        </div>
        <LangToggle accent={accent} />
        <ThemeToggle />
        <a
          href="#contact"
          className="ml-1 rounded-full px-3.5 py-1.5 text-[12.5px] font-medium transition-all"
          style={{
            background: `linear-gradient(135deg, ${accent}, ${accent}aa)`,
            color: '#0b1020',
            boxShadow: `0 4px 24px ${accent}44`,
          }}
        >
          {t('cta.getInTouch')}
        </a>
      </nav>

      {/* Mobile top bar */}
      <nav
        aria-label="Primary"
        className="glass-nav fixed inset-x-3 top-3 z-50 flex items-center justify-between rounded-full p-2 lg:hidden"
      >
        <div className="flex items-center gap-2 py-1 pl-2">
          <span
            className="inline-block h-2 w-2 rounded-full"
            style={{ background: accent, boxShadow: `0 0 10px ${accent}` }}
          />
          <span className="font-mono text-[12.5px] tracking-tight text-fg">
            lucasheartcliff
          </span>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            ref={openButtonRef}
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-haspopup="dialog"
            aria-expanded={open}
            className="flex h-9 w-9 items-center justify-center rounded-full"
            style={{
              background: 'var(--toggle-bg)',
              border: '1px solid var(--toggle-border)',
              color: accent,
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div
          className="fixed inset-0 z-[60] lg:hidden"
          onClick={() => setOpen(false)}
          role="presentation"
        >
          <div
            className="absolute inset-0"
            style={{
              background: 'rgba(0,0,0,0.5)',
              backdropFilter: 'blur(8px)',
            }}
          />
          <div
            className="glass-nav absolute inset-y-0 right-0 flex w-[82vw] max-w-sm flex-col"
            style={{
              borderRadius: '16px 0 0 16px',
              background: 'color-mix(in srgb, var(--bg-base) 96%, transparent)',
            }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
          >
            <div
              className="flex items-center justify-between border-b p-5"
              style={{ borderColor: 'var(--hairline)' }}
            >
              <span className="font-mono text-[13px] text-fg">menu</span>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="flex h-9 w-9 items-center justify-center rounded-full"
                style={{
                  background: 'var(--toggle-bg)',
                  border: '1px solid var(--toggle-border)',
                  color: 'var(--text-mute)',
                }}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-5">
              <div className="flex flex-col gap-1">
                {links.map(([label, href], i) => (
                  <a
                    key={href}
                    href={href}
                    onClick={() => setOpen(false)}
                    className="rounded-lg p-3 text-[15px] text-fg transition-colors"
                    style={{
                      background: i === 0 ? 'var(--chip-bg)' : 'transparent',
                    }}
                  >
                    <span
                      className="mr-3 font-mono text-[10px]"
                      style={{ color: accent }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {label}
                  </a>
                ))}
              </div>
            </div>
            <div
              className="flex items-center justify-between border-t p-5"
              style={{ borderColor: 'var(--hairline)' }}
            >
              <div className="flex items-center gap-2">
                <LangToggle accent={accent} />
                <ThemeToggle />
              </div>
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="rounded-full px-4 py-2 text-[12.5px] font-medium"
                style={{
                  background: `linear-gradient(135deg, ${accent}, ${accent}aa)`,
                  color: '#0b1020',
                }}
              >
                {t('cta.getInTouch')}
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
