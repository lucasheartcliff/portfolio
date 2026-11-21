import fs from 'fs';
import path from 'path';

const root = path.resolve(__dirname, '../../..');
const css = fs
  .readFileSync(path.join(root, 'src/styles/global.css'), 'utf8')
  .replace(/\/\*[\s\S]*?\*\//g, '');
const pkg = JSON.parse(
  fs.readFileSync(path.join(root, 'package.json'), 'utf8')
) as { browserslist: string[] };

/** Returns the declaration block of the first rule whose selector matches. */
const rule = (selector: string, source = css): string => {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const match = new RegExp(`(^|\\n)${escaped}\\s*\\{([^}]*)\\}`).exec(source);
  if (!match) throw new Error(`rule ${selector} not found`);
  return match[2]!;
};

describe('glass surfaces (Firefox compositing fix, #77)', () => {
  it('.glass-card does not use backdrop-filter', () => {
    expect(rule('.glass-card')).not.toMatch(/backdrop-filter/);
  });

  it('.glass-card keeps a static translucent fill', () => {
    expect(rule('.glass-card')).toMatch(/background-color:\s*color-mix/);
  });

  it('.glass-nav keeps its real backdrop blur', () => {
    expect(rule('.glass-nav')).toMatch(/backdrop-filter:\s*blur/);
  });

  it('orb keyframes only translate, never scale', () => {
    ['orbA', 'orbB', 'orbC'].forEach((name) => {
      const block = new RegExp(
        `@keyframes ${name}\\s*\\{[\\s\\S]*?\\n\\}`
      ).exec(css);
      expect(block).not.toBeNull();
      expect(block![0]).toMatch(/translate\(/);
      expect(block![0]).not.toMatch(/scale\(/);
    });
  });

  it('prefers-reduced-motion drops the remaining backdrop-filters', () => {
    const media = css.slice(css.indexOf('@media (prefers-reduced-motion'));
    expect(media).toMatch(/\.glass-nav/);
    expect(media).toMatch(/\.glass-btn/);
    expect(media).toMatch(/backdrop-filter:\s*none/);
  });
});

describe('browserslist', () => {
  it('no longer excludes Firefox or Safari', () => {
    const joined = pkg.browserslist.join('|');
    expect(joined).not.toMatch(/firefox|and_ff|safari|ios_saf/);
  });
});

describe('removed decorative images', () => {
  it('are not re-added to public/assets/images', () => {
    const removed = [
      'profile.jpeg',
      'cover.png',
      'cover-dark.png',
      'languages.png',
      'languages-dark.png',
      'experience.png',
      'experience-dark.png',
      'experience-old.png',
      'education.png',
      'education-dark.png',
      'certificate.png',
      'certificate-dark.png',
    ];
    const dir = path.join(root, 'public/assets/images');
    const files = fs.existsSync(dir) ? fs.readdirSync(dir) : [];
    expect(files.filter((f) => removed.includes(f))).toEqual([]);
  });
});
