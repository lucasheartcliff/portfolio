import React from 'react';

interface Props {
  children: React.ReactNode;
}

export default function Block({ children }: Props) {
  return (
    <div className="flex flex-1 p-2 sm:align-middle md:p-5 ">{children}</div>
  );
}
