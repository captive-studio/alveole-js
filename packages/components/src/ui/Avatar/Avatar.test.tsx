import { renderNative } from '@/__tests__/helpers/renderNative';
import { ReactTestRendererJSON } from 'react-test-renderer';
import { Avatar } from './Avatar';

const SRC = 'https://avatars.githubusercontent.com/u/1';

type Noeud = ReactTestRendererJSON | string | null;

const trouverImage = (noeud: Noeud): ReactTestRendererJSON | undefined => {
  if (!noeud || typeof noeud === 'string') return undefined;
  if (noeud.type === 'Image') return noeud;
  return (noeud.children ?? []).map(trouverImage).find(Boolean);
};

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
    const { toJSON } = await renderNative(<Avatar size={size} src={SRC} fallbackText="Jean Pierre" />);

    const cadre = toJSON() as ReactTestRendererJSON;
    expect(cadre.props.style).toMatchObject({ width: px, height: px });
    expect(trouverImage(cadre)?.props.style).toMatchObject({ width: px, height: px });
  });
});
