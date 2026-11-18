import type { ReactElement } from 'react';
import { Commentaire, exemple as exempleCommentaire } from './demos/Commentaire';
import { Invitation, exemple as exempleInvitation } from './demos/Invitation';

export type DemoDEmail = {
  /** Nom du fichier de la demonstration. */
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
];
