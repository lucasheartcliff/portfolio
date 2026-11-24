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

// Applied to <html> (see _document.tsx) so the variables resolve for `body`
// too; on a nested wrapper, `body { font-family: var(--font-…) }` is invalid
// and falls back to the browser's default serif.
export const fontVariables = `${spaceGrotesk.variable} ${jetbrainsMono.variable}`;
