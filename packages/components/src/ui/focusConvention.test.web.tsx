import { act, renderWeb, screen } from '@/__tests__/helpers/renderWeb';
import { focusBorder } from '@alveole/theme';
import { Button } from './Button';
import { DateInput } from './DateInput';
import { DurationInput } from './DurationInput';
import { EmailField } from './EmailField';
import { NumberField } from './NumberField';
import { OtpField } from './OtpField';
import { PasswordField } from './PasswordField';
import { PhoneField } from './PhoneField';
import { PriceInput } from './PriceInput';
import { Select } from './Select';
import { SelectMultiple } from './SelectMultiple';
import { TextareaField } from './TextareaField';
import { TextField } from './TextField';
import { TimeInput } from './TimeInput';

/**
 * Le point de convergence de l'ADR 0012 : un seul test qui demande a chaque champ et a
 * chaque selecteur du kit la meme chose, plutot que de faire confiance a autant de fiches.
 *
 * Chaque famille a son cadre et sa facon de prendre le focus — un `input` sous un `Box`,
 * un `control` compose par react-select, des cellules empilees par la bibliotheque OTP —
 * d'ou la table. Ce qu'on en attend, lui, est identique, et c'est tout l'objet du ticket.
 */
type Controle = {
  element: React.ReactElement;
  /** Le cadre qui porte la bordure. */
  cadre: () => HTMLElement;
  /** Ce que la plateforme focalise, qui n'est pas toujours le cadre. */
  champ?: () => HTMLElement;
  /** Le champ de prix n'a qu'un trait sous le montant en guise de cadre. */
  cote?: 'Top' | 'Bottom';
};

const parent = (selecteur: string) => () => document.querySelector(selecteur)!.parentElement!;
const controle = (selecteur: string) => () => document.querySelector(selecteur) as HTMLElement;
const reactSelect = () => document.querySelector('div[class*="control"]') as HTMLElement;

const CONTROLES: Record<string, Controle> = {
  TextField: { element: <TextField label="Texte" />, cadre: parent('input'), champ: controle('input') },
  TextareaField: { element: <TextareaField label="Texte" />, cadre: parent('textarea'), champ: controle('textarea') },
  EmailField: { element: <EmailField label="Email" />, cadre: parent('input'), champ: controle('input') },
  PhoneField: { element: <PhoneField label="Téléphone" />, cadre: parent('input'), champ: controle('input') },
  PasswordField: { element: <PasswordField label="Mot de passe" />, cadre: parent('input'), champ: controle('input') },
  DurationInput: { element: <DurationInput label="Durée" />, cadre: parent('input'), champ: controle('input') },
  DateInput: { element: <DateInput label="Date" />, cadre: parent('input'), champ: controle('input') },
  TimeInput: { element: <TimeInput label="Heure" />, cadre: parent('input'), champ: controle('input') },
  NumberField: { element: <NumberField label="Nombre" />, cadre: parent('input'), champ: controle('input') },
  PriceInput: {
    element: <PriceInput value={null} />,
    cadre: () => document.querySelector('.alveole-price-input')!.parentElement!.parentElement!,
    champ: controle('.alveole-price-input'),
    cote: 'Bottom',
  },
  Select: {
    element: <Select label="Pays" value={null} options={[{ value: 'fr', label: 'France' }]} />,
    cadre: reactSelect,
    champ: controle('[role="combobox"]'),
  },
  SelectMultiple: {
    element: <SelectMultiple label="Langues" options={[{ value: 'fr', label: 'Français' }]} value={[]} />,
    cadre: reactSelect,
    champ: controle('[role="combobox"]'),
  },
  OtpField: {
    element: <OtpField label="Code" numberOfDigits={4} autoFocus={false} hideStick />,
    cadre: () => screen.getAllByTestId('otp-input')[0]!,
    champ: () => screen.getByTestId('otp-input-hidden'),
  },
};

