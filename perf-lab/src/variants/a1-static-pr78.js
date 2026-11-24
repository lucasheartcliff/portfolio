// What PR #78 does: static orbs (no blur, no will-change) + dots painted once.
import { orbs, root, ready } from '../lib/orbs.js';
import { staticDots } from '../lib/dots.js';
orbs(root(), { blur: false, animate: false, willChange: false });
staticDots(root());
ready();
