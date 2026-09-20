import { renderHookOnDesktop } from '@/__tests__/helpers/renderWeb';
import { useStyles } from './Badge.styles';

// Les deux crans mesuraient 20 px pareil (mesure navigateur) : `size` ne changeait que la
// police, jamais le gabarit. Un `Badge` md et un `Tag` md poses dans la meme cellule ne
// s'alignaient donc pas, alors qu'ils declarent la meme taille.
it('distingue la hauteur des deux crans selon l echelle de puce', () => {
  const { result } = renderHookOnDesktop(() => useStyles());

  expect({ sm: result.current.badgeSm.height, md: result.current.badgeMd.height }).toEqual({
    sm: 20,
    md: 24,
  });
});

// Pendant horizontal : le retrait de `sm` (6) et l'ecart d'icone (4) tombaient deja sur les
// bonnes valeurs, mais par des litteraux d'espacement, donc sans lien avec la hauteur. Les
// figer sur l'echelle est ce qui garantit qu'ils suivront le jour ou elle bougera.
it('creuse et espace les deux crans selon l echelle de puce', () => {
  const { result } = renderHookOnDesktop(() => useStyles());

  expect({
    sm: [result.current.badgeSm.paddingLeft, result.current.badgeSm.gap],
    md: [result.current.badgeMd.paddingLeft, result.current.badgeMd.gap],
  }).toEqual({ sm: [6, 4], md: [8, 4] });
});
