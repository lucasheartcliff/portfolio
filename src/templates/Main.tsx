import type { ReactNode } from 'react';

import Navbar from '@/components/Navbar';
import Scroll from '@/components/Scroll';

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
};

const Main = (props: IMainProps) => (
  <div className="h-screen w-full">
    {props.meta}
    <Navbar logoTitle="LucasHeartcliff" />
    <div
      style={{ height: 'calc(100% - 77px)' }}
      className="max-h-screen w-full text-gray-700 antialiased"
    >
      <div className="h-full text-xl">
        <Scroll>{props.children}</Scroll>
      </div>
    </div>
  </div>
);

export { Main };
