const A = [0x1d, 0x6d, 0xf7];
const B = [0x8b, 0x5c, 0xf6];
const DENSITY = 28;

/** Builds the dot grid the way the site does (same spacing, radius, alpha ranges). */
export function buildDots(w, h) {
  const cols = Math.ceil(w / DENSITY) + 2;
  const rows = Math.ceil(h / DENSITY) + 2;
  const dots = [];
  for (let i = 0; i < cols; i += 1) {
    for (let j = 0; j < rows; j += 1) {
      dots.push({ x: i * DENSITY, y: j * DENSITY, r: 0.9 + Math.random() * 0.4,
        phase: Math.random() * Math.PI * 2, base: 0.18 + Math.random() * 0.12 });
    }
  }
  return dots;
}

export function makeCanvas(root) {
  const cvs = document.createElement('canvas');
  Object.assign(cvs.style, { position: 'absolute', inset: '0', width: '100%', height: '100%', zIndex: '1' });
  root.appendChild(cvs);
  return cvs;
}

function setup(cvs) {
  const ctx = cvs.getContext('2d');
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const w = cvs.clientWidth;
  const h = cvs.clientHeight;
  cvs.width = Math.floor(w * dpr);
  cvs.height = Math.floor(h * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  return { ctx, w, h, dots: buildDots(w, h) };
}

function draw({ ctx, w, h, dots }, time) {
  ctx.clearRect(0, 0, w, h);
  for (let i = 0; i < dots.length; i += 1) {
    const d = dots[i];
    const breathe = Math.sin(time * 1.2 + d.phase) * 0.5 + 0.5;
    const tx = d.x / w;
    const r = Math.round(A[0] * (1 - tx) + B[0] * tx);
    const g = Math.round(A[1] * (1 - tx) + B[1] * tx);
    const b = Math.round(A[2] * (1 - tx) + B[2] * tx);
    const a = d.base * (0.55 + breathe * 0.45);
    ctx.beginPath();
    ctx.fillStyle = `rgba(${r},${g},${b},${Math.min(1, a)})`;
    ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
    ctx.fill();
  }
}

/** Paints the grid once (what #78 does). */
export function staticDots(root) {
  draw(setup(makeCanvas(root)), 0);
}

/** Today's behaviour on `main`: ~30fps rAF loop redrawing every dot, forever. */
export function loopingDots(root) {
  const state = setup(makeCanvas(root));
  const INTERVAL = 1000 / 30;
  let last = 0;
  const tick = (t) => {
    if (t - last >= INTERVAL) { last = t; draw(state, t * 0.001); }
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}
