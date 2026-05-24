import React from 'react';

interface Props {
  title: string;
  onClick?: () => void;
}

export default function Logo({ title, onClick }: Props) {
  return (
    <div
      className="flex flex-row align-middle text-2xl no-underline"
      onClick={onClick}
    >
      <span
        className="font-mono text-3xl"
        style={{ color: 'var(--text-faint)' }}
      >
        {'<'}
      </span>
      <div
        className="mt-2 pl-0.5 pr-1.5 font-display font-bold text-primary"
        style={{ fontVariantLigatures: 'no-common-ligatures' }}
      >
        {title}
      </div>
      <span
        className="font-mono text-3xl"
        style={{ color: 'var(--text-faint)' }}
      >
        {'/>'}
      </span>
    </div>
  );
}
