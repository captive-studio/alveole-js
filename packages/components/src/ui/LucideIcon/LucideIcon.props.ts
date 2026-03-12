import { Color, StyleValue } from '@alveole/theme';
import * as LabIcons from '@lucide/lab';
import * as LucideIcons from 'lucide-react-native/icons';
import { z } from 'zod';

export type LucideIconName = keyof typeof LucideIcons;
export type LabIconName = keyof typeof LabIcons;
const IconSizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

export type IconName = LucideIconName | LabIconName;

export const isLucideIconName = (name: string): name is LucideIconName => Object.keys(LucideIcons).includes(name);

const PublicPropsSchema = z.object({
  size: z.enum(IconSizes).describe("Taille de l'icon"),
  name: z.enum<IconName[]>([...(Object.keys(LucideIcons) as IconName[])]).describe('Nom de l’icon Lucide'),
});

type PrivateProps = {
  style?: StyleValue;
  color?: Color;
};

// Exports
export type LucideIconProps = z.infer<typeof PublicPropsSchema> & PrivateProps;
export const LucideIconPropsJSON = z.toJSONSchema(PublicPropsSchema);
