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

/** Fixed, non-interactive animated orbs rendered behind the scroll container. */
const OrbBackground = () => (
  <div
    aria-hidden
    className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    style={{ opacity: 'var(--orb-dim)' }}
  >
    <div
      className="orb-anim-1 absolute -left-32 -top-32 h-[28rem] w-[28rem] rounded-full blur-3xl"
      style={{
        background:
          'radial-gradient(circle, color-mix(in srgb, var(--accent) 28%, transparent), transparent 70%)',
      }}
    />
    <div
      className="orb-anim-2 absolute right-[-10rem] top-1/3 h-[32rem] w-[32rem] rounded-full blur-3xl"
      style={{
        background:
          'radial-gradient(circle, color-mix(in srgb, var(--accent-b) 26%, transparent), transparent 70%)',
      }}
    />
    <div
      className="orb-anim-3 absolute bottom-[-12rem] left-1/3 h-[26rem] w-[26rem] rounded-full blur-3xl"
      style={{
        background:
          'radial-gradient(circle, color-mix(in srgb, var(--accent) 20%, transparent), transparent 70%)',
      }}
    />
  </div>
);

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
        <div
          className="relative flex h-screen w-full flex-col overflow-hidden"
          style={{ background: 'var(--bg-base)' }}
        >
          <OrbBackground />
          {props.meta}
          <ReadingProgress progress={scrollProgress} />
          <Navbar
            logoTitle={props.title}
            showLanguageSelector={props.showLanguageSelector}
          />
          <div
            className="relative z-10 min-h-0 w-full flex-1 antialiased"
            style={{ color: 'var(--text-body)' }}
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
      </ScrollTopContext.Provider>
    </ScrollRefContext.Provider>
  );
};

export { Main };
