import { useReducedMotion } from 'framer-motion';
import { useCallback, useRef, useState } from 'react';

export default function useShinyHover() {
  const ref = useRef<HTMLDivElement>(null);
  const [background, setBackground] = useState('');
  const prefersReducedMotion = useReducedMotion();

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (prefersReducedMotion || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setBackground(
        `radial-gradient(circle at ${x}% ${y}%, rgba(255,255,255,0.15) 0%, transparent 60%)`
      );
    },
    [prefersReducedMotion]
  );

  const onMouseLeave = useCallback(() => {
    setBackground('');
  }, []);

  return { ref, shinyOverlayStyle: { background }, onMouseMove, onMouseLeave };
}
