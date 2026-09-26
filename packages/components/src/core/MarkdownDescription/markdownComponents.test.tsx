import { createTextComponents } from './markdownComponents';

// La couleur demandee a MarkdownDescription voyage jusqu'au Typography du paragraphe, qui la
// fait primer sur son defaut (couleurDuTexte.test.tsx). On le verifie sur l'element produit,
// sans rendu ni style calcule (ADR 0027).
it('donne au paragraphe la couleur de texte demandee', () => {
  const { p } = createTextComponents({ bodyStyle: {}, boldStyle: {}, textColor: 'red' });

  expect(p({ children: 'Un texte.' }).props.color).toBe('red');
});
