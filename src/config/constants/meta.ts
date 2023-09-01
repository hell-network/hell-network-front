import { PageMeta } from './types';

export const DEFAULT_META: PageMeta = {
  title: 'title',
  description: 'description.',
  image: '',
};

export const getCustomMeta = (path: string): PageMeta => {
  const basePath = path;

  switch (basePath) {
    case '/test':
      return {
        title: ``,
        description: '',
        image: '',
      };
    default:
      return null;
  }
};
