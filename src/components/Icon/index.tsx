import React from 'react';

interface Props {
  color: string;
  children: React.ReactNode;
}

export default function Icon({ children, color }: Props) {
  return (
    <div
      style={{
        background: `color-mix(in srgb, ${color} 18%, transparent)`,
        borderColor: `color-mix(in srgb, ${color} 35%, transparent)`,
      }}
      className="mx-1 flex h-11 w-11 items-center justify-center rounded-full border p-5 align-middle backdrop-blur transition-transform hover:scale-110"
    >
      {children}
    </div>
  );
}
