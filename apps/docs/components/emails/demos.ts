import type { ComponentType } from 'react';
import { Exemple as Commentaire } from './demos/Commentaire';
import { Exemple as Invitation } from './demos/Invitation';

export type DemoDEmail = {
  /** Nom du fichier de la demonstration. */
  nom: string;
  titre: string;
  description: string;
  Exemple: ComponentType;
};

export const DEMOS_D_EMAILS: DemoDEmail[] = [
  {
    nom: 'Invitation',
    titre: 'Invitation',
    description: 'Titre, texte conditionnel et bouton principal.',
    Exemple: Invitation,
  },
  {
    nom: 'Commentaire',
    titre: 'Notification de commentaire',
    description:
      'Carte avec aperçu, avatar à côté du nom, bouton secondaire pleine largeur, pied de page en deux colonnes.',
    Exemple: Commentaire,
  },
];
