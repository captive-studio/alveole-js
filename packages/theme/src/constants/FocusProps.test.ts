import { FOCUS_ATTRIBUTE, FOCUS_DATA_SET_KEY } from './Focus';
import { focusRingProps } from './FocusProps';

jest.mock('react-native', () => ({ Platform: { OS: 'web' } }));

// `dataSet` est une extension de react-native-web : elle rend des attributs `data-*` sur le
// web et n'existe pas dans les types de `PressableProps` de react-native. Sans ce point
// d'entree unique, chaque composant qui demande la bague porterait son propre cast et
// recopierait le nom de la cle a la main.
it('demande la bague par la cle que la regle CSS cible', () => {
  expect(focusRingProps().dataSet).toEqual({ [FOCUS_DATA_SET_KEY]: 'ring' });
});

// Le nom de l'attribut CSS et celui de la prop react-native-web sont le meme nom ecrit
// autrement. Les derier l'un de l'autre est ce qui empeche qu'une regle cible un attribut
// que plus aucun composant ne pose.
it('derive l attribut CSS de la cle de la prop', () => {
  expect(FOCUS_ATTRIBUTE).toBe('data-alveole-focus');
  expect(FOCUS_DATA_SET_KEY).toBe('alveoleFocus');
});
