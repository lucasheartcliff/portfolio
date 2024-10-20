import ArrowUpOutlined from '@ant-design/icons/lib/icons/ArrowUpOutlined';
import React from 'react';

import Icon from '../Icon';

const theme = require('../../styles/themes');

type Props = {
  isVisible: boolean;
  scrollToTop: () => void;
};
const ScrollToTopButton = ({ isVisible, scrollToTop }: Props) => {
  return (
    <div
      onClick={scrollToTop}
      className={`fixed bottom-5 right-5 cursor-pointer rounded-full text-white shadow-lg transition duration-300 ease-in-out md:bottom-7 md:right-7 ${
        isVisible ? '' : 'invisible'
      }`}
    >
      <div>
        <Icon color={theme.primary}>
          <ArrowUpOutlined />
        </Icon>
      </div>
    </div>
  );
};

export default ScrollToTopButton;
