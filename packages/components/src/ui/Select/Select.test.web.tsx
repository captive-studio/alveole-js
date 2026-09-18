import { fireEvent, renderHookOnDesktop, renderOnDesktop, renderWeb, screen } from '@/__tests__/helpers/renderWeb';
import { Button } from '../Button';
import { Select } from './Select';
import { useStyles as useSelectStyles } from './Select.styles';
import type { SelectOption } from './Select.types';
import { selectControlStyle, type SelectControlState } from './selectControlStyle';

const OPTIONS: SelectOption[] = [
  { value: 'a', label: 'Option A' },
  { value: 'b', label: 'Option B' },
  { value: 'c', label: 'Option C' },
];

/** react-select n'ouvre pas son menu au clic : il écoute le clavier sur le combobox. */
const openMenu = () => fireEvent.keyDown(screen.getByRole('combobox'), { key: 'ArrowDown' });

test('donne au champ le nom accessible de son étiquette', () => {
  renderWeb(<Select label="Pays" value={null} options={[{ value: 'fr', label: 'France' }]} />);

  expect(screen.getByRole('combobox', { name: 'Pays' })).toBeTruthy();
});

test('interdit la saisie tant que la recherche n’est pas demandée', () => {
  renderWeb(<Select label="Pays" value={null} options={OPTIONS} />);

  expect(screen.getByRole('combobox').getAttribute('aria-readonly')).toBe('true');
});

// Le bouton est passe a `control('md').height` (32px) ; le champ etait reste a 42px en dur.
// Voir plan harmonise/champs-boutons.
test('aligne la hauteur du champ sur celle du bouton md', () => {
  renderOnDesktop(
    <>
      <Select label="Pays" value={null} options={OPTIONS} />
      <Button variant="primary" title="Enregistrer" />
    </>,
  );

  const champ = screen.getByRole('combobox').closest('div[class*="control"]')!;
  const bouton = screen.getByRole('button');

  expect(getComputedStyle(champ).minHeight).toBe(getComputedStyle(bouton).height);
});

test('autorise la saisie quand la recherche est demandée', () => {
  renderWeb(<Select label="Pays" value={null} options={OPTIONS} searchable />);

  expect(screen.getByRole('combobox').getAttribute('aria-readonly')).toBeNull();
});

test('remonte la valeur choisie en mono-sélection', () => {
  const onChange = jest.fn();
  renderWeb(<Select label="Pays" value={null} options={OPTIONS} onChange={onChange} />);

  openMenu();
  fireEvent.click(screen.getByText('Option C'));

  expect(onChange).toHaveBeenCalledWith('c');
});

// La croix d'effacement est `aria-hidden` : au clavier, react-select efface la
// sélection au Retour arrière.
test('remonte null quand la sélection mono est effacée', () => {
  const onChange = jest.fn();
  renderWeb(<Select label="Pays" value="a" options={OPTIONS} clearable onChange={onChange} />);

  fireEvent.keyDown(screen.getByRole('combobox'), { key: 'Backspace' });

  expect(onChange).toHaveBeenCalledWith(null);
});

test('remonte un tableau de valeurs en multi-sélection', () => {
  const onChange = jest.fn();
  renderWeb(<Select label="Pays" multiple value={['a']} options={OPTIONS} onChange={onChange} />);

  openMenu();
  fireEvent.click(screen.getByText('Option B'));

  expect(onChange).toHaveBeenCalledWith(['a', 'b']);
});

test('rend une puce retirable par valeur en multi-sélection', () => {
  const onChange = jest.fn();
  renderWeb(<Select label="Pays" multiple value={['a', 'c']} options={OPTIONS} onChange={onChange} />);

  fireEvent.click(screen.getByLabelText('Retirer Option A'));

  expect(onChange).toHaveBeenCalledWith(['c']);
});

test('ne filtre pas localement quand le filtrage local est coupé', () => {
  renderWeb(<Select label="Pays" value={null} options={OPTIONS} searchable localFilter={false} />);

  fireEvent.change(screen.getByRole('combobox'), { target: { value: 'aucune correspondance' } });

  expect(screen.getByText('Option A')).toBeTruthy();
});

test('propose la création d’une option absente de la liste', () => {
  const onCreateOption = jest.fn();
  renderWeb(
    <Select label="Pays" value={null} options={OPTIONS} searchable creatable onCreateOption={onCreateOption} />,
  );

  fireEvent.change(screen.getByRole('combobox'), { target: { value: 'Andorre' } });
  fireEvent.click(screen.getByText('Ajouter « Andorre »'));

  expect(onCreateOption).toHaveBeenCalledWith('Andorre');
});

