import { Color, StyleValue } from '@alveole/theme';
import * as LabIcons from '@lucide/lab';
import * as LucideIcons from 'lucide-react-native';
import { z } from 'zod';

export type LucideIconName = keyof typeof LucideIcons;
export type LabIconName = keyof typeof LabIcons;
const IconSizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

export type IconName = LucideIconName | LabIconName;

// Volontairement `boolean` et non un prédicat `name is LucideIconName` : narrower l'union
// des ~1950 noms d'icônes vers celle des ~1600 noms Lucide coûtait 8 s de typecheck à lui
// seul, soit les deux tiers du paquet. Le résultat est mis en cache par TypeScript, donc
// un seul site d'appel suffisait à payer la facture.
export const isLucideIconName = (name: string): boolean => Object.keys(LucideIcons).includes(name);

const PublicPropsSchema = z.object({
  size: z.enum(IconSizes).describe("Taille de l'icon"),
  name: z.enum<IconName[]>([...(Object.keys(LucideIcons) as IconName[])]).describe('Nom de l’icon Lucide'),
});

type PrivateProps = {
  style?: StyleValue;
  color?: Color;
  _platformOverride?: 'ios' | 'android' | 'web' | 'windows' | 'macos';
};

// Exports
export type LucideIconProps = z.infer<typeof PublicPropsSchema> & PrivateProps;
export const LucideIconPropsJSON = z.toJSONSchema(PublicPropsSchema);
