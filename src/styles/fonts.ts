import { JetBrains_Mono, Space_Grotesk } from 'next/font/google';

// Self-hosted via next/font instead of a <link> to fonts.googleapis.com: the
// files are downloaded at build time and served from the app's own origin,
// so there's no third-party request (and no failure mode) at runtime.
export const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

export const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

// next/font only emits its CSS when imported from _app or a page — importing
// it from _document ships no @font-face at all. _app copies the generated
// family names onto :root so `body` (outside any wrapper) can resolve them.
export const fontRootCss = `:root{--font-space-grotesk:${spaceGrotesk.style.fontFamily};--font-jetbrains-mono:${jetbrainsMono.style.fontFamily}}`;
