import React from 'react';
import Scrollbars, { ScrollbarProps } from 'react-custom-scrollbars';

interface Props extends ScrollbarProps {}

const Scroll: React.FC<Props> = ({ children, ...props }) => {
  return <Scrollbars {...props}>{children}</Scrollbars>;
};

export default Scroll;
