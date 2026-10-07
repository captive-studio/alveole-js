import { CustomTypography } from '@alveole/theme';
import { createHeadingComponents, createTextComponents } from './markdownComponents';

// La couleur demandee a MarkdownDescription voyage jusqu'au Typography du paragraphe, qui la
// fait primer sur son defaut (couleurDuTexte.test.tsx). On le verifie sur l'element produit,
// sans rendu ni style calcule (ADR 0027).
it('donne au paragraphe la couleur de texte demandee', () => {
  const { p } = createTextComponents({ bodyStyle: {}, boldStyle: {}, textColor: 'red' });

  expect(p({ children: 'Un texte.' }).props.color).toBe('red');
});

// Un `Text` React Native imbrique dans un Typography tamagui ne se sait pas imbrique et
// retombe sur le noir par defaut : gras et italique passent donc eux aussi par Typography.
it('donne au gras et a l italique la couleur de texte demandee', () => {
  const { strong, em } = createTextComponents({ bodyStyle: {}, boldStyle: {}, textColor: 'red' });

  expect(strong({ children: 'Gras' }).props.color).toBe('red');
  expect(em({ children: 'Italique' }).props.color).toBe('red');
});

it('donne aux titres la couleur de titre demandee', () => {
  const { h1, h4 } = createHeadingComponents(CustomTypography.Titres, 'red');

  expect(h1({ children: 'Titre' }).props.color).toBe('red');
  expect(h4({ children: 'Titre' }).props.color).toBe('red');
});
