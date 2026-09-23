import { Story } from '../../type';
import { Box } from '../Box';
import { Typography } from '../Typography';
import { Grid } from './Grid';
import { useStyles } from './Grid.styles';

export default {
  title: 'Grid',
  tags: ['core'],
  experimental: false,
  description:
    'Grille basique sur 12 colonnes (mobile et sur web). Composant de type Box à utiliser avec `<Grid.Column>`.',
  shortDescription: 'Grille basique sur 12 colonnes (mobile et web). À utiliser avec Grid.Column.',
  component: Grid,
  styleFn: useStyles,
} satisfies Story;

const colColor = '#88b2bd';
const colColorAlt = '#b9c47f';

const Col = ({ color = colColor, label }: { color?: string; label: string }) => (
  <Box backgroundColor={color} p={'050'} style={{ borderRadius: 4 }}>
    <Typography>{label}</Typography>
  </Box>
);

export const TwoEqualColumns = () => (
  <Grid gap={8}>
    <Grid.Column size={6}>
      <Col label="6 colonnes" />
    </Grid.Column>
    <Grid.Column size={6}>
      <Col label="6 colonnes" />
    </Grid.Column>
  </Grid>
);

export const AsymmetricColumns = () => (
  <Grid gap={8}>
    <Grid.Column size={4}>
      <Col label="4 colonnes" />
    </Grid.Column>
    <Grid.Column size={8}>
      <Col color={colColorAlt} label="8 colonnes" />
    </Grid.Column>
  </Grid>
);

export const ThreeColumns = () => (
  <Grid gap={8}>
    <Grid.Column size={4}>
      <Col label="4 colonnes" />
    </Grid.Column>
    <Grid.Column size={4}>
      <Col color={colColorAlt} label="4 colonnes" />
    </Grid.Column>
    <Grid.Column size={4}>
      <Col label="4 colonnes" />
    </Grid.Column>
  </Grid>
);

export const FourColumns = () => (
  <Grid gap={8}>
    <Grid.Column size={3}>
      <Col label="3" />
    </Grid.Column>
    <Grid.Column size={3}>
      <Col color={colColorAlt} label="3" />
    </Grid.Column>
    <Grid.Column size={3}>
      <Col label="3" />
    </Grid.Column>
    <Grid.Column size={3}>
      <Col color={colColorAlt} label="3" />
    </Grid.Column>
  </Grid>
);

export const FullWidthColumn = () => (
  <Grid gap={8}>
    <Grid.Column size={12}>
      <Col label="12 colonnes (pleine largeur)" />
    </Grid.Column>
    <Grid.Column size={6}>
      <Col label="6 colonnes" />
    </Grid.Column>
    <Grid.Column size={6}>
      <Col color={colColorAlt} label="6 colonnes" />
    </Grid.Column>
  </Grid>
);

export const ResponsiveColumns = () => (
  <Grid gap={8}>
    <Grid.Column size={{ mobile: 12, desktop: 6 }}>
      <Col label="12 mobile / 6 desktop" />
    </Grid.Column>
    <Grid.Column size={{ mobile: 12, desktop: 6 }}>
      <Col color={colColorAlt} label="12 mobile / 6 desktop" />
    </Grid.Column>
  </Grid>
);

export const ResponsiveThreeColumns = () => (
  <Grid gap={8}>
    <Grid.Column size={{ mobile: 12, tablet: 6, desktop: 4 }}>
      <Col label="12 mobile / 6 tablet / 4 desktop" />
    </Grid.Column>
    <Grid.Column size={{ mobile: 12, tablet: 6, desktop: 4 }}>
      <Col color={colColorAlt} label="12 mobile / 6 tablet / 4 desktop" />
    </Grid.Column>
    <Grid.Column size={{ mobile: 12, tablet: 12, desktop: 4 }}>
      <Col label="12 mobile / 12 tablet / 4 desktop" />
    </Grid.Column>
  </Grid>
);

export const WithLargeGap = () => (
  <Grid gap={24}>
    <Grid.Column size={4}>
      <Col label="gap 24" />
    </Grid.Column>
    <Grid.Column size={4}>
      <Col color={colColorAlt} label="gap 24" />
    </Grid.Column>
    <Grid.Column size={4}>
      <Col label="gap 24" />
    </Grid.Column>
  </Grid>
);

export * as Sources from './Grid.stories.sources';
