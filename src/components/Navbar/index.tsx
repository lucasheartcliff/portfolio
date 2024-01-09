import Link from 'next/link';
import React from 'react';

import Logo from '../logo';

interface Props {
  logoTitle: string;
}

export default function Navbar({ logoTitle }: Props) {
  return (
    <nav className="sticky  top-0 z-50 bg-white p-4 text-white no-underline shadow-md">
      <div className="container">
        <div className="flex items-center justify-between">
          <Link href="/">
            <Logo title={logoTitle} />
          </Link>
          <div className="flex space-x-4">
            <Link href="/">
              <>Home</>
            </Link>
            <Link href="/about">
              <>About</>
            </Link>
            {/* Add more navigation links as needed */}
          </div>
        </div>
      </div>
    </nav>
  );
}
