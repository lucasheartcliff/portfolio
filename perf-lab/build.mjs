import { build } from 'esbuild';
import { readdirSync, readFileSync, writeFileSync, mkdirSync, rmSync } from 'node:fs';
import { gzipSync } from 'node:zlib';

rmSync('dist', { recursive: true, force: true });
mkdirSync('dist', { recursive: true });
const shell = readFileSync('src/shell.html', 'utf8');
const names = readdirSync('src/variants').filter((f) => f.endsWith('.js')).map((f) => f.slice(0, -3));
const sizes = {};
// gradient-gl resolves its shaders with import.meta.url / dynamic import(),
// which an IIFE bundle breaks, so it ships as native ESM with code splitting.
const ESM = new Set(['l4-gradient-gl']);
for (const name of names) {
  if (ESM.has(name)) {
    await build({ entryPoints: [`src/variants/${name}.js`], outdir: 'dist', bundle: true, minify: true, format: 'esm', splitting: true, target: 'es2020', logLevel: 'error', chunkNames: '[name]-[hash]' });
    writeFileSync(`dist/${name}.html`, shell.replaceAll('{{NAME}}', name).replace('<script src=', '<script type="module" src='));
    // Count what the page downloads: the entry plus the one shader chunk its seed uses (c1).
    const files = readdirSync('dist').filter((f) => f === `${name}.js` || f.startsWith('c1.glsl-') || /^chunk-/.test(f));
    const bufs = files.map((f) => readFileSync(`dist/${f}`));
    sizes[name] = { raw: bufs.reduce((a, b) => a + b.length, 0), gzip: bufs.reduce((a, b) => a + gzipSync(b).length, 0) };
  } else {
    await build({ entryPoints: [`src/variants/${name}.js`], outfile: `dist/${name}.js`, bundle: true, minify: true, format: 'iife', target: 'es2020', logLevel: 'error' });
    writeFileSync(`dist/${name}.html`, shell.replaceAll('{{NAME}}', name));
    const js = readFileSync(`dist/${name}.js`);
    sizes[name] = { raw: js.length, gzip: gzipSync(js).length };
  }
}
writeFileSync('dist/sizes.json', JSON.stringify(sizes, null, 2));
console.table(Object.fromEntries(Object.entries(sizes).map(([k, v]) => [k, { rawKB: +(v.raw / 1024).toFixed(1), gzipKB: +(v.gzip / 1024).toFixed(1) }])));