const bordure = ({ cadre, cote = 'Top' }: Controle) => {
  const style = window.getComputedStyle(cadre());
  return { couleur: style[`border${cote}Color`], epaisseur: style[`border${cote}Width`] };
};

const focaliser = (controle: Controle) => act(() => (controle.champ ?? controle.cadre)().focus());

const CAS = Object.entries(CONTROLES);

it.each(CAS)('%s colore sa bordure avec le token de focus, sans l epaissir', (_nom, controle) => {
  renderWeb(controle.element);
  const repos = bordure(controle);

  focaliser(controle);

  expect({ repos: repos.couleur, focus: bordure(controle) }).toEqual({
    repos: repos.couleur,
    focus: { couleur: 'rgb(10, 118, 246)', epaisseur: '1px' },
  });
});

// Le focus se lit sur la bordure du cadre, pas autour de lui : c'est le double contour que
// l'ADR 0012 supprime. Les styles inline sont lus en plus du CSS calcule, que jsdom ne
// resout pas pour le raccourci `outline`.
it.each(CAS)('%s n entoure son cadre d aucun contour ni ombre', (_nom, controle) => {
  renderWeb(controle.element);

  focaliser(controle);

  const calcule = window.getComputedStyle(controle.cadre());
  const inline = controle.cadre().style;
  expect(
    [calcule.outlineStyle, calcule.boxShadow, inline.outline, inline.outlineWidth, inline.boxShadow].filter(
      valeur => valeur && valeur !== 'none',
    ),
  ).toEqual([]);
});

it.each(CAS)('%s rend sa bordure de repos quand il perd le focus', (_nom, controle) => {
  renderWeb(controle.element);
  const repos = bordure(controle);

  focaliser(controle);
  act(() => (controle.champ ?? controle.cadre)().blur());

  expect(bordure(controle)).toEqual(repos);
});

// Le token vient du theme : le figer ici en clair n'aurait dit que ce que le test a ecrit.
it('rend le meme token que celui du theme', () => {
  renderWeb(CONTROLES.TextField!.element);

  focaliser(CONTROLES.TextField!);

  const attendu = focusBorder();
  expect(bordure(CONTROLES.TextField!)).toEqual({
    couleur: 'rgb(10, 118, 246)',
    epaisseur: `${attendu.borderWidth}px`,
  });
});

// Le pendant de la convention. Sans cette borne, retirer les contours « partout » ferait
// passer tous les tests ci-dessus tout en effacant l'anneau des controles qui le gardent
// (ADR 0012). Le bouton est leur representant : c'est le seul consommateur de `focusRing`.
it('laisse son anneau de focus au bouton, hors du perimetre', () => {
  renderWeb(<Button variant="primary" title="Enregistrer" />);
  const bouton = screen.getByRole('button');

  act(() => bouton.focus());

  expect(bouton.style.outlineWidth).toBe('2px');
});

// Les deux mots pour « on n'ecrit pas ici ». `readOnly` est celui du web, `editable={false}`
// celui de React Native, et les deux decrivent le meme champ : aucun ne doit prendre
// l'apparence d'un champ actif, meme quand le clavier l'atteint.
//
// Le catalogue emploie les deux. Le second echappait au garde, et un champ non modifiable
// s'allumait au focus : c'est cette verification transversale qui l'a trouve.
it.each([
  ['readOnly', () => <TextField label="Texte" value="Figé" readOnly />],
  ['editable={false}', () => <TextField label="Texte" value="Figé" editable={false} />],
])('ne colore pas la bordure d un champ %s', (_nom, rendu) => {
  renderWeb(rendu());
  const champ = document.querySelector('input') as HTMLElement;
  const repos = window.getComputedStyle(champ.parentElement!).borderTopColor;

  act(() => champ.focus());

  expect(window.getComputedStyle(champ.parentElement!).borderTopColor).toBe(repos);
});
