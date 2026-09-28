import { Color, StyleValue } from '@alveole/theme';
import { z } from 'zod';
import { iconesLucide } from './catalogueLucide';
import * as LabIcons from './vendor/lab';

export type LucideIconName = keyof typeof iconesLucide;
export type LabIconName = keyof typeof LabIcons;
const IconSizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

export type IconName = LucideIconName | LabIconName;

const estUnNomLucide = (nom: string): nom is LucideIconName => Object.prototype.hasOwnProperty.call(iconesLucide, nom);

// Volontairement `boolean` et non un prédicat `name is LucideIconName` : narrower l'union
// des ~1950 noms d'icônes vers celle des ~1600 noms Lucide coûtait 8 s de typecheck à lui
// seul, soit les deux tiers du paquet. Le résultat est mis en cache par TypeScript, donc
// un seul site d'appel suffisait à payer la facture.
export const isLucideIconName = (name: string): boolean => estUnNomLucide(name);

type PublicProps = {
  size: (typeof IconSizes)[number];
  name: IconName;
};

// L'inférence de Zod développe les milliers de noms d'icônes dans les déclarations
// de ce module et de sa fiche. Le contrat explicite garde l'union nommée et vérifie
// toujours les types d'entrée et de sortie du schéma.
const PublicPropsSchema: z.ZodType<PublicProps, PublicProps> = z.object({
  size: z.enum(IconSizes).describe("Taille de l'icon"),
  name: z.enum<IconName[]>(Object.keys(iconesLucide).filter(estUnNomLucide)).describe('Nom de l’icon Lucide'),
});

type PrivateProps = {
  style?: StyleValue;
  color?: Color;
  _platformOverride?: 'ios' | 'android' | 'web' | 'windows' | 'macos';
};

// Exports
export type LucideIconProps = z.infer<typeof PublicPropsSchema> & PrivateProps;
export const LucideIconPropsJSON = z.toJSONSchema(PublicPropsSchema);
