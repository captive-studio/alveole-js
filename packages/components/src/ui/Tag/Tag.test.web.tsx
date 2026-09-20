import { renderHookOnDesktop } from '@/__tests__/helpers/renderWeb';
import { useStyles } from './Tag.styles';

// La puce ne declarait aucune hauteur : elle tombait sur ce que la police lui laissait, et
// comme elle se rend `inline`, ce n'etait meme pas la hauteur de ligne mais la boite de
// contenu de la fonte (15 px en sm, 25 px en md, mesures navigateur). Un `Tag` et un `Badge`
// poses dans la meme cellule ne s'alignaient donc pas, et le moindre changement de metrique
// de fonte redimensionnait la puce sans que personne ne l'ait decide.
it('tient la hauteur du cran md de l echelle de puce', () => {
  const { result } = renderHookOnDesktop(() => useStyles());

  expect(result.current.tagMd.height).toBe(24);
});

// Le `size` ne changeait que la police : les deux crans n'avaient aucun gabarit propre.
it('tient la hauteur du cran sm de l echelle de puce', () => {
  const { result } = renderHookOnDesktop(() => useStyles());

  expect(result.current.tagSm.height).toBe(20);
});

// Pendant horizontal des deux tests ci-dessus : sans lui, la hauteur viendrait de l'echelle
// et le retrait d'un litteral, et les deux se desaccorderaient au premier ajustement. C'est
// la faute exacte relevee sur les boutons et les champs au chantier precedent.
it('creuse les deux crans selon l echelle de puce', () => {
  const { result } = renderHookOnDesktop(() => useStyles());

  expect({ sm: result.current.tagSm.paddingLeft, md: result.current.tagMd.paddingLeft }).toEqual({
    sm: 6,
    md: 8,
  });
});

// Declarer une hauteur ne suffit pas : un element `inline` l'ignore, et ses retraits
// verticaux debordent sur les lignes voisines au lieu de les ecarter. `inline-flex` plutot
// que `flex`, sinon la puce cesse d'epouser son libelle et s'etire sur toute la largeur
// disponible. C'est le choix de Primer pour `Label` et de Base pour `Tag`.
it('se rend en boite, sans quoi sa hauteur reste decorative', () => {
  const { result } = renderHookOnDesktop(() => useStyles());

  expect(result.current.tag.display).toBe('inline-flex');
});
