import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import { useTranslation } from 'next-i18next';
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

import Scroll from '@/components/Scroll';
import { ScrollRefContext } from '@/templates/Main';

export interface AsideSection {
  key: string;
  label: string;
  /** Heading depth (1–6). Used for indentation. Defaults to 1. */
  level?: number;
}

interface Props {
  sections: AsideSection[];
  /** When true, labels are passed through t(). Defaults to true. */
  translate?: boolean;
  /** Panel width in rem. Defaults to 13 (w-52). */
  widthRem?: number;
}

const INDENT: Record<number, string> = {
  1: 'pl-3',
  2: 'pl-3',
  3: 'pl-6',
  4: 'pl-9',
  5: 'pl-12',
  6: 'pl-14',
};

export default function AsideNav({
  sections,
  translate = true,
  widthRem = 13,
}: Props) {
  const { t } = useTranslation('common');
  const scrollRef = useContext(ScrollRefContext);
  const [active, setActive] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const rafRef = useRef<number>();

  const handleScroll = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const scroll = scrollRef?.current;
      if (!scroll) return;

      const values = scroll.getValues();
      const isBottom =
        values.scrollHeight - values.clientHeight - values.scrollTop < 25;

      if (isBottom) {
        setActive(sections[sections.length - 1]?.key ?? null);
        return;
      }

      for (let i = sections.length - 1; i >= 0; i -= 1) {
        const el = document.getElementById(sections[i]!.key);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= 120) {
          setActive(sections[i]!.key);
          return;
        }
      }
      setActive(null);
    });
  }, [sections, scrollRef]);

  useEffect(() => {
    const scroll = scrollRef?.current;
    const element = scroll?.container?.firstChild as HTMLElement | null;
    if (!element) return undefined;

    element.addEventListener('scroll', handleScroll);
    return () => element.removeEventListener('scroll', handleScroll);
  }, [scrollRef, handleScroll]);

  const scrollTo = (key: string) => {
    const el = document.getElementById(key);
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth' });
  };

  if (!sections.length) return null;

  const panelWidth = `${widthRem}rem`;

  return (
    <div className="fixed left-0 top-1/2 z-50 block -translate-y-1/2">
      <button
        onClick={() => setOpen((v) => !v)}
        style={{ left: open ? panelWidth : 0, color: 'var(--text-mute)' }}
        className="glass-nav absolute top-1/2 -translate-y-1/2 rounded-r-lg p-2.5 transition-all duration-300"
        aria-label={open ? 'Hide menu' : 'Show menu'}
      >
        {open ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
      </button>

      <nav
        aria-label={t('Table of contents', {
          defaultValue: 'Table of contents',
        })}
        style={{ width: panelWidth }}
        className={`glass-nav rounded-r-lg transition-all duration-300 ${
          open
            ? 'pointer-events-auto translate-x-0 opacity-100'
            : 'pointer-events-none -translate-x-full opacity-0'
        }`}
      >
        <Scroll
          style={{ maxHeight: '70vh' }}
          renderView={(props) => (
            <div
              {...props}
              style={{
                ...props.style,
                border: 0,
                boxShadow: 'none',
              }}
            />
          )}
          hideTracksWhenNotNeeded
          autoHeight
          autoHeightMax="70vh"
        >
          <div className="flex flex-col gap-0.5 px-2 py-3">
            {sections.map(({ key, label, level = 1 }) => {
              const text = translate ? t(label) : label;
              return (
                <Tooltip
                  key={key}
                  title={text}
                  placement="right"
                  mouseEnterDelay={0.4}
                >
                  <button
                    onClick={() => scrollTo(key)}
                    aria-current={active === key ? 'location' : undefined}
                    style={
                      active === key
                        ? {
                            color: 'var(--accent)',
                            background:
                              'color-mix(in srgb, var(--accent) 12%, transparent)',
                          }
                        : { color: 'var(--text-mute)' }
                    }
                    className={`truncate rounded-md border-0 py-1.5 pr-3 text-left transition-colors ${
                      INDENT[level] || 'pl-3'
                    } ${level <= 2 ? 'text-sm' : 'text-xs'} ${
                      active === key ? 'font-semibold' : 'hover:opacity-80'
                    }`}
                  >
                    {text}
                  </button>
                </Tooltip>
              );
            })}
          </div>
        </Scroll>
      </nav>
    </div>
  );
}
