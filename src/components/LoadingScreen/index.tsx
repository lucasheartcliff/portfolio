import { motion } from 'framer-motion';
import React from 'react';

type Props = {
  name?: string;
};

const LoadingScreen = ({ name }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white dark:bg-gray-900"
    >
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="h-16 w-16 rounded-lg border-4 border-blue-600 border-t-transparent shadow-lg"
      />
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-4 text-xl font-semibold tracking-widest text-blue-600"
      >
        {name}
      </motion.p>
    </motion.div>
  );
};

export default LoadingScreen;
