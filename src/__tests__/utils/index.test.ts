import {
  capitalize,
  formatTime,
  getContrastColor,
  getEnvProperties,
  getLanguageColor,
  getPlatformColor,
  isProgrammingLanguage,
  mapLocaleToMoment,
  secondToHours,
} from '../../utils';

describe('Utils', () => {
  describe('secondToHours', () => {
    it('should convert seconds to hours correctly', () => {
      expect(secondToHours(3600)).toBe(1);
      expect(secondToHours(7200)).toBe(2);
      expect(secondToHours(0)).toBe(0);
    });

    it('should handle fractional hours', () => {
      expect(secondToHours(1800)).toBe(0.5);
    });
  });

  describe('formatTime', () => {
    it('should format seconds into days and hours correctly', () => {
      expect(formatTime(3600)).toBe('0 days 1 hours');
      expect(formatTime(86400)).toBe('1 days 0 hours');
      expect(formatTime(90000)).toBe('1 days 1 hours');
    });

    it('should handle zero seconds', () => {
      expect(formatTime(0)).toBe('0 days 0 hours');
    });
  });

  describe('capitalize', () => {
    it('should capitalize the first letter of each word', () => {
      expect(capitalize('hello world')).toBe('Hello World');
      expect(capitalize('typescript is awesome')).toBe('Typescript Is Awesome');
    });

    it('should return an empty string if input is empty', () => {
      expect(capitalize('')).toBe('');
    });

    it('should handle single word', () => {
      expect(capitalize('hello')).toBe('Hello');
    });
  });

  describe('getLanguageColor', () => {
    it('should return the correct color for a given language', () => {
      expect(getLanguageColor('TypeScript')).toBe('#2b7489');
      expect(getLanguageColor('JavaScript')).toBe('#f1e05a');
      expect(getLanguageColor('Python')).toBe('#3572A5');
      expect(getLanguageColor('Java')).toBe('#b07219');
      expect(getLanguageColor('Rust')).toBe('#dea584');
    });

    it('should return default color for unknown language', () => {
      expect(getLanguageColor('NonExistent')).toBe('#000000');
    });

    it('should be case-insensitive', () => {
      expect(getLanguageColor('typescript')).toBe('#2b7489');
      expect(getLanguageColor('TYPESCRIPT')).toBe('#2b7489');
    });
  });

  describe('isProgrammingLanguage', () => {
    it('should return true for valid programming languages', () => {
      expect(isProgrammingLanguage('TypeScript')).toBe(true);
      expect(isProgrammingLanguage('C++')).toBe(true);
      expect(isProgrammingLanguage('Python')).toBe(true);
      expect(isProgrammingLanguage('Rust')).toBe(true);
    });

    it('should return false for invalid languages', () => {
      expect(isProgrammingLanguage('Plain Text')).toBe(false);
      expect(isProgrammingLanguage('')).toBe(false);
    });
  });

  describe('getPlatformColor', () => {
    it('should return the correct color for known platforms', () => {
      expect(getPlatformColor('Alura')).toBe('#5ea3d0');
      expect(getPlatformColor('Udemy')).toBe('#A435F0');
      expect(getPlatformColor('Cisco')).toBe('#049fd9');
    });

    it('should return default color for unknown platform', () => {
      expect(getPlatformColor('Unknown')).toBe('#049fd9');
    });

    it('should be case-insensitive', () => {
      expect(getPlatformColor('alura')).toBe('#5ea3d0');
      expect(getPlatformColor('UDEMY')).toBe('#A435F0');
    });
  });

  describe('getContrastColor', () => {
    it('should return #000 for light backgrounds', () => {
      expect(getContrastColor('#FFFFFF')).toBe('#000');
      expect(getContrastColor('#f1e05a')).toBe('#000');
    });

    it('should return #fff for dark backgrounds', () => {
      expect(getContrastColor('#000000')).toBe('#fff');
      expect(getContrastColor('#2b7489')).toBe('#fff');
    });
  });

  describe('mapLocaleToMoment', () => {
    it('should map known locales correctly', () => {
      expect(mapLocaleToMoment('pt')).toBe('pt-br');
      expect(mapLocaleToMoment('en')).toBe('en');
      expect(mapLocaleToMoment('fr')).toBe('fr');
      expect(mapLocaleToMoment('zh')).toBe('zh-cn');
      expect(mapLocaleToMoment('ar')).toBe('ar-sa');
    });

    it('should default to en for unknown locales', () => {
      expect(mapLocaleToMoment('xx')).toBe('en');
    });

    it('should default to en for undefined', () => {
      expect(mapLocaleToMoment(undefined)).toBe('en');
    });
  });

  describe('getEnvProperties', () => {
    it('should return env properties with defaults', () => {
      const props = getEnvProperties();
      expect(props).toHaveProperty('url');
      expect(props).toHaveProperty('googleAnalytics');
      expect(props).toHaveProperty('devtoUsername');
      expect(props.devtoUsername).toBe('lucasheartcliff');
    });
  });
});
