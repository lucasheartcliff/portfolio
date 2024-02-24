import type { LinkProps } from 'next/link';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

interface Props extends LinkProps {
  skipLocaleHandling?: boolean;
  locale?: string;
  target?: string;
  className?: string;
  children?: React.ReactNode;
}

const LinkComponent = ({
  children,
  skipLocaleHandling,
  href: propsHref,
  ...rest
}: Props) => {
  const router = useRouter();
  const locale = rest.locale || router.query.locale;

  let href = propsHref || router.asPath;
  if (href.indexOf('http') === 0) skipLocaleHandling = true;
  if (locale && !skipLocaleHandling) {
    href = href
      ? `/${locale}${href}`
      : router.pathname.replace('[locale]', locale);
  }

  return (
    <>
      <NextLink href={href} {...rest}>
        {children}
      </NextLink>
    </>
  );
};

export default function Link({ children, ...props }: Props) {
  return (
    <LinkComponent className="text-black hover:border-0" {...props}>
      {children}
    </LinkComponent>
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
