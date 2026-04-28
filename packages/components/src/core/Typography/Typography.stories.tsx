import { Story } from '../../type';
import { Typography } from './Typography';

export default {
  title: 'Typography',
  tags: ['Kit'],
  experimental: false,
  description: 'La Typography doit être utilisé pour contenir tous les textes. Composant de type Text (tamagui).',
  component: Typography,
  styleFn: () => 'Aucun style appliqué',
} satisfies Story;

export const TypographyDefault = () => <Typography>Contenu par défaut</Typography>;

export const TypographyPaddedWithColor = () => (
  <Typography p={8} color={'blue'}>
    Texte avec padding et couleur
  </Typography>
);

export const TypographyStyleItalic = () => <Typography fontStyle="italic">Texte en italique</Typography>;

export const TypographyStyleUnderline = () => <Typography textDecorationLine="underline">Texte en souligné</Typography>;

export const TypographyStyleLineThrough = () => <Typography textDecorationLine="line-through">Texte barré</Typography>;

export const TypographyTransformCapitalize = () => (
  <Typography textTransform="capitalize">avec une majuscule</Typography>
);

export const TypographyTransformUppercase = () => <Typography textTransform="uppercase">En majuscule</Typography>;

export * as Sources from './Typography.stories.sources';
