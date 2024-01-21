export const secondToHours = (value: number) => value * (1 / 3600);
export const formatTime = (seconds: number) => {
  const days = Math.floor(seconds / (24 * 60 * 60));
  const hours = Math.floor((seconds % (24 * 60 * 60)) / (60 * 60));

  const formattedTime = `${days} days ${hours} hours`;
  return formattedTime;
};
export const capitalize = (text: string) => {
  if (!text) return '';
  return text
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

const languagesSet = new Set<string>([
  'C',
  'C++',
  'JAVA',
  'PYTHON',
  'JAVASCRIPT',
  'HTML',
  'CSS',
  'RUBY',
  'SWIFT',
  'KOTLIN',
  'GO',
  'TYPESCRIPT',
  'PHP',
  'MATLAB',
  'PERL',
  'R',
  'SHELL',
  'SQL',
  'RUST',
  'LUA',
]);

export const isProgrammingLanguage = (lang: string) => {
  return lang ? languagesSet.has(lang.toUpperCase()) : false;
};
