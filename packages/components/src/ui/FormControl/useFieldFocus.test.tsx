import { act, renderHook } from '@testing-library/react-native';
import { useFieldFocus } from './useFieldFocus';

// Les deux mots pour « on n'ecrit pas ici ». `readOnly` est celui du web, `editable={false}`
// celui de React Native, et les deux decrivent le meme champ : aucun ne doit prendre
// l'apparence d'un champ actif, meme quand le clavier l'atteint.
//
// Le catalogue emploie les deux. Le second echappait au garde, et un champ non modifiable
// s'allumait au focus : c'est la verification transversale de la convention de focus qui
// l'a trouve. Le rendu, lui, est verifie dans le navigateur (apps/docs/e2e/focus.spec.ts).
it.each([
  ['readOnly', { readOnly: true }],
  ['editable={false}', { editable: false }],
  ['disabled', { disabled: true }],
])('n entre pas dans l etat de focus d un champ %s', async (_nom, options) => {
  const { result } = await renderHook(() => useFieldFocus(options));

  await act(() => result.current.handleFocus(undefined));

  expect(result.current.focus).toBe(false);
});

it('entre dans l etat de focus d un champ modifiable et en sort au blur', async () => {
  const { result } = await renderHook(() => useFieldFocus({}));

  await act(() => result.current.handleFocus(undefined));
  const auFocus = result.current.focus;
  await act(() => result.current.handleBlur(undefined));

  expect({ auFocus, apresBlur: result.current.focus }).toEqual({ auFocus: true, apresBlur: false });
});
