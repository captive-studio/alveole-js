import type { ComponentType } from 'react';
import { Exemple as A } from './composants/A';
import { Exemple as Avatar } from './composants/Avatar';
import { Exemple as Button } from './composants/Button';
import { Exemple as Card } from './composants/Card';
import { Exemple as Disposition } from './composants/Disposition';
import { Exemple as Divider } from './composants/Divider';
import { Exemple as EmailLayout } from './composants/EmailLayout';
import { Exemple as Heading } from './composants/Heading';
import { Exemple as Typography } from './composants/Typography';
import { Exemple as Variables, exemple as exempleVariables } from './composants/Variables';

export type ComposantDEmail = {
  /** Nom affiche, et nom du fichier d'exemple. */
  nom: string;
  description: string;
  Exemple: ComponentType;
  /** Le gabarit est deja un mail complet : il ne s'enveloppe pas dans un second EmailLayout. */
  complet?: boolean;
  exemple?: Record<string, string | null>;
};

export const COMPOSANTS_D_EMAIL: ComposantDEmail[] = [
  {
    nom: 'EmailLayout',
    description: 'Le gabarit de tout mail : aperçu (preview), logo, contenu, pied de page (footer), langue (lang).',
    Exemple: EmailLayout,
    complet: true,
  },
  { nom: 'Heading', description: 'as de h1 à h6, h2 par défaut, aux crans de titre du thème.', Exemple: Heading },
  { nom: 'Typography', description: 'ton normal, fort ou discret ; textAlign.', Exemple: Typography },
  { nom: 'Card', description: 'Une carte bordée, avec un media facultatif au-dessus du contenu.', Exemple: Card },
  {
    nom: 'Avatar',
    description: 'size de xs à xl, aux tailles de l’Avatar d’Alvéole ; rond, ou carre.',
    Exemple: Avatar,
  },
  {
    nom: 'Button',
    description: 'variant primary, secondary, tertiary ou danger ; size sm, md ou lg ; fullWidth ; title et href.',
    Exemple: Button,
  },
  { nom: 'A', description: 'Un lien dans le texte.', Exemple: A },
  { nom: 'Divider', description: 'Un séparateur horizontal.', Exemple: Divider },
  {
    nom: 'Disposition',
    description: 'Section, Row et Column, réexportés de react-email, pour placer des blocs côte à côte.',
    Exemple: Disposition,
  },
  {
    nom: 'Variables',
    description:
      'v(nom) pose une variable du mailer, when(nom, a, b) la seule condition permise ; ici remplies avec des données d’exemple.',
    Exemple: Variables,
    exemple: exempleVariables,
  },
];
