import { Box } from '../../core/Box';
import { Typography } from '../../core/Typography';
import { Story } from '../../type';
import { LucideIcon } from './LucideIcon';
import { LucideIconPropsJSON } from './LucideIcon.props';

export default {
  title: 'LucideIcon',
  tags: ['ui'],
  experimental: false,
  figmaURL: 'https://www.figma.com/design/DSMuo6EvJHYYuU9nHmj90J/Captive.fr?node-id=3740-4789&t=AGgcv4H3Z7WE4pOo-4',
  description: 'Icon de la librairie [Lucide](https://lucide.dev/icons/)',
  shortDescription: 'Icône de la librairie Lucide (lucide.dev/icons).',
  props: LucideIconPropsJSON,
  component: LucideIcon,
  styleFn: () => 'Aucun style appliqué',
} satisfies Story;

export const Default = () => (
  <Box>
    <LucideIcon name="AArrowDown" size="sm" />
    <LucideIcon name="AArrowDown" size="md" />
    <LucideIcon name="AArrowDown" size="lg" />
    <LucideIcon name="AArrowDown" size="xl" />
  </Box>
);

export const Colored = () => <LucideIcon name="AArrowDown" size="md" color="green" />;

/**
 * En passant `name="Share"`, le composant sélectionne automatiquement l'icône adaptée à la plateforme courante.
 * La prop `_platformOverride` est utilisée ici uniquement pour forcer l'affichage de chaque variante dans la story.
 */
export const SharePerPlatform = () => (
  <Box style={{ gap: 24 }}>
    <Box style={{ flexDirection: 'row', gap: 24 }}>
      <Box style={{ alignItems: 'center', gap: 8 }}>
        <Typography>Web</Typography>
        <LucideIcon name="Share" size="md" _platformOverride="web" />
      </Box>
      <Box style={{ alignItems: 'center', gap: 8 }}>
        <Typography>Android</Typography>
        <LucideIcon name="Share" size="md" _platformOverride="android" />
      </Box>
      <Box style={{ alignItems: 'center', gap: 8 }}>
        <Typography>iOS</Typography>
        <LucideIcon name="Share" size="md" _platformOverride="ios" />
      </Box>
    </Box>
  </Box>
);

export * as Sources from './LucideIcon.stories.sources';
