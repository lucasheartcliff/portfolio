import React from 'react';

interface Props {
  color: string;
  children: React.ReactNode;
}

export default function Icon({ children, color }: Props) {
  return (
    <div
      style={
        {
          '--icon-color': color,
          background: 'color-mix(in srgb, var(--icon-color) 18%, transparent)',
          borderColor: 'color-mix(in srgb, var(--icon-color) 35%, transparent)',
        } as React.CSSProperties
      }
      className="mx-1 flex h-11 w-11 items-center justify-center rounded-full border p-5 align-middle backdrop-blur transition-transform hover:scale-110"
    >
      {children}
    </div>
  );
}
