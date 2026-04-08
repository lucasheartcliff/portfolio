import Script from 'next/script';
import { useTranslation } from 'next-i18next';
import React from 'react';

interface Props {
  username: string;
}

const KofiButton = ({ username }: Props) => {
  const { t } = useTranslation('common');
  const buttonText = t('Support me');

  return (
    <>
      <Script
        src="https://storage.ko-fi.com/cdn/scripts/overlay-widget.js"
        strategy="lazyOnload"
        onLoad={() => {
          (window as any).kofiWidgetOverlay?.draw(username, {
            type: 'floating-chat',
            'floating-chat.donateButton.text': buttonText,
            'floating-chat.donateButton.background-color': '#5c7cfa',
            'floating-chat.donateButton.text-color': '#fff',
          });
        }}
      />
    </>
  );
};

export default KofiButton;
