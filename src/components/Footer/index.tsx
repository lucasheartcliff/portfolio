import { HeartFilled } from '@ant-design/icons';
import { useTranslation } from 'next-i18next';
import React from 'react';

const Footer = () => {
  const { t } = useTranslation('common');
  return (
    <footer className=" py-10 text-center text-gray-700">
      <div className="flex items-center justify-center">
        <p className="mr-2">{t('Made with')}</p>
        <HeartFilled className="text-red-700" />
        <p className="ml-2">{t('by Lucas Morais')}</p>
      </div>
    </footer>
  );
};

export default Footer;
