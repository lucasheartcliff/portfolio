import React, { forwardRef } from 'react';
import type { ScrollbarProps } from 'react-custom-scrollbars-2';
import { Scrollbars } from 'react-custom-scrollbars-2';

interface Props extends ScrollbarProps { }

function Scroll({ children, ...props }: Props, ref: any) {
  return (
    <Scrollbars ref={ref} {...props}>
      {children}
    </Scrollbars>
  );
}

export default forwardRef(Scroll);