// react-select compose ses styles lui-meme : la bordure se lit sur le `control` qu'il rend,
// et non sur une classe du kit. C'est l'element qui contient le combobox.
const cadre = () => screen.getByRole('combobox').closest('div[class*="control"]')!;

const styleDuCadre = () => {
  const s = window.getComputedStyle(cadre());
  return { couleur: s.borderTopColor, epaisseur: s.borderTopWidth };
};

const focaliser = () => fireEvent.focus(screen.getByRole('combobox'));
const flouter = () => fireEvent.blur(screen.getByRole('combobox'));

test('colore la bordure avec le token de focus, sans l epaissir', () => {
  renderWeb(<Select label="Pays" value={null} options={OPTIONS} />);

  focaliser();

  expect(styleDuCadre()).toEqual({ couleur: 'rgb(10, 118, 246)', epaisseur: '1px' });
});

// Pendant que le selecteur est actif, c'est lui qu'il faut pouvoir designer sans ambiguite ;
// le verdict de validation reprend la main a la fermeture.
test('couvre la couleur d erreur tant que le selecteur a le focus, puis la restitue', () => {
  renderWeb(<Select label="Pays" value={null} options={OPTIONS} error="Champ requis" />);
  const erreur = styleDuCadre().couleur;

  focaliser();
  const pendantLeFocus = styleDuCadre().couleur;
  flouter();

  expect({ erreur, pendantLeFocus, apresLeBlur: styleDuCadre().couleur }).toEqual({
    erreur,
    pendantLeFocus: 'rgb(10, 118, 246)',
    apresLeBlur: erreur,
  });
});

test('rend la couleur de succes au selecteur quand il perd le focus', () => {
  renderWeb(<Select label="Pays" value={null} options={OPTIONS} success="Enregistré" />);
  const succes = styleDuCadre().couleur;

  focaliser();
  flouter();

  expect(styleDuCadre().couleur).toBe(succes);
});

// Un selecteur desactive garde son apparence hors d'usage : react-select ne lui donne pas
// le focus, et la bordure ne doit pas s'allumer meme si l'evenement survenait.
test('ne colore pas la bordure d un selecteur desactive', () => {
  renderWeb(<Select label="Pays" value={null} options={OPTIONS} disabled />);
  const desactive = styleDuCadre().couleur;

  focaliser();

  expect(styleDuCadre().couleur).toBe(desactive);
});

// jsdom ne resout ni les pseudo-classes emises par react-select ni le raccourci `outline`
// de ses classes : un survol declenche dans le DOM ne change rien au style calcule, et un
// contour remis reste invisible a `getComputedStyle`. Un test de rendu passerait donc quoi
// qu'il arrive. Ces deux regles se verifient sur la donnee que la bibliotheque recoit.
describe('le cadre remis a react-select', () => {
  const cadreCalcule = (state: Partial<SelectControlState>) =>
    renderHookOnDesktop(() => selectControlStyle(useSelectStyles(), { isDisabled: false, isFocused: false, ...state }))
      .result.current;

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

// `Autocomplete`, `AutocompleteChip` et `AutocompleteAddress` ont disparu au profit de
// `Select` (ADR 0007). Leurs trois variantes survivent comme prereglages, et la seule qui
// touche un point d'integration distinct est l'adresse : elle active `creatable`, qui passe
// par `CreatableSelect` et non par `ReactSelect`. Le reste partage le meme cadre.
describe('les prereglages hérités d Autocomplete', () => {
  const prereglages = {
    simple: <Select label="Pays" value={null} options={OPTIONS} searchable />,
    multiple: <Select label="Pays" multiple value={[]} options={OPTIONS} searchable />,
    adresse: <Select label="Adresse" value={null} options={OPTIONS} searchable localFilter={false} creatable />,
  };

  it.each(Object.entries(prereglages))('colore la bordure du prereglage %s au focus', (_nom, element) => {
    renderWeb(element);
    const repos = styleDuCadre().couleur;

    focaliser();

    expect({ repos, focus: styleDuCadre() }).toEqual({
      repos,
      focus: { couleur: 'rgb(10, 118, 246)', epaisseur: '1px' },
    });
  });

  it.each(Object.entries(prereglages))('rend la couleur de repos au prereglage %s au blur', (_nom, element) => {
    renderWeb(element);
    const repos = styleDuCadre().couleur;

    focaliser();
    flouter();

    expect(styleDuCadre().couleur).toBe(repos);
  });
});
