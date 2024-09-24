import { type ReactNode, useEffect } from 'react';

import Navbar from '@/components/Navbar';
import Scroll from '@/components/Scroll';
import heartcliff from '@/utils/log';

type IMainProps = {
  title: string;
  meta: ReactNode;
  children: ReactNode;
  scrollTo: (titleId: string) => void;
};

const Main = (props: IMainProps) => {
  useEffect(() => {
    heartcliff();
  }, []);
  return (
    <div className="h-screen w-full">
      {props.meta}
      <Navbar logoTitle={props.title} scrollTo={props.scrollTo} />
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
};

export { Main };
