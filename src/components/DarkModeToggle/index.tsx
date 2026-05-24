import { MoonOutlined, SunOutlined } from '@ant-design/icons';
import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';

interface Props {
  isDark: boolean;
  toggle: () => void;
}

export default function DarkModeToggle({ isDark, toggle }: Props) {
  return (
    <button
      onClick={toggle}
      aria-label="Toggle dark mode"
      className="relative inline-flex h-9 w-9 items-center justify-center overflow-hidden rounded-full p-2 text-xl text-black transition-colors hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isDark ? 'sun' : 'moon'}
          initial={{ rotate: -180, scale: 0, opacity: 0 }}
          animate={{ rotate: 0, scale: 1, opacity: 1 }}
          exit={{ rotate: 180, scale: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="inline-flex"
        >
          {isDark ? <SunOutlined /> : <MoonOutlined />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
