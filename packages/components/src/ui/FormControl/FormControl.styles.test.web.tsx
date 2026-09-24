import { renderHookOnDesktop } from '@/__tests__/helpers/renderWeb';
import { useStyles } from './FormControl.styles';

test('utilise le rayon de bordure de l echelle du theme sur le champ ferme', () => {
  const { result } = renderHookOnDesktop(() => useStyles());

  expect(result.current.inputInner.borderRadius).toBe('var(--radius-md)');
});

// Le retrait horizontal du texte saisi doit venir de l'echelle de controle, pas d'un
// litteral d'espacement : c'est elle qui aligne un champ sur le bouton pose a cote de lui.
test('retire le texte saisi du bord selon l echelle de controle', () => {
  const { result } = renderHookOnDesktop(() => useStyles());

  expect({
    gauche: result.current.input.paddingLeft,
    droite: result.current.input.paddingRight,
  }).toEqual({ gauche: 12, droite: 12 });
});

test('utilise le rayon de bordure de l echelle du theme sur les coins hauts de la modale', () => {
  const { result } = renderHookOnDesktop(() => useStyles());

  expect({
    hautGauche: result.current.modalContent.borderTopLeftRadius,
    hautDroite: result.current.modalContent.borderTopRightRadius,
  }).toEqual({
    hautGauche: 'var(--radius-lg)',
    hautDroite: 'var(--radius-lg)',
  });
});

test('utilise le rayon de bordure de l echelle du theme sur le champ multiligne de la modale', () => {
  const { result } = renderHookOnDesktop(() => useStyles());

  expect(result.current.modalInputContainer.borderRadius).toBe('var(--radius-md)');
});

// Le cadre d'un champ n'a qu'un plancher (`minHeight`) : c'est son contenu qui fixe sa
// hauteur reelle. Une ligne laissee a `auto` vaut 18 ou 20 selon le type d'input natif, et
// le champ debordait alors a 34 a cote d'un bouton de 32.
test('remplit exactement la hauteur de controle avec la ligne saisie, ses marges et la bordure', () => {
  const { result } = renderHookOnDesktop(() => useStyles());
  const { input, inputWeb, inputInner } = result.current;

  expect(
    parseFloat(String(inputWeb.lineHeight)) +
      Number(input.marginTop) +
      Number(input.marginBottom) +
      2 * inputInner.borderWidth,
  ).toBe(32);
});
