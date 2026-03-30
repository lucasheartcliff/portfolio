import { MoonOutlined, SunOutlined } from '@ant-design/icons';
import React from 'react';

interface Props {
  isDark: boolean;
  toggle: () => void;
}

export default function DarkModeToggle({ isDark, toggle }: Props) {
  return (
    <button
      onClick={toggle}
      aria-label="Toggle dark mode"
      className="rounded-full p-2 text-xl text-black transition-colors hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700"
    >
      {isDark ? <SunOutlined /> : <MoonOutlined />}
    </button>
  );
}
