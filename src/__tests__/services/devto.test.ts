import { normalizeTags } from '../../services/devto';
import type { DevtoArticleIndex, DevtoArticleFull } from '../../services/devto';

describe('devto service', () => {
  describe('normalizeTags', () => {
    it('should return tag_list when it is an array (index endpoint)', () => {
      const article = {
        tag_list: ['react', 'typescript'],
        tags: 'react, typescript',
      } as DevtoArticleIndex;
      expect(normalizeTags(article)).toEqual(['react', 'typescript']);
    });

    it('should split tag_list when it is a comma-separated string (full endpoint)', () => {
      const article = {
        tag_list: 'react, typescript, nextjs' as any,
        tags: ['react', 'typescript', 'nextjs'],
      } as DevtoArticleFull;
      expect(normalizeTags(article)).toEqual([
        'react',
        'typescript',
        'nextjs',
      ]);
    });

    it('should fall back to tags array if tag_list is empty', () => {
      const article = {
        tag_list: [] as string[],
        tags: ['fallback-tag'],
      } as unknown as DevtoArticleIndex;
      // tag_list is an array (empty), so returns empty
      expect(normalizeTags(article)).toEqual([]);
    });

    it('should fall back to tags string if tag_list is falsy', () => {
      const article = {
        tag_list: null as any,
        tags: 'java, spring',
      } as unknown as DevtoArticleIndex;
      expect(normalizeTags(article)).toEqual(['java', 'spring']);
    });

    it('should return empty array when no tags available', () => {
      const article = {
        tag_list: null as any,
        tags: null as any,
      } as unknown as DevtoArticleIndex;
      expect(normalizeTags(article)).toEqual([]);
    });

    it('should handle empty string tag_list', () => {
      const article = {
        tag_list: '' as any,
        tags: ['backup'],
      } as unknown as DevtoArticleFull;
      expect(normalizeTags(article)).toEqual(['backup']);
    });

    it('should filter out empty strings from split', () => {
      const article = {
        tag_list: 'react,,typescript,' as any,
        tags: [],
      } as unknown as DevtoArticleFull;
      expect(normalizeTags(article)).toEqual(['react', 'typescript']);
    });
  });
});
