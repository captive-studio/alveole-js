import { fireEvent, renderHookOnDesktop, renderWeb, screen } from '@/__tests__/helpers/renderWeb';
import { SelectMultiple } from './SelectMultiple';
import { useStyles } from './SelectMultiple.styles';
import { selectMultipleControlStyle, type SelectMultipleControlState } from './selectMultipleControlStyle';

const OPTIONS = [
  { value: 'fr', label: 'Français' },
  { value: 'en', label: 'Anglais' },
  { value: 'es', label: 'Espagnol' },
];

test('donne au champ le nom accessible de son étiquette', () => {
  renderWeb(<SelectMultiple label="Langues" options={[{ value: 'fr', label: 'Français' }]} />);

  expect(screen.getByRole('combobox', { name: 'Langues' })).toBeTruthy();
});

// `control.minHeight` (spacing('4W')=32) et `valueContainer.minHeight` (38, en dur)
// desaccordaient deja le champ avec lui-meme : le conteneur interieur forcait le cadre
// au-dela de sa propre hauteur nominale. Voir plan harmonise/champs-boutons.
test('aligne le conteneur de valeurs sur la hauteur du cadre', () => {
  renderWeb(<SelectMultiple label="Langues" options={OPTIONS} value={[]} />);

  const cadreEl = document.querySelector('div[class*="control"]')!;
  const conteneurDeValeurs = cadreEl.firstElementChild as Element;

  expect(getComputedStyle(conteneurDeValeurs).minHeight).toBe(getComputedStyle(cadreEl).minHeight);
});

// Pendant horizontal du test ci-dessus : la hauteur suivait deja l'echelle de controle,
// le retrait restait un litteral d'espacement.
test('aligne le retrait horizontal des valeurs sur l echelle de controle', () => {
  const { result } = renderHookOnDesktop(() => useStyles());

  expect(result.current.valueContainer.paddingLeft).toBe(12);
});

// react-select compose ses styles lui-meme : la bordure se lit sur le `control` qu'il rend,
// et non sur une classe du kit. Le cadre se trouve par sa classe, et non depuis le champ :
// un selecteur desactive ne rend aucun combobox.
const cadre = () => document.querySelector(`div[class*="control"]`)!;

const couleurDuCadre = () => window.getComputedStyle(cadre()).borderTopColor;

const focaliser = () => fireEvent.focus(screen.getByRole('combobox'));
const flouter = () => fireEvent.blur(screen.getByRole('combobox'));

test('colore la bordure avec le token de focus, sans l epaissir', () => {
  renderWeb(<SelectMultiple label="Langues" options={OPTIONS} value={[]} />);

  focaliser();

  const style = window.getComputedStyle(cadre());
  expect({ couleur: style.borderTopColor, epaisseur: style.borderTopWidth }).toEqual({
    couleur: 'rgb(10, 118, 246)',
    epaisseur: '1px',
  });
});

// Pendant que le selecteur est actif, c'est lui qu'il faut pouvoir designer sans ambiguite ;
// le verdict de validation reprend la main au blur.
test('couvre la couleur d erreur tant que le selecteur a le focus, puis la restitue', () => {
  renderWeb(<SelectMultiple label="Langues" options={OPTIONS} value={[]} error="Champ requis" />);
  const erreur = couleurDuCadre();

  focaliser();
  const pendantLeFocus = couleurDuCadre();
  flouter();

  expect({ erreur, pendantLeFocus, apresLeBlur: couleurDuCadre() }).toEqual({
    erreur,
    pendantLeFocus: 'rgb(10, 118, 246)',
    apresLeBlur: erreur,
  });
});

test('rend la couleur de succes au selecteur quand il perd le focus', () => {
  renderWeb(<SelectMultiple label="Langues" options={OPTIONS} value={[]} success="Enregistré" />);
  const succes = couleurDuCadre();

  focaliser();
  flouter();

  expect(couleurDuCadre()).toBe(succes);
});

// La legende sous le champ disait seule l'erreur : le cadre la porte maintenant aussi.
test('colore la bordure du selecteur en erreur', () => {
  const { unmount } = renderWeb(<SelectMultiple label="Langues" options={OPTIONS} value={[]} />);
  const repos = couleurDuCadre();
  unmount();

  renderWeb(<SelectMultiple label="Langues" options={OPTIONS} value={[]} error="Champ requis" />);

  expect(couleurDuCadre()).not.toBe(repos);
});

// Desactive, react-select ne rend meme pas de champ focusable : le cadre garde en toutes
// circonstances son apparence hors d'usage.
test('ne colore pas la bordure d un selecteur desactive', () => {
  renderWeb(<SelectMultiple label="Langues" options={OPTIONS} value={[]} disabled />);
  const desactive = couleurDuCadre();

  fireEvent.focus(cadre());

  expect(couleurDuCadre()).toBe(desactive);
});

// La bordure ne doit rien changer a ce que le selecteur fait : la selection et la
// suppression de plusieurs valeurs passent par les memes chemins qu'avant.
test('remonte les valeurs ajoutees puis retirees', () => {
  const onChange = jest.fn();
  renderWeb(<SelectMultiple label="Langues" options={OPTIONS} value={['fr']} onChange={onChange} />);

  fireEvent.keyDown(screen.getByRole('combobox'), { key: 'ArrowDown' });
  fireEvent.click(screen.getByText('Anglais'));

  expect(onChange).toHaveBeenCalledWith(['fr', 'en']);
});

// jsdom ne resout ni les pseudo-classes emises par react-select ni le raccourci `outline`
// de ses classes : un survol declenche dans le DOM ne change rien au style calcule, et un
// contour remis reste invisible a `getComputedStyle`. Un test de rendu passerait donc quoi
// qu'il arrive. Ces deux regles se verifient sur la donnee que la bibliotheque recoit.
describe('le cadre remis a react-select', () => {
  const cadreCalcule = (state: Partial<SelectMultipleControlState>) =>
    renderHookOnDesktop(() =>
      selectMultipleControlStyle(useStyles(), { isDisabled: false, isFocused: false, ...state }),
    ).result.current;

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
});

test('utilise le rayon de bordure de l echelle du theme sur le champ desactive', () => {
  const { result } = renderHookOnDesktop(() => useStyles());

  expect(result.current.inputDisabled.borderRadius).toBe('var(--radius-md)');
});
