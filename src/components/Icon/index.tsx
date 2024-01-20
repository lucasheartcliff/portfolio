import React from 'react';

interface Props {
  color: string;
  children: React.ReactNode;
}

export default function Icon({ children, color }: Props) {
  return (
    <div
      style={{ backgroundColor: color }}
      className="mx-1 flex h-11 w-11 justify-center rounded-full p-5 align-middle text-white hover:text-gray-400"
    >
      {children}
    </div>
  );
}
