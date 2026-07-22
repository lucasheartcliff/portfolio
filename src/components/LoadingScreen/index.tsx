import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import { motion } from 'framer-motion';
import React from 'react';

type Props = {
  name?: string;
};

const LoadingScreen = ({ name }: Props) => {
  return (
    <motion.div
      role="status"
      aria-live="polite"
      aria-label="Loading"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
      style={{ background: 'var(--bg-base)' }}
    >
      <Spin
        indicator={
          <LoadingOutlined
            style={{ fontSize: 48, color: 'var(--accent)' }}
            spin
          />
        }
      />
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-4 font-display text-xl font-semibold tracking-widest text-primary"
      >
        {name}
      </motion.p>
    </motion.div>
  );
};

export default LoadingScreen;
