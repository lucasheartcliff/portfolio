export const secondToHours = (value: number) => value * (1 / 3600);
export const capitalize = (text: string) => {
  if (!text) return '';
  return text
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

