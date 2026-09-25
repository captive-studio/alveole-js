import { act, fireEvent, renderNative } from '@/__tests__/helpers/renderNative';
import { focusBorder } from '@alveole/theme';
import { FormControl } from './FormControl';
import { OtpInput } from './OtpInput';

// La bibliotheque OTP est la meme sur les deux plateformes, mais elle y empile les styles
// autrement : sur natif, chaque cellule recoit un tableau que React Native aplatit. Ce test
// verifie que la bordure de focus y arrive bien, la ou le test web lit du CSS calcule.
//
// `autoFocus={false}` : la bibliotheque focalise le champ au montage par defaut, et la
// premiere cellule serait deja active. « Au repos » et « au focus » designeraient la meme
// chose.
//
// `hideStick` : le curseur clignotant de la cellule active monte une animation en boucle,
// que `act` attend. En local elle se vide en quelques millisecondes, sur une machine de CI
// chargee elle a fait depasser le delai de 5 s au premier test. Le curseur n'est pas ce
// qu'on mesure ici, et ne pas le monter retire l'attente au lieu de l'allonger.
const bordureDeLaCellule = (view: Awaited<ReturnType<typeof renderNative>>, index = 0) => {
  const style = view.getAllByTestId('otp-input')[index]!.props.style;
  return (Array.isArray(style) ? Object.assign({}, ...style.filter(Boolean)) : style).borderColor;
};

const focaliser = async (view: Awaited<ReturnType<typeof renderNative>>) => {
  await act(async () => {
    fireEvent(view.getByTestId('otp-input-hidden'), 'focus');
  });
};

it('colore la bordure de la cellule active avec le token de focus', async () => {
  const view = await renderNative(
    <FormControl label="Code">
      <OtpInput numberOfDigits={4} autoFocus={false} hideStick />
    </FormControl>,
  );
  const repos = bordureDeLaCellule(view);

  await focaliser(view);

  expect({ repos: repos !== focusBorder().borderColor, focus: bordureDeLaCellule(view) }).toEqual({
    repos: true,
    focus: focusBorder().borderColor,
  });
});

it('ne colore que la cellule active', async () => {
  const view = await renderNative(
    <FormControl label="Code">
      <OtpInput numberOfDigits={4} autoFocus={false} hideStick />
    </FormControl>,
  );
  const repos = bordureDeLaCellule(view, 1);

  await focaliser(view);

  expect(bordureDeLaCellule(view, 1)).toBe(repos);
});

// Pendant la saisie, c'est la cellule active qu'il faut pouvoir designer sans ambiguite ;
// le verdict de validation reprend la main au blur.
it('couvre la couleur d erreur tant que la cellule est active, puis la restitue', async () => {
  const view = await renderNative(
    <FormControl label="Code">
      <OtpInput numberOfDigits={4} autoFocus={false} hideStick error="Code invalide" />
    </FormControl>,
  );
  const erreur = bordureDeLaCellule(view);

  await focaliser(view);
  const pendantLeFocus = bordureDeLaCellule(view);
  await act(async () => {
    fireEvent(view.getByTestId('otp-input-hidden'), 'blur');
  });

  expect({ pendantLeFocus, apresLeBlur: bordureDeLaCellule(view) }).toEqual({
    pendantLeFocus: focusBorder().borderColor,
    apresLeBlur: erreur,
  });
});

it('ne colore pas la bordure des cellules d un champ desactive', async () => {
  const view = await renderNative(
    <FormControl label="Code">
      <OtpInput numberOfDigits={4} autoFocus={false} hideStick disabled />
    </FormControl>,
  );
  const desactive = bordureDeLaCellule(view);

  await focaliser(view);

  expect(bordureDeLaCellule(view)).toBe(desactive);
});
