import { elementDuType } from '@/__tests__/helpers/elementDuType';
import { renderOnDesktop } from '@/__tests__/helpers/renderWeb';
import { Box } from './Box';

// Les tests web et les consommateurs ciblent les elements par leur nom (`sidebar-item`,
// `data-table-cell`...) : le nom de l'element rendu fait partie de l'API de Box.
test("rend un element nomme d'apres son tag", () => {
  const { container } = renderOnDesktop(<Box tag="x" />);

  expect(container.querySelector('x')).not.toBeNull();
});

test('rend un element box par defaut', () => {
  const { container } = renderOnDesktop(<Box />);

  expect(container.querySelector('box')).not.toBeNull();
});

// ADR 0031 : Box laisse passer les clauses de Tamagui v3 telles quelles. Tamagui les rend en
// classe atomique ; une valeur restee inline ne porterait aucun etat.
test('rend une clause de survol en classe Tamagui, pas en style inline', () => {
  const { container } = renderOnDesktop(<Box backgroundColor="red hover:blue" />);
  const box = elementDuType(container.querySelector('box'), HTMLElement);

  expect(box.className).toMatch(/_b-/);
  expect(box.style.backgroundColor).toBe('');
});

// Box ne se limite pas a ses props de style propres : toute prop de style Tamagui passe.
test('laisse passer une prop de style Tamagui que Box ne declare pas', () => {
  const { container } = renderOnDesktop(<Box cursor="hover:pointer" />);

  expect(container.querySelector('box')?.className).toMatch(/_c-/);
});

test('rend une clause en objet type en classe Tamagui', () => {
  const { container } = renderOnDesktop(<Box backgroundColor={{ default: 'red', hover: 'var(--x)' }} />);
  const box = elementDuType(container.querySelector('box'), HTMLElement);

  expect(box.className).toMatch(/_b-/);
  expect(box.style.backgroundColor).toBe('');
});

// Tamagui v3 rend `flex: 1` en `1 1 0px` sur le web, là où react-native-web posait `1 1 0%` :
// dans un parent de hauteur indéfinie, la base en pixels écrase la boîte à zéro (les onglets du
// catalogue disparaissaient), la base en pourcentage lui rend la hauteur de son contenu.
test('garde à flex la base en pourcentage de react-native-web', () => {
  const { container } = renderOnDesktop(<Box style={{ flex: 1 }} />);

  expect(getComputedStyle(container.querySelector('box')!).flexBasis).toBe('0%');
});

// Box posait ses raccourcis d'espacement meme vides, et Tamagui v3 laisse un `p` ou un `gap` a
// `undefined` ecraser le style : les marges des pages du catalogue tombaient a zero.
test('applique les espacements de son style, meme en tableau', () => {
  const { container } = renderOnDesktop(<Box style={[{ paddingLeft: 48 }, { gap: 24, marginTop: 40 }]} />);

  const { paddingLeft, gap, marginTop } = getComputedStyle(container.querySelector('box')!);
  expect({ paddingLeft, gap, marginTop }).toEqual({ paddingLeft: '48px', gap: '24px', marginTop: '40px' });
});

// Un style en tableau imbrique traverse Tamagui v3 jusqu'au DOM, qui refuse un tableau comme
// style : la page entiere tombait au navigateur. jsdom, lui, perd seulement le style de l'appelant.
test('garde le style de l appelant avec la correction de flex', () => {
  const { container } = renderOnDesktop(<Box style={[{ flex: 1 }, { minHeight: 0 }]} />);

  const { minHeight, flexBasis } = getComputedStyle(container.querySelector('box')!);
  expect({ minHeight, flexBasis }).toEqual({ minHeight: '0', flexBasis: '0%' });
});
