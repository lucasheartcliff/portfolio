// gradient-gl (tiny WebGL, seed-driven), library defaults.
import gradientGL from 'gradient-gl';
import { root, ready } from '../lib/orbs.js';
import { staticDots } from '../lib/dots.js';

const host = document.createElement('div');
host.id = 'ggl';
Object.assign(host.style, { position: 'absolute', inset: '0', opacity: '0.55' });
root().appendChild(host);
gradientGL('c1.eba9', '#ggl').then(() => { staticDots(root()); ready(); });
