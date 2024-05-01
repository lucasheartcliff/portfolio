import dynamic from 'next/dynamic';
import React from 'react';
import type { ScrollbarProps } from 'react-custom-scrollbars-2';

const Scrollbars = dynamic(() => import('react-custom-scrollbars-2'), {
  ssr: false,
});

interface Props extends ScrollbarProps {}

const Scroll: React.FC<Props> = ({ children, ...props }) => {
  return <Scrollbars {...props}>{children}</Scrollbars>;
};

export default Scroll;
