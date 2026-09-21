import { act, renderWeb, screen } from '@/__tests__/helpers/renderWeb';
import { FOCUS_ATTRIBUTE, focusBorder } from '@alveole/theme';
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
 * Le point de convergence de l'ADR 0016, amendee par l'ADR 0017 : un seul test qui demande a chaque champ et a
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
  /**
   * Faux pour le seul controle qui n'a pas de cadre a encastrer : le champ de prix, dont
   * `containerFocused` ne reprend de `focusBorder()` que l'epaisseur et la couleur, pour
   * les poser sur son trait du bas. Un anneau encastre y dessinerait un rectangle complet
   * autour du montant, la ou le composant n'a jamais eu que sa ligne.
   */
  anneauEncastre?: boolean;
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
    anneauEncastre: false,
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

// L'amendement de l'ADR 0016 rend un anneau aux champs, mais encastre : il se dessine a
// l'interieur du cadre. Ce qui reste interdit, c'est ce qui deborderait — un anneau pose au
// dehors redonnerait le double cadre, une ombre s'etalerait au-dela. L'invariant tient donc
// au signe de l'ecart et a l'absence d'ombre, non a l'absence de contour.
//
// Le champ de prix fait exception, et c'est ce test qui l'a montre : l'amendement annonce
// qu'il suit `focusBorder()` sans etre touche, alors que son `containerFocused` n'en reprend
// que l'epaisseur et la couleur. Il n'a donc pas d'anneau du tout. La ligne ci-dessous fige
// le rendu reel, pas l'intention : elle tombera le jour ou le champ de prix en recevra un.
// L'ecart est lu pour son signe et non compare a la valeur du theme : la comparer
// reviendrait a demander au theme s'il est d'accord avec lui-meme, et l'anneau pourrait
// repasser au dehors sans que rien ne tombe.
it.each(CAS)('%s n entoure son cadre de rien qui deborde', (_nom, controle) => {
  renderWeb(controle.element);

  focaliser(controle);

  const style = window.getComputedStyle(controle.cadre());
  const anneau = controle.anneauEncastre === false ? 'aucun' : Math.sign(parseFloat(style.outlineOffset));
  expect({ anneau, ombre: style.boxShadow || 'none' }).toEqual({
    anneau: controle.anneauEncastre === false ? 'aucun' : -1,
    ombre: 'none',
  });
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
  const style = window.getComputedStyle(CONTROLES.TextField!.cadre());
  expect({ ...bordure(CONTROLES.TextField!), ecart: style.outlineOffset }).toEqual({
    couleur: 'rgb(10, 118, 246)',
    epaisseur: `${attendu.borderWidth}px`,
    ecart: `${attendu.outlineOffset}px`,
  });
});

// Le pendant de la convention : ce qui n'est pas un champ garde sa bague exterieure. Depuis
// l'ADR 0017 elle vient d'une regle CSS `:focus-visible` que jsdom ne resout pas, et c'est
// la marque qui l'appelle qui se verifie ici. Sans cette borne, retirer les contours
// « partout » ferait passer tous les tests ci-dessus en effacant la bague au passage.
it('laisse sa bague de focus au bouton, hors du perimetre', () => {
  renderWeb(<Button variant="primary" title="Enregistrer" />);

  expect(screen.getByRole('button').getAttribute(FOCUS_ATTRIBUTE)).toBe('ring');
});

// Le pendant du pendant : les champs, eux, ne demandent pas la bague exterieure. Leur
// indicateur est porte par leur cadre, et la marque sur le champ lui superposerait un
// second contour.
it.each(CAS)('%s ne demande pas la bague exterieure', (_nom, controle) => {
  renderWeb(controle.element);

  expect((controle.champ ?? controle.cadre)().getAttribute(FOCUS_ATTRIBUTE)).toBeNull();
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
