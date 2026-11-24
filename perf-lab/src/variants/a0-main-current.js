// What `main` ships today: blurred, will-change, infinitely animated orbs + 30fps canvas loop.
import { orbs, root, ready } from '../lib/orbs.js';
import { loopingDots } from '../lib/dots.js';
orbs(root(), { blur: true, animate: true, willChange: true });
loopingDots(root());
ready();
