// Custom, no libraries: orbs keep drifting, but with no blur filter (the
// radial-gradient is already soft) so the animation is transform-only.
import { orbs, root, ready } from '../lib/orbs.js';
import { staticDots } from '../lib/dots.js';
orbs(root(), { blur: false, animate: true, willChange: false });
staticDots(root());
ready();
