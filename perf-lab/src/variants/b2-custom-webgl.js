// Custom, no libraries: ONE fragment shader draws the three drifting orbs and
// the dot grid in a single draw call, at 1x pixel ratio.
import { root, ready } from '../lib/orbs.js';

const VERT = 'attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}';
const FRAG = `
precision mediump float;
uniform vec2 uRes; uniform float uT;
const vec3 CA = vec3(0.114,0.427,0.969);
const vec3 CB = vec3(0.545,0.361,0.965);
float orb(vec2 p, vec2 c, float r) {
  float d = length(p - c) / r;
  float a = clamp(1.0 - d, 0.0, 1.0);
  return a * a * 0.33 * 0.55;
}
void main() {
  vec2 p = gl_FragCoord.xy;
  float W = uRes.x; float H = uRes.y;
  // Centres/radii mirror the CSS orbs (vw units), drift period 22/28/24 s.
  vec2 c1 = vec2(0.175*W, H - 0.125*W) + vec2(sin(uT*6.283/22.0), -cos(uT*6.283/22.0)) * 40.0;
  vec2 c2 = vec2(0.90*W,  H - (0.2*H + 0.30*W)) + vec2(-sin(uT*6.283/28.0), -cos(uT*6.283/28.0)) * 45.0;
  vec2 c3 = vec2(0.425*W, 0.075*W) + vec2(sin(uT*6.283/24.0), cos(uT*6.283/24.0)) * 35.0;
  float a1 = orb(p, c1, 0.36*W); float a2 = orb(p, c2, 0.40*W); float a3 = orb(p, c3, 0.30*W);
  vec3 col = CA*a1 + CB*a2 + CB*a3;
  float al = a1 + a2 + a3;
  // Static dot grid, 28px spacing, colour ramps A->B across x.
  float s = 28.0;
  float d = length(mod(p + s*0.5, s) - s*0.5);
  float dotA = smoothstep(1.5, 0.7, d) * 0.24;
  vec3 dc = mix(CA, CB, p.x / W);
  col = col * (1.0 - dotA) + dc * dotA;
  al = al * (1.0 - dotA) + dotA;
  gl_FragColor = vec4(col, al);
}`;

const cvs = document.createElement('canvas');
Object.assign(cvs.style, { position: 'absolute', inset: '0', width: '100%', height: '100%' });
root().appendChild(cvs);
const gl = cvs.getContext('webgl', { premultipliedAlpha: true, alpha: true, antialias: false, powerPreference: 'low-power' });

const sh = (type, src) => { const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); return s; };
const prog = gl.createProgram();
gl.attachShader(prog, sh(gl.VERTEX_SHADER, VERT));
gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, FRAG));
gl.linkProgram(prog);
gl.useProgram(prog);
const buf = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, buf);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
const loc = gl.getAttribLocation(prog, 'p');
gl.enableVertexAttribArray(loc);
gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
const uRes = gl.getUniformLocation(prog, 'uRes');
const uT = gl.getUniformLocation(prog, 'uT');

const resize = () => {
  cvs.width = cvs.clientWidth; cvs.height = cvs.clientHeight; // 1x on purpose
  gl.viewport(0, 0, cvs.width, cvs.height);
  gl.uniform2f(uRes, cvs.width, cvs.height);
};
resize();
window.addEventListener('resize', resize);

let raf = 0;
const frame = (t) => { gl.uniform1f(uT, t * 0.001); gl.drawArrays(gl.TRIANGLES, 0, 3); raf = requestAnimationFrame(frame); };
// Do not burn frames while the tab is hidden.
document.addEventListener('visibilitychange', () => {
  if (document.hidden) cancelAnimationFrame(raf); else raf = requestAnimationFrame(frame);
});
raf = requestAnimationFrame(frame);
ready();
