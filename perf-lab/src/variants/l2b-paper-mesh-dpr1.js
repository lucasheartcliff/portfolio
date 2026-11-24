// Same as l2 but with Paper's documented minPixelRatio knob lowered to 1.
import { ShaderMount, meshGradientFragmentShader, getShaderColorFromString, defaultObjectSizing, ShaderFitOptions } from '@paper-design/shaders';
import { root, ready } from '../lib/orbs.js';
import { staticDots } from '../lib/dots.js';

const host = document.createElement('div');
Object.assign(host.style, { position: 'absolute', inset: '0', opacity: '0.55' });
root().appendChild(host);
const colors = ['#1d6df7', '#8b5cf6', '#0b1020', '#8b5cf6'].map(getShaderColorFromString);
const s = defaultObjectSizing;
new ShaderMount(host, meshGradientFragmentShader, {
  u_fit: ShaderFitOptions[s.fit], u_scale: s.scale, u_rotation: s.rotation,
  u_originX: s.originX, u_originY: s.originY, u_offsetX: s.offsetX, u_offsetY: s.offsetY,
  u_worldWidth: s.worldWidth, u_worldHeight: s.worldHeight,
  u_colors: colors, u_colorsCount: colors.length,
  u_distortion: 0.8, u_swirl: 0.1, u_grainMixer: 0, u_grainOverlay: 0,
}, undefined, 0.3, 0, 1);
staticDots(root());
ready();
