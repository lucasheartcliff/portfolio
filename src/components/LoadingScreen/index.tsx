import React from 'react';

type Props = {
  name?: string;
};

const LoadingScreen = ({ name }: Props) => {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading"
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
      style={{ background: 'var(--bg-base)' }}
    >
      <svg
        className="animate-spin"
        width="48"
        height="48"
        viewBox="0 0 24 24"
        fill="none"
      >
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="var(--accent)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="55"
          strokeDashoffset="15"
        />
      </svg>
      <p
        className="mt-4 font-display text-xl font-semibold tracking-widest text-primary"
        style={{ animation: 'loadingTextIn 0.4s ease-out 0.5s both' }}
      >
        {name}
      </p>
    </div>
  );
};

export default LoadingScreen;
