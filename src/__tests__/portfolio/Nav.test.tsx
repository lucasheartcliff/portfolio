import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import Nav from '@/components/portfolio/Nav';

jest.mock('next-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

jest.mock('next/router', () => ({
  useRouter: () => ({ query: { locale: 'en' } }),
}));

describe('Nav', () => {
  it('renders the brand name', () => {
    render(<Nav />);
    expect(screen.getAllByText('lucasheartcliff').length).toBeGreaterThan(0);
  });

  it('renders every nav link', () => {
    render(<Nav />);
    [
      'nav.about',
      'nav.architecture',
      'nav.stack',
      'nav.languages',
      'nav.projects',
      'nav.writing',
      'nav.contact',
    ].forEach((key) => {
      expect(screen.getAllByText(key).length).toBeGreaterThan(0);
    });
  });

  it('opens and closes the mobile drawer', () => {
    render(<Nav />);
    expect(screen.queryByLabelText('Close menu')).not.toBeInTheDocument();

    fireEvent.click(screen.getByLabelText('Open menu'));
    const closeButton = screen.getByLabelText('Close menu');
    expect(closeButton).toBeInTheDocument();

    fireEvent.click(closeButton);
    expect(screen.queryByLabelText('Close menu')).not.toBeInTheDocument();
  });

  it('links the CTA to the contact section', () => {
    render(<Nav />);
    const ctas = screen.getAllByText('cta.getInTouch');
    ctas.forEach((cta) => {
      // eslint-disable-next-line testing-library/no-node-access
      expect(cta.closest('a')).toHaveAttribute('href', '#contact');
    });
  });

  it('switches locale from the language toggle', () => {
    const original = window.location;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    delete (window as any).location;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).location = { assign: jest.fn() };

    render(<Nav />);
    fireEvent.click(screen.getAllByText('pt')[0]!);
    expect(window.location.assign).toHaveBeenCalledWith('/pt');

    window.location = original;
  });
});
