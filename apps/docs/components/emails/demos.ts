import type { ReactElement } from 'react';
import { Boutons, exemple as exempleBoutons } from './demos/Boutons';
import { Commentaire, exemple as exempleCommentaire } from './demos/Commentaire';
import { Invitation, exemple as exempleInvitation } from './demos/Invitation';

export type DemoDEmail = {
  /** Segment d'URL, et nom du fichier de la demonstration. */
  nom: string;
  titre: string;
  description: string;
  mail: () => ReactElement;
  exemple: Record<string, string | null>;
};

export const DEMOS_D_EMAILS: DemoDEmail[] = [
  {
    nom: 'Invitation',
    titre: 'Invitation',
    description: 'Titre, texte conditionnel et bouton principal.',
    mail: Invitation,
    exemple: exempleInvitation,
  },
  {
    nom: 'Commentaire',
    titre: 'Notification de commentaire',
    description:
      'Carte avec aperçu, avatar à côté du nom, bouton secondaire pleine largeur, pied de page en deux colonnes.',
    mail: Commentaire,
    exemple: exempleCommentaire,
  },
  {
    nom: 'Boutons',
    titre: 'Boutons',
    description: 'Le bouton dans ses quatre variantes, ses trois tailles et en pleine largeur.',
    mail: Boutons,
    exemple: exempleBoutons,
  },
];

export const demoDEmail = (nom: string) => DEMOS_D_EMAILS.find(demo => demo.nom === nom);
