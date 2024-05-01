import React from 'react';

interface Props {
  label: string;
  color: string;
}

export default function ColorfulDot({ color, label }: Props) {
  return (
    <div className="flex flex-row items-center justify-center">
      <div
        className={`mr-3 h-2 w-2 rounded-full`}
        style={{ background: color }}
      ></div>
      <span className="text-sm md:text-base">{label}</span>
    </div>
  );
}
