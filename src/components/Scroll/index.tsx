import React from "react";
import type { ScrollbarProps } from "react-custom-scrollbars-2";
import { Scrollbars } from "react-custom-scrollbars-2";

interface Props extends ScrollbarProps {}

const Scroll: React.FC<Props> = ({ children, ...props }) => {
  return <Scrollbars {...props}>{children}</Scrollbars>;
};

export default Scroll;
