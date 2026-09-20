import { ControlSizes } from './Control';
import { PillSizes, pillSizeFor } from './Pill';

// La puce n'est pas un controle : elle n'est ni cliquable ni une cible tactile, elle
// qualifie un objet au fil du texte. Son echelle doit donc rester sous le plus petit
// cran de controle, faute de quoi un badge pese autant qu'un bouton dans une cellule de
// tableau. Primer place son `Label` a 20/24 et son `control` xs a 24 : les deux echelles
// se rejoignent par le haut sans jamais se croiser. Base fait pareil avec `Tag`.
it('ne depasse jamais le plus petit cran de controle', () => {
  expect(PillSizes.md.height).toBeLessThanOrEqual(ControlSizes.desktop.xs.height);
});

// L'acces vit ici plutot que dans une fonction flechee du constructeur de theme, comme
// `controlSizesFor` pour les controles : la table et la facon de la lire se relisent au
// meme endroit, et se testent sans monter de theme.
it('rend le cran demande', () => {
  expect(pillSizeFor('sm')).toBe(PillSizes.sm);
});
