import { renderHookOnDesktop } from '@/__tests__/helpers/renderWeb';
import { useStyles } from './Select.styles';
import { selectControlStyle, type SelectControlState } from './selectControlStyle';

// jsdom ne resout ni les pseudo-classes emises par react-select ni le raccourci `outline`
// de ses classes : un survol declenche dans le DOM ne change rien au style calcule, et un
// contour remis reste invisible a `getComputedStyle`. Un test de rendu passerait donc quoi
// qu'il arrive. Ces regles se verifient sur la donnee que la bibliotheque recoit ; la
// bordure rendue, elle, dans le navigateur (apps/docs/e2e/focus.spec.ts, select.spec.ts).
const styles = () => renderHookOnDesktop(() => useStyles()).result.current;

const cadreCalcule = (state: Partial<SelectControlState>) =>
  renderHookOnDesktop(() => selectControlStyle(useStyles(), { isDisabled: false, isFocused: false, ...state })).result
    .current;

it('n entoure le selecteur actif d aucun contour ni ombre', () => {
  const actif = cadreCalcule({ isFocused: true });

  expect({ outline: actif.outline, ombre: actif.boxShadow }).toEqual({ outline: 'none', ombre: 'none' });
});

it('reprend la couleur de l etat au survol, au lieu de reposer celle du repos', () => {
  const actif = cadreCalcule({ isFocused: true });

  expect(actif[':hover'].borderColor).toBe(actif.borderColor);
});

it('garde la couleur d erreur au survol d un selecteur au repos', () => {
  const enErreur = cadreCalcule({ error: 'Champ requis' });

  expect(enErreur[':hover'].borderColor).toBe(enErreur.borderColor);
});

// Pendant que le selecteur est actif, c'est lui qu'il faut pouvoir designer sans ambiguite ;
// le verdict de validation reprend la main au blur.
it('couvre la couleur d erreur tant que le selecteur a le focus', () => {
  expect(cadreCalcule({ isFocused: true, error: 'Champ requis' }).borderColor).toBe(styles().inputFocused.borderColor);
});

// react-select ne donne pas le focus a un selecteur desactive, et la bordure ne doit pas
// s'allumer meme si l'etat survenait.
it('ne colore pas la bordure d un selecteur desactive', () => {
  expect(cadreCalcule({ isFocused: true, isDisabled: true }).borderColor).toBe(styles().inputDisabled.borderColor);
});
