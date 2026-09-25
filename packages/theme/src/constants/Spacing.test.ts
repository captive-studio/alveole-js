import { readFileSync } from 'fs';
import { join } from 'path';

import { Spacings } from './Spacing';

const source = readFileSync(join(__dirname, 'Spacing.ts'), 'utf8');

// Chaque bloc `@deprecated Utiliser 'X'` precede immediatement la cle qu'il condamne :
// on relie donc la cible annoncee a la cle suivante pour comparer leurs valeurs.
const redirections = [...source.matchAll(/Utiliser '([^']+)'\s*\*\/\s*'([^']+)':/g)].map(([, cible, cle]) => ({
  cle,
  cible,
}));

describe('Spacings', () => {
  // Une redirection `@deprecated` qui pointe vers une cle d'une autre valeur fait remplacer
  // en silence un espacement par un autre des qu'on suit la consigne.
  it('ne redirige que vers une cle de meme valeur', () => {
    redirections.forEach(({ cle, cible }) => {
      const valeur = new Map(Object.entries(Spacings)).get(cle);
      const valeurCible = new Map(Object.entries(Spacings)).get(cible);

      expect({ cle, valeur: valeurCible }).toEqual({ cle, valeur });
    });
  });
});
