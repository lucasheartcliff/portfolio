import React, { forwardRef, useContext } from 'react';
import type { ScrollbarProps } from 'react-custom-scrollbars-2';
import { Scrollbars } from 'react-custom-scrollbars-2';

import { DarkModeContext } from '@/pages/_app';

interface Props extends ScrollbarProps {}

function Scroll({ children, ...props }: Props, ref: any) {
  const { isDark } = useContext(DarkModeContext);

  return (
    <Scrollbars
      ref={ref}
      hideTracksWhenNotNeeded={true}
      renderTrackVertical={(p) => (
        <div
          {...p}
          className="track-vertical"
          style={{
            ...p.style,
            right: 2,
            top: 2,
            bottom: 2,
            borderRadius: 4,
            background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
          }}
        />
      )}
      renderThumbVertical={(p) => (
        <div
          {...p}
          className="thumb-vertical"
          style={{
            ...p.style,
            borderRadius: 4,
            background: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)',
          }}
        />
      )}
      renderTrackHorizontal={(p) => (
        <div
          {...p}
          className="track-horizontal"
          style={{ ...p.style, display: 'none' }}
        />
      )}
      renderThumbHorizontal={(p) => (
        <div
          {...p}
          className="thumb-horizontal"
          style={{ ...p.style, display: 'none' }}
        />
      )}
      renderView={(p) => (
        <div
          {...p}
          className="scroll-view"
          style={{
            ...p.style,
            marginBottom: -17,
            border: 0,
            boxShadow: 'none',
          }}
        />
      )}
      {...props}
    >
      {children}
    </Scrollbars>
  );
}

export default forwardRef(Scroll);
