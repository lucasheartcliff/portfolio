import { SendOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import { useTranslation } from 'next-i18next';
import React, { useState } from 'react';

type Status = 'idle' | 'sending' | 'success' | 'error';

export default function ContactForm() {
  const { t } = useTranslation('common');
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMsg('');

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || 'Failed to send');
      }

      setStatus('success');
      form.reset();
      setTimeout(() => setStatus('idle'), 5000);
    } catch (err: any) {
      setErrorMsg(err.message || 'Something went wrong');
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="contact-name"
            className="text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            {t('Name')} *
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            maxLength={100}
            className="rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-base text-gray-900 outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:border-primary"
            placeholder={t('Your name')}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="contact-email"
            className="text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            {t('Email')} *
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            maxLength={200}
            className="rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-base text-gray-900 outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:border-primary"
            placeholder={t('your@email.com')}
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="contact-subject"
          className="text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          {t('Subject')}
        </label>
        <input
          id="contact-subject"
          name="subject"
          type="text"
          maxLength={200}
          className="rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-base text-gray-900 outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:border-primary"
          placeholder={t('What is this about?')}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="contact-message"
          className="text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          {t('Message')} *
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          maxLength={5000}
          className="resize-y rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-base text-gray-900 outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:border-primary"
          placeholder={t('Your message...')}
        />
      </div>

      <div className="flex items-center gap-4">
        <motion.button
          type="submit"
          disabled={status === 'sending'}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-base font-semibold text-white transition-opacity hover:border-0 hover:opacity-90 disabled:opacity-50"
        >
          <SendOutlined />
          {status === 'sending' ? t('Sending...') : t('Send Message')}
        </motion.button>

        {status === 'success' && (
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-sm font-medium text-green-600 dark:text-green-400"
          >
            {t('Message sent successfully!')}
          </motion.span>
        )}
        {status === 'error' && (
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-sm font-medium text-red-600 dark:text-red-400"
          >
            {errorMsg}
          </motion.span>
        )}
      </div>
    </form>
  );
}
