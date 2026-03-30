import { fireEvent, render, screen, waitFor } from '@testing-library/react';
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

  it('should show success message on successful submit', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ success: true }),
    });

    render(<ContactForm />);

    fireEvent.change(screen.getByPlaceholderText('Your name'), {
      target: { value: 'John' },
    });
    fireEvent.change(screen.getByPlaceholderText('your@email.com'), {
      target: { value: 'john@test.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Your message...'), {
      target: { value: 'Hello!' },
    });

    fireEvent.submit(screen.getByRole('button', { name: /send message/i }));

    await waitFor(() => {
      expect(
        screen.getByText('Message sent successfully!')
      ).toBeInTheDocument();
    });
  });

  it('should show error message on failed submit', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      json: () => Promise.resolve({ error: 'Server error' }),
    });

    render(<ContactForm />);

    fireEvent.change(screen.getByPlaceholderText('Your name'), {
      target: { value: 'John' },
    });
    fireEvent.change(screen.getByPlaceholderText('your@email.com'), {
      target: { value: 'john@test.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Your message...'), {
      target: { value: 'Hello!' },
    });

    fireEvent.submit(screen.getByRole('button', { name: /send message/i }));

    await waitFor(() => {
      expect(screen.getByText('Server error')).toBeInTheDocument();
    });
  });
});
