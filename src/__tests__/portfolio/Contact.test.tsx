import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';

import ContactSection from '@/components/portfolio/Contact';

const translations: Record<string, string> = {
  'contact.label': 'Contact',
  'contact.title1': "Let's build",
  'contact.title2': 'something solid.',
  'contact.body': 'Have a project in mind?',
  'contact.name': 'Name',
  'contact.namePh': 'Your name',
  'contact.email': 'Email',
  'contact.emailPh': 'you@example.com',
  'contact.subject': 'Subject',
  'contact.subjectPh': 'What is this about?',
  'contact.message': 'Message',
  'contact.messagePh': 'Your message',
  'contact.replies': 'I usually reply within a day',
  'contact.send': 'Send',
  'contact.sending': 'Sending…',
  'contact.sent': 'Sent!',
  'contact.error': 'Something went wrong',
  'contact.row.email': 'Email',
  'contact.row.github': 'GitHub',
  'contact.row.linkedin': 'LinkedIn',
  'contact.row.location': 'Location',
  'contact.row.locationValue': 'Brazil',
  'contact.currentStatus': 'Current status',
  'contact.openTo': 'Open to work',
  'footer.built': 'built with care',
};

jest.mock('next-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => translations[key] ?? key }),
}));

describe('ContactSection', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({ ok: true });
    // ContactSection resets its status back to 'idle' via a 3.5s setTimeout
    // after every submit. Fake timers (auto-advancing, so waitFor/findByText
    // still work without manual jest.advanceTimersByTime calls) keep that
    // timer from outliving the test and firing a state update on an
    // unmounted component.
    jest.useFakeTimers({ advanceTimers: true });
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders all form fields', () => {
    render(<ContactSection />);
    // Name/Email/Message are marked required, which renders a trailing
    // " *" inside the label (see Field in Contact.tsx) — match by prefix
    // instead of the exact visible string.
    expect(screen.getByLabelText(/^Name/)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Email/)).toBeInTheDocument();
    expect(screen.getByLabelText('Subject')).toBeInTheDocument();
    expect(screen.getByLabelText(/^Message/)).toBeInTheDocument();
  });

  it('submits the form to the contact API and shows a success state', async () => {
    render(<ContactSection />);
    fireEvent.change(screen.getByLabelText(/^Name/), {
      target: { value: 'Ada Lovelace' },
    });
    fireEvent.change(screen.getByLabelText(/^Email/), {
      target: { value: 'ada@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/^Message/), {
      target: { value: 'Hi there' },
    });
    fireEvent.click(screen.getByText('Send'));

    await waitFor(() =>
      expect(global.fetch).toHaveBeenCalledWith(
        '/api/contact/',
        expect.objectContaining({ method: 'POST' })
      )
    );
    const [, options] = (global.fetch as jest.Mock).mock.calls[0];
    expect(JSON.parse(options.body)).toEqual(
      expect.objectContaining({
        name: 'Ada Lovelace',
        email: 'ada@example.com',
      })
    );
    expect(await screen.findByText('Sent!')).toBeInTheDocument();
  });

  it('shows an error state when the request fails', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({ ok: false });
    render(<ContactSection />);
    // Name/Email/Message are required inputs, so the form needs them filled
    // in or the browser's native constraint validation blocks submission
    // (onSubmit never fires) before the fetch mock is ever reached.
    fireEvent.change(screen.getByLabelText(/^Name/), {
      target: { value: 'Ada Lovelace' },
    });
    fireEvent.change(screen.getByLabelText(/^Email/), {
      target: { value: 'ada@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/^Message/), {
      target: { value: 'Hi there' },
    });
    fireEvent.click(screen.getByText('Send'));
    expect(await screen.findByText('Something went wrong')).toBeInTheDocument();
  });
});
