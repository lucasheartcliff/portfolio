/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');

const profile = require('../public/assets/jsons/profile.json');

const SITE_URL =
  process.env.NEXT_PUBLIC_URL || 'https://lucasheartcliff.com.br';

function buildLlmsTxt() {
  const name = `${profile.firstName} ${profile.lastName}`.trim();
  const lines = [
    `# ${name}`,
    '',
    `> ${profile.introductionBio}`,
    '',
    '## Skills',
    '',
    ...(profile.skills || []).map((skill) => `- ${skill}`),
    '',
    '## Links',
    '',
    `- [Portfolio (English)](${SITE_URL}/en/)`,
    `- [Portfolio (Portuguese)](${SITE_URL}/pt/)`,
    `- [GitHub](https://github.com/${profile.username})`,
    `- [LinkedIn](https://linkedin.com/in/${profile.username})`,
    `- [Dev.to articles](https://dev.to/${profile.username})`,
    '',
    '## Contact',
    '',
    `- Email: ${profile.email}`,
  ];
  return `${lines.join('\n')}\n`;
}

function main() {
  const outPath = path.join(__dirname, '..', 'public', 'llms.txt');
  fs.writeFileSync(outPath, buildLlmsTxt());
  console.log(`Generated ${outPath}`);
}

main();
