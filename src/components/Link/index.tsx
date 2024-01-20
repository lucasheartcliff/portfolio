import React from 'react';

interface Props
  extends React.DetailedHTMLProps<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  > {}

export default function Link({ children, ...props }: Props) {
  return (
    <a className="text-black hover:border-0" {...props}>
      {children}
    </a>
  );
}

export function SocialLink(props: Props) {
  return (
    <Link
      className={'text-gray-500 hover:border-0 hover:text-black'}
      target={'_blank'}
      {...props}
    />
  );
}
