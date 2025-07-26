import ArrowUpOutlined from '@ant-design/icons/lib/icons/ArrowUpOutlined';
import React from 'react';

type Props = {
  isVisible: boolean;
  scrollToTop: () => void;
};
const ScrollToTopButton = ({ isVisible, scrollToTop }: Props) => {
  return (
    <div
      onClick={scrollToTop}
      className={`fixed bottom-5 right-5 cursor-pointer rounded-full text-white shadow-lg transition duration-300 ease-in-out ${
        isVisible ? '' : 'invisible'
      }`}
    >
      <div>
        <div className="flex h-11 w-11 justify-center rounded-full bg-primary p-5 align-middle text-white hover:text-gray-400">
          <ArrowUpOutlined />
        </div>
      </div>
    </div>
  );
};

export default ScrollToTopButton;
