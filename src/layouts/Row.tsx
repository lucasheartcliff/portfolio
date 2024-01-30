import React from 'react';

interface Props {
  children: React.ReactNode;
}

export default function Row({ children }: Props) {
  return (
    <div className="flex w-full flex-1 flex-col md:flex-row md:py-10">
      {children}
    </div>
  );
}
