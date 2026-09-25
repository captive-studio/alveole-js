import { act, renderWeb, screen } from '@/__tests__/helpers/renderWeb';
import { FOCUS_ATTRIBUTE } from '@alveole/theme';
import { Button } from './Button';
import { DateInput } from './DateInput';
import { DurationInput } from './DurationInput';
import { FormControl, TextInput } from './FormControl';
import { NumberField } from './NumberField';
import { OtpField } from './OtpField';
import { PasswordField } from './PasswordField';
import { PhoneField } from './PhoneField';
import { PriceInput } from './PriceInput';
import { Select } from './Select';
import { SelectMultiple } from './SelectMultiple';
import { TextareaInput } from './TextareaInput';
import { TimeInput } from './TimeInput';

/**
 * Le point de convergence de l'ADR 0016, amendee par l'ADR 0017 : chaque champ et chaque
 * selecteur du kit se voient demander la meme chose, plutot que de faire confiance a autant
 * de fiches.
 *
 * Ce qui se voit (bordure de focus, anneau encastre, retour au repos, champ non modifiable)
 * se verifie dans le navigateur, sur les fiches du catalogue : apps/docs/e2e/focus.spec.ts
 * (ADR 0027). Ici ne reste que le contrat : le controle se prend au clavier, et il ne
 * demande pas la bague exterieure.
 */
type Controle = {
  element: React.ReactElement;
  /** Ce que la plateforme focalise, qui n'est pas toujours le cadre. */
  champ: () => HTMLElement;
};

const controle = (selecteur: string) => () => document.querySelector(selecteur) as HTMLElement;
const saisie = controle('input');

const CONTROLES: Record<string, Controle> = {
  TextInput: {
    element: (
      <FormControl label="Texte">
        <TextInput />
      </FormControl>
    ),
    champ: saisie,
  },
  TextareaInput: {
    element: (
      <FormControl label="Texte">
        <TextareaInput />
      </FormControl>
    ),
    champ: controle('textarea'),
  },
  PhoneField: { element: <PhoneField label="Téléphone" />, champ: saisie },
  PasswordField: { element: <PasswordField label="Mot de passe" />, champ: saisie },
  DurationInput: { element: <DurationInput label="Durée" />, champ: saisie },
  DateInput: { element: <DateInput label="Date" />, champ: saisie },
  TimeInput: { element: <TimeInput label="Heure" />, champ: saisie },
  NumberField: { element: <NumberField label="Nombre" />, champ: saisie },
  PriceInput: { element: <PriceInput value={null} />, champ: controle('.alveole-price-input') },
  Select: {
    element: <Select label="Pays" value={null} options={[{ value: 'fr', label: 'France' }]} />,
    champ: controle('[role="combobox"]'),
  },
  SelectMultiple: {
    element: <SelectMultiple label="Langues" options={[{ value: 'fr', label: 'Français' }]} value={[]} />,
    champ: controle('[role="combobox"]'),
  },
  OtpField: {
    element: <OtpField label="Code" numberOfDigits={4} autoFocus={false} hideStick />,
    champ: () => screen.getByTestId('otp-input-hidden'),
  },
};

const CAS = Object.entries(CONTROLES);

// jsdom ne deplace pas le focus a la tabulation : le contrat clavier s'y lit comme la
// presence dans l'ordre de tabulation, plus la prise effective du focus.
it.each(CAS)('%s se prend au clavier', (_nom, { element, champ }) => {
  renderWeb(element);

  act(() => champ().focus());

  expect({ tabulable: champ().tabIndex >= 0, actif: document.activeElement === champ() }).toEqual({
    tabulable: true,
    actif: true,
  });
});

// Le pendant de la convention : ce qui n'est pas un champ garde sa bague exterieure. Depuis
// l'ADR 0017 elle vient d'une regle CSS `:focus-visible` que jsdom ne resout pas, et c'est
// la marque qui l'appelle qui se verifie ici. Sans cette borne, retirer les contours
// « partout » ferait passer la convention en effacant la bague au passage.
it('laisse sa bague de focus au bouton, hors du perimetre', () => {
  renderWeb(<Button variant="primary" title="Enregistrer" />);

  expect(screen.getByRole('button').getAttribute(FOCUS_ATTRIBUTE)).toBe('ring');
});

// Le pendant du pendant : les champs, eux, ne demandent pas la bague exterieure. Leur
// indicateur est porte par leur cadre, et la marque sur le champ lui superposerait un
// second contour.
it.each(CAS)('%s ne demande pas la bague exterieure', (_nom, { element, champ }) => {
  renderWeb(element);

  expect(champ().getAttribute(FOCUS_ATTRIBUTE)).toBeNull();
});
