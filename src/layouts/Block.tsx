import React from 'react';

import Scroll from '@/components/Scroll';

interface Props {}

export default function Block({ children }: Props) {
  return (
    <div className="h-32 w-1/2 p-5">
      <Scroll>{children}</Scroll>
    </div>
  );
}
