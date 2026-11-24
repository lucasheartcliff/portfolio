// tsParticles (slim, 2D canvas): ~150 slowly drifting dots. It has no soft
// blob primitive, so the orbs stay as static CSS gradients underneath.
import { tsParticles } from '@tsparticles/engine';
import { loadSlim } from '@tsparticles/slim';
import { orbs, root, ready } from '../lib/orbs.js';

orbs(root(), { blur: false, animate: false, willChange: false });
const host = document.createElement('div');
host.id = 'tsp';
Object.assign(host.style, { position: 'absolute', inset: '0', zIndex: '1' });
root().appendChild(host);
(async () => {
  await loadSlim(tsParticles);
  await tsParticles.load({
    id: 'tsp',
    options: {
      fullScreen: { enable: false },
      fpsLimit: 60,
      background: { color: 'transparent' },
      particles: {
        number: { value: 150 },
        color: { value: ['#1d6df7', '#8b5cf6'] },
        opacity: { value: 0.25 },
        size: { value: { min: 0.9, max: 1.3 } },
        move: { enable: true, speed: 0.4, outModes: 'out' },
        links: { enable: false },
      },
      detectRetina: false,
    },
  });
  ready();
})();
