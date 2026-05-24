import { AnimatePresence, motion } from 'framer-motion';
import { useTranslation } from 'next-i18next';
import React, { useEffect, useState } from 'react';

const ROLES = [
  'Senior Software Engineer',
  'Backend Engineer',
  'Full-Stack Developer',
  'System Architect',
  'Open Source Enthusiast',
];

export default function TypedRole() {
  const [index, setIndex] = useState(0);
  const { t } = useTranslation('common');

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % ROLES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="inline-block h-[1.5em] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.span
          key={ROLES[index]}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-block text-primary"
        >
          {t(ROLES[index] as string)}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
