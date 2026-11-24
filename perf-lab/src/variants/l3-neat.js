// @firecms/neat (raw WebGL), library defaults for density/resolution.
import { NeatGradient } from '@firecms/neat';
import { root, ready } from '../lib/orbs.js';
import { staticDots } from '../lib/dots.js';

const cvs = document.createElement('canvas');
Object.assign(cvs.style, { position: 'absolute', inset: '0', width: '100%', height: '100%', opacity: '0.55' });
root().appendChild(cvs);
new NeatGradient({
  ref: cvs,
  colors: [
    { color: '#1d6df7', enabled: true },
    { color: '#8b5cf6', enabled: true },
    { color: '#0b1020', enabled: true },
  ],
  speed: 2,
  waveAmplitude: 4,
  backgroundColor: '#0b1020',
  backgroundAlpha: 1,
});
staticDots(root());
ready();
