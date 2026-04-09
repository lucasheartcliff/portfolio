import { motion } from 'framer-motion';
import React from 'react';

interface Props {
  children: React.ReactNode;
  className?: string;
}

export default function AnimatedHeading({ children, className = '' }: Props) {
  return (
    <motion.h3
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      className={`relative mb-3 inline-block text-xl font-semibold text-black dark:text-white md:text-4xl ${className}`}
    >
      {children}
      <motion.span
        variants={{
          hidden: { scaleX: 0 },
          visible: { scaleX: 1 },
        }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
        className="absolute -bottom-1 left-0 block h-[3px] w-full origin-left bg-primary"
        aria-hidden
      />
    </motion.h3>
  );
}
