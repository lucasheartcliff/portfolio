const COLORS = ['#1d6df7', '#8b5cf6', '#8b5cf6'];
const SPEC = [
  { size: '55vw', top: '-15vw', left: '-10vw', at: '30% 30%', blur: 45, anim: 'orbA 22s' },
  { size: '60vw', top: '20vh', right: '-20vw', at: '50% 50%', blur: 50, anim: 'orbB 28s' },
  { size: '45vw', bottom: '-15vw', left: '20vw', at: '50% 50%', blur: 45, anim: 'orbC 24s' },
];

const KEYFRAMES = `
@keyframes orbA{0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(40px,60px) scale(1.08)}}
@keyframes orbB{0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(-50px,40px) scale(1.1)}}
@keyframes orbC{0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(30px,-40px) scale(1.06)}}`;

/**
 * Three soft orbs, as on the site.
 * @param {HTMLElement} root
 * @param {{blur:boolean, animate:boolean, willChange:boolean}} opts
 */
export function orbs(root, { blur, animate, willChange }) {
  const style = document.createElement('style');
  style.textContent = KEYFRAMES;
  document.head.appendChild(style);
  const wrap = document.createElement('div');
  Object.assign(wrap.style, { position: 'absolute', inset: '0', overflow: 'hidden', zIndex: '0', opacity: '0.55' });
  SPEC.forEach((s, i) => {
    const el = document.createElement('div');
    Object.assign(el.style, {
      position: 'absolute', borderRadius: '9999px', width: s.size, height: s.size,
      top: s.top || '', left: s.left || '', right: s.right || '', bottom: s.bottom || '',
      background: `radial-gradient(circle at ${s.at}, ${COLORS[i]}55, transparent 65%)`,
    });
    if (blur) el.style.filter = `blur(${s.blur}px)`;
    if (willChange) el.style.willChange = 'transform';
    if (animate) el.style.animation = `${s.anim} ease-in-out infinite`;
    wrap.appendChild(el);
  });
  root.appendChild(wrap);
}

export const root = () => document.getElementById('bg-root');
export const ready = () => { window.perfReady = true; };
