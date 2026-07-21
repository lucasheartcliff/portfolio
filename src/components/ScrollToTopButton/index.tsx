import ArrowUpOutlined from '@ant-design/icons/lib/icons/ArrowUpOutlined';
import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';

type Props = {
  isVisible: boolean;
  scrollToTop: () => void;
};

const ScrollToTopButton = ({ isVisible, scrollToTop }: Props) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          type="button"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.2 }}
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="fixed bottom-5 right-5 rounded-full text-white shadow-lg"
        >
          <div className="flex h-11 w-11 justify-center rounded-full bg-primary p-5 align-middle text-white hover:text-gray-400">
            <ArrowUpOutlined aria-hidden />
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTopButton;
