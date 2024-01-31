import { HeartFilled } from '@ant-design/icons';
import React from 'react';

const Footer = () => {
  return (
    <footer className=" py-10 text-center text-gray-700">
      <div className="flex items-center justify-center">
        <p className="mr-2">Made with </p>
        <HeartFilled className="text-red-700" />
        <p className="ml-2"> by Lucas Morais</p>
      </div>
    </footer>
  );
};

export default Footer;
