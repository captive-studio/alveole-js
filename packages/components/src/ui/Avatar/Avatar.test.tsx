import { renderNative } from '@/__tests__/helpers/renderNative';
import { Avatar } from './Avatar';

const SRC = 'https://avatars.githubusercontent.com/u/1';

describe('Avatar', () => {
  // Régression : Tamagui lit une taille numérique qui existe comme clé de jeton ($0 à $20)
  // comme ce jeton. `xs` valait 20, soit le jeton $20 (284 px) : la photo débordait et le
  // cercle n'en montrait qu'un coin.
  it.each([
    ['xs', 20],
    ['sm', 24],
    ['md', 32],
    ['lg', 40],
    ['xl', 64],
  ] as const)('dimensionne la photo en %s à %i px', async (size, px) => {
    const { toJSON, root } = await renderNative(<Avatar size={size} src={SRC} fallbackText="Jean Pierre" />);

    expect(toJSON()).toMatchObject({ props: { style: { width: px, height: px } } });
    const [image] = root?.queryAll(instance => instance.type === 'Image') ?? [];
    expect(image?.props.style).toMatchObject({ width: px, height: px });
  });
});
