import {
  motion,
  useAnimation,
  useInView,
  useReducedMotion,
} from 'framer-motion';
import React, { useEffect, useRef } from 'react';

interface Props {
  children: JSX.Element;
  width?: 'fit-content' | '100%';
  delay?: number;
}

const Reveal = ({ children, width = '100%', delay = 0.25 }: Props) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const prefersReducedMotion = useReducedMotion();

  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start('visible');
    }
  }, [isInView]);

  return (
    <div ref={ref} style={{ position: 'relative', width, overflow: 'hidden' }}>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 75 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate={mainControls}
        transition={{ duration: 0.5, delay }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default Reveal;
