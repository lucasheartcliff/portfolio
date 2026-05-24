import { render, screen } from '@testing-library/react';
import React from 'react';

import ContactForm from '@/components/ContactForm';

jest.mock('next-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe('ContactForm', () => {
  it('should render all form fields', () => {
    render(<ContactForm />);
    expect(screen.getByLabelText(/Name/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Subject/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Message/)).toBeInTheDocument();
  });

  it('should render submit button', () => {
    render(<ContactForm />);
    expect(screen.getByText('Send Message')).toBeInTheDocument();
  });
});
