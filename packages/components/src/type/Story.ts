import type { z } from 'zod';

export interface Story {
  /** Nom de la page (doit être unique) */
  title: string;
  /** Classification du composant */
  tags: ['Kit'] | ['Composant'] | ['Template'];
  /** Composant créé par le dév */
  experimental: boolean;
  /** Lien vers le figma */
  figmaURL?: string;
  /** Uniquement disponible sur mobile */
  mobileOnly?: boolean;
  /** Uniquement disponible sur web */
  webOnly?: boolean;
  /** Description */
  description: string;
  /** Composant */
  component: React.FC<any>;
  /** Configuration (Template only) */
  config?: object;
  /** Schema json des props */
  props?: z.core.JSONSchema.JSONSchema;
  /** Fonction représentant les styles */
  styleFn: () => string | object;
}
