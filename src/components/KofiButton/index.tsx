import Script from 'next/script';
import React from 'react';

interface Props {
  username: string;
}

const KofiButton = ({ username }: Props) => {
  return (
    <>
      <Script
        src="https://storage.ko-fi.com/cdn/scripts/overlay-widget.js"
        strategy="lazyOnload"
        onLoad={() => {
          (window as any).kofiWidgetOverlay?.draw(username, {
            type: 'floating-chat',
            'floating-chat.donateButton.text': 'Support me',
            'floating-chat.donateButton.background-color': '#5c7cfa',
            'floating-chat.donateButton.text-color': '#fff',
          });
        }}
      />
    </>
  );
};

export default KofiButton;
