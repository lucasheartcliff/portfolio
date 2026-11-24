import { render, screen } from '@testing-library/react';
import React from 'react';
import { TextEncoder } from 'util';

import ReactiveBackground from '@/components/ReactiveBackground';
import {
  buildBuckets,
  COLOR_BUCKETS,
  effectiveDensity,
  PHASE_BUCKETS,
} from '@/components/ReactiveBackground/dots';

describe('ReactiveBackground orbs', () => {
  it('does not put opacity on the orb group wrapper', () => {
    render(<ReactiveBackground intensity={0.5} />);
    const wrapper = screen.getByTestId('ambient-orbs');
    expect(wrapper).not.toHaveStyle({ opacity: '0.5' });
    expect(wrapper.getAttribute('style')).not.toMatch(/opacity/);
  });

  it('folds intensity * dim into each orb gradient and the noise layer', () => {
    // jsdom drops gradient backgrounds from element.style, so assert on the
    // server-rendered markup instead.
    global.TextEncoder = global.TextEncoder || TextEncoder;
    // eslint-disable-next-line global-require
    const { renderToStaticMarkup: toStaticHtml } = require('react-dom/server');
    const markup = toStaticHtml(
      <ReactiveBackground intensity={0.5} dim={0.5} accent="#ff0000" />
    );
    const alpha = ((0x55 / 255) * 0.25).toFixed(3);
    expect(markup).toContain(`rgba(255, 0, 0, ${alpha})`);
    expect(markup).not.toContain('55, transparent');
    expect(markup).toContain(`opacity:${0.04 * 0.25}`);
  });
});

describe('ReactiveBackground perpetual repaint (#79)', () => {
  it('never starts a requestAnimationFrame loop', () => {
    const raf = jest.spyOn(window, 'requestAnimationFrame');
    render(<ReactiveBackground />);
    expect(raf).not.toHaveBeenCalled();
    raf.mockRestore();
  });

  it('orbs use no filter blur or will-change layers', () => {
    render(<ReactiveBackground />);
    const orbs = screen.getByTestId('ambient-orbs');
    const style = orbs.innerHTML;
    expect(style).not.toMatch(/blur\(/);
    expect(style).not.toMatch(/will-change/);
    expect(style).not.toMatch(/orb-anim/);
  });
});

describe('dot grid helpers', () => {
  it('keeps the dot count bounded on large viewports', () => {
    const count = (w: number, h: number) => {
      const d = effectiveDensity(28, w, h);
      return (Math.ceil(w / d) + 2) * (Math.ceil(h / d) + 2);
    };
    expect(count(2560, 1440)).toBeLessThanOrEqual(count(1920, 1080) * 1.05);
    expect(count(3840, 2160)).toBeLessThanOrEqual(count(1920, 1080) * 1.05);
  });

  it('never goes below the configured density', () => {
    expect(effectiveDensity(28, 800, 600)).toBe(28);
    expect(effectiveDensity(28, 400, 800)).toBe(32);
  });

  it('groups every dot into a bounded number of buckets', () => {
    const buckets = buildBuckets(
      1920,
      1080,
      28,
      [29, 109, 247],
      [139, 92, 246]
    );
    const total = buckets.reduce((n, b) => n + b.dots.length, 0);
    expect(total).toBe((Math.ceil(1920 / 28) + 2) * (Math.ceil(1080 / 28) + 2));
    expect(buckets.length).toBeLessThanOrEqual(COLOR_BUCKETS * PHASE_BUCKETS);
    expect(buckets[0]!.color).toMatch(/^rgb\(\d+,\d+,\d+\)$/);
  });
});
