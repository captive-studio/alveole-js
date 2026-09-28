import { elementDuType } from '@/__tests__/helpers/elementDuType';
import { renderWeb } from '@/__tests__/helpers/renderWeb';
import { Avatar } from './Avatar';

// Régression vue sur le web : en `xs`, la photo s'étalait sur 284 px (le jeton de taille $20)
// et le cercle de 20 px n'en montrait qu'un coin, un rond noir.
it.each([
  ['xs', 20],
  ['sm', 24],
] as const)('dimensionne la photo en %s à %i px sur le web', async (size, px) => {
  const { container } = await renderWeb(<Avatar size={size} src="https://a/1" fallbackText="Jean Pierre" />);

  // react-native-web enveloppe <img> (toujours à 100 %) dans le bloc qui porte la taille.
  const image = elementDuType(container.querySelector('img')?.parentElement, HTMLElement);
  const style = getComputedStyle(image);
  expect([style.width, style.height]).toEqual([`${px}px`, `${px}px`]);
});
