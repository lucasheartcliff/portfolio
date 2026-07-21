import { motion, useReducedMotion } from 'framer-motion';
import React from 'react';

interface Props {
  progress: number;
}

export default function ReadingProgress({ progress }: Props) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      role="progressbar"
      aria-label="Reading progress"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(progress * 100)}
      style={{ scaleX: progress }}
      transition={
        prefersReducedMotion
          ? { duration: 0 }
          : { duration: 0.1, ease: 'easeOut' }
      }
      className="fixed left-0 top-0 z-[60] h-[3px] w-full origin-left bg-primary"
    />
  );
}
