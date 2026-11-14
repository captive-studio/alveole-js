import { CustomPalette, enCouleursDuTheme } from '@alveole/theme';
import { Story } from '../../type';
import { Box } from '../Box';
import { Typography } from '../Typography';
import { Section } from './Section';
import { useStyles } from './Section.styles';

export default {
  title: 'Section',
  tags: ['core'],
  experimental: true,
  description: [
    'Section de page : centre son contenu dans un conteneur de largeur maximale et applique la marge extérieure du thème (`externalPadding`). Composant de type Box.',
    '',
    'Padding horizontal (gauche/droite), toujours appliqué, selon la largeur d’écran :',
    '- mobile (< 768px) : `2W` = 16px ;',
    '- tablette (768–991px) et desktop (≥ 992px) : `3W` = 24px.',
    '',
    '`withPaddingY` ajoute la même valeur en haut et en bas (désactivé par défaut).',
    '',
    'Largeur maximale du contenu (`size`) : `sm` = 600px, `md` = 1200px (par défaut), `full` = sans limite.',
  ].join('\n'),
  component: Section,
  styleFn: useStyles,
} satisfies Story;

const { background } = enCouleursDuTheme(CustomPalette).light;
const paddingColor = background['contrast-success'];
const innerBoxColor = background['contrast-info'];

export const Default = () => (
  <Section>
    <Box>
      <Typography>Section</Typography>
    </Box>
  </Section>
);

export const WithPaddingY = () => (
  <Section backgroundColor={paddingColor} withPaddingY>
    <Box backgroundColor={innerBoxColor} p="1W">
      <Typography>Section avec background et padding Y</Typography>
    </Box>
  </Section>
);

export const WidthMdSize = () => {
  const styles = useStyles();

  return (
    <Section backgroundColor={paddingColor} size="md">
      <Box backgroundColor={innerBoxColor} p="1W">
        <Typography>
          Section avec background et size md ({styles.sectionContainerMD.maxWidth}px, taille par défaut)
        </Typography>
      </Box>
    </Section>
  );
};

export const WidthFullSize = () => (
  <Section backgroundColor={paddingColor} size="full">
    <Box backgroundColor={innerBoxColor} p="1W">
      <Typography>Section avec background et size full (sans largeur maximale)</Typography>
    </Box>
  </Section>
);

export const WidthSmSize = () => {
  const styles = useStyles();

  return (
    <Section backgroundColor={paddingColor} size="sm">
      <Box backgroundColor={innerBoxColor} p="1W">
        <Typography>Section avec background et size sm ({styles.sectionContainerSM.maxWidth}px)</Typography>
      </Box>
    </Section>
  );
};

export * as Sources from './Section.stories.sources';
