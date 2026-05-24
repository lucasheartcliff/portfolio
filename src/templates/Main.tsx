import {
  createContext,
  type ReactNode,
  type RefObject,
  useEffect,
  useRef,
  useState,
} from 'react';
import type Scrollbars from 'react-custom-scrollbars-2';

import Navbar from '@/components/Navbar';
import ReadingProgress from '@/components/ReadingProgress';
import Scroll from '@/components/Scroll';
import ScrollToTopButton from '@/components/ScrollToTopButton';
import heartcliff from '@/utils/log';

export const ScrollRefContext = createContext<RefObject<Scrollbars> | null>(
  null
);

export const ScrollTopContext = createContext(0);

type IMainProps = {
  title: string;
  meta: ReactNode;
  children: ReactNode;
  showLanguageSelector?: boolean;
};

const Main = (props: IMainProps) => {
  const [isScrollTopVisible, setScrollTopVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);
  const scrollRef = useRef<Scrollbars>(null);
  useEffect(() => {
    heartcliff();
  }, []);

  const handleScroll = () => {
    const ref = scrollRef.current;
    if (!ref) return;
    const currentScrollTop = ref.getScrollTop();
    const scrollHeight = ref.getScrollHeight();
    const clientHeight = ref.getClientHeight();
    const visible = currentScrollTop > 300;
    if (visible !== isScrollTopVisible) setScrollTopVisible(visible);
    const maxScroll = scrollHeight - clientHeight;
    setScrollProgress(maxScroll > 0 ? currentScrollTop / maxScroll : 0);
    setScrollTop(currentScrollTop);
  };

  const scrollToTop = () => {
    const ref = scrollRef.current;
    if (!ref) return;
    ref.container.firstElementChild?.scroll({ behavior: 'smooth', top: 0 });
  };

  return (
    <ScrollRefContext.Provider value={scrollRef}>
      <ScrollTopContext.Provider value={scrollTop}>
        <div className="flex h-screen w-full flex-col overflow-hidden bg-white dark:bg-gray-900">
          {props.meta}
          <ReadingProgress progress={scrollProgress} />
          <Navbar
            logoTitle={props.title}
            showLanguageSelector={props.showLanguageSelector}
          />
          <div className="min-h-0 w-full flex-1 text-gray-700 antialiased">
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
      </ScrollTopContext.Provider>
    </ScrollRefContext.Provider>
  );
};

export { Main };
