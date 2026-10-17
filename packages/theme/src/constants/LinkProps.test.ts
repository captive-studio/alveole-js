import { FOCUS_ATTRIBUTE } from './Focus';
import { LINK_ATTRIBUTE } from './Link';
import { linkProps } from './LinkProps';

jest.mock('react-native', () => ({ Platform: { OS: 'web' } }));

// Tamagui v2 ne traduit plus `dataSet` : un lien rendu par Typography doit recevoir ses deux
// marques en attributs directs, sans que l'une n'ecrase l'autre.
it('pose la marque de lien et la bague de focus en attributs directs', () => {
  const props = linkProps();

  expect([props[LINK_ATTRIBUTE], props[FOCUS_ATTRIBUTE]]).toEqual(['text', 'ring']);
});
