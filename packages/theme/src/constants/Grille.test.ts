import { Grilles } from './Grille';

const COLONNE = 78;
const GOUTTIERE = 24;

const largeurAttendue = (colonnes: number) => colonnes * COLONNE + (colonnes - 1) * GOUTTIERE;

describe('Grilles', () => {
  // Une clé qui annonce n colonnes et porte la largeur de n+1 fait poser aux applications
  // clientes un bloc trop large sans qu'aucune erreur ne le signale.
  it('donne à chaque clé la largeur du nombre de colonnes qu elle annonce', () => {
    Object.entries(Grilles).forEach(([cle, largeur]) => {
      const colonnes = Number(cle.split(' ')[0]);

      expect({ cle, largeur }).toEqual({ cle, largeur: largeurAttendue(colonnes) });
    });
  });
});
