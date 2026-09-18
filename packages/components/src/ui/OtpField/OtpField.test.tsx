import { act, fireEvent, renderNative } from '@/__tests__/helpers/renderNative';
import { focusBorder } from '@alveole/theme';
import { OtpField } from './OtpField';

// La bibliotheque OTP est la meme sur les deux plateformes, mais elle y empile les styles
// autrement : sur natif, chaque cellule recoit un tableau que React Native aplatit. Ce test
// verifie que la bordure de focus y arrive bien, la ou le test web lit du CSS calcule.
//
// `autoFocus={false}` : la bibliotheque focalise le champ au montage par defaut, et la
// premiere cellule serait deja active. « Au repos » et « au focus » designeraient la meme
// chose.
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
  const view = await renderNative(<OtpField label="Code" numberOfDigits={4} autoFocus={false} />);
  const repos = bordureDeLaCellule(view);

  await focaliser(view);

  expect({ repos: repos !== focusBorder().borderColor, focus: bordureDeLaCellule(view) }).toEqual({
    repos: true,
    focus: focusBorder().borderColor,
  });
});

it('ne colore que la cellule active', async () => {
  const view = await renderNative(<OtpField label="Code" numberOfDigits={4} autoFocus={false} />);
  const repos = bordureDeLaCellule(view, 1);

  await focaliser(view);

  expect(bordureDeLaCellule(view, 1)).toBe(repos);
});

// Pendant la saisie, c'est la cellule active qu'il faut pouvoir designer sans ambiguite ;
// le verdict de validation reprend la main au blur.
it('couvre la couleur d erreur tant que la cellule est active, puis la restitue', async () => {
  const view = await renderNative(<OtpField label="Code" numberOfDigits={4} autoFocus={false} error="Code invalide" />);
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
  const view = await renderNative(<OtpField label="Code" numberOfDigits={4} autoFocus={false} disabled />);
  const desactive = bordureDeLaCellule(view);

  await focaliser(view);

  expect(bordureDeLaCellule(view)).toBe(desactive);
});
