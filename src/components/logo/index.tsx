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
      <span className="text-3xl text-gray-500">{'<'}</span>
      <div
        className="mt-2 pl-1 pr-2 font-agustina font-bold text-blue-700"
        style={{ fontVariantLigatures: 'no-common-ligatures' }}
      >
        {title}
      </div>
      <span className="text-3xl text-gray-500">{'/>'}</span>
    </div>
  );
}
