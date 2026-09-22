import { LINK_ATTRIBUTE } from '../constants/Link';
import { generateLinkCSS } from './linkCSS';

// Sans écart, le navigateur colle le soulignement aux lettres. `text-underline-offset` n'a pas
// d'équivalent React Native : Tamagui et react-native-web le retirent de tout `style`, il ne
// peut donc passer que par une feuille de style.
it('écarte le soulignement du texte des liens qui portent la marque', () => {
  expect(generateLinkCSS()).toContain(`[${LINK_ATTRIBUTE}] { text-underline-offset: 0.2em; }`);
});
