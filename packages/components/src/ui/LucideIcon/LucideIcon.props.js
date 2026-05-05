import * as LucideIcons from 'lucide-react-native/icons';
import { z } from 'zod';
const IconSizes = ['xs', 'sm', 'md', 'lg', 'xl'];
export const isLucideIconName = name => Object.keys(LucideIcons).includes(name);
const PublicPropsSchema = z.object({
  size: z.enum(IconSizes).describe("Taille de l'icon"),
  name: z.enum([...Object.keys(LucideIcons)]).describe('Nom de l’icon Lucide'),
});
export const LucideIconPropsJSON = z.toJSONSchema(PublicPropsSchema);
