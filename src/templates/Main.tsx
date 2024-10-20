import { type ReactNode, useEffect, useRef, useState } from 'react';
import type Scrollbars from 'react-custom-scrollbars-2';

import Navbar from '@/components/Navbar';
import Scroll from '@/components/Scroll';
import ScrollToTopButton from '@/components/ScrollToTopButton';
import heartcliff from '@/utils/log';

type IMainProps = {
  title: string;
  meta: ReactNode;
  children: ReactNode;
  scrollTo: (titleId: string) => void;
};

const Main = (props: IMainProps) => {
  const [isScrollTopVisible, setScrollTopVisible] = useState(false);
  const scrollRef = useRef<Scrollbars>(null);
  useEffect(() => {
    heartcliff();
  }, []);

  const handleScroll = () => {
    const ref = scrollRef.current;
    if (!ref) return;
    const visible = ref.getScrollTop() > 300;
    if (visible !== isScrollTopVisible) setScrollTopVisible(visible);
  };

  const scrollToTop = () => {
    const ref = scrollRef.current;
    if (!ref) return;
    ref.scrollToTop();
  };

  return (
    <div className="h-screen w-full">
      {props.meta}
      <Navbar logoTitle={props.title} scrollTo={props.scrollTo} />
      <div
        style={{ height: 'calc(100% - 77px)' }}
        className="max-h-screen w-full text-gray-700 antialiased"
      >
        <div className="relative h-full text-xl">
          <Scroll ref={scrollRef} onScroll={() => handleScroll()}>
            <>
              {props.children}
              <ScrollToTopButton
                isVisible={isScrollTopVisible}
                scrollToTop={scrollToTop}
              />
            </>
          </Scroll>
        </div>
      </div>
    </div>
  );
};

export { Main };
