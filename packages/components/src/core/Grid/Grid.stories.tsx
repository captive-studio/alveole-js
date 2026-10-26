import { CustomPalette, enCouleursDuTheme, RadiusList, ThemeColor } from '@alveole/theme';
import { Story } from '../../type';
import { Button } from '../../ui/Button';
import { Card } from '../../ui/Card';
import { A } from '../A';
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

const { background } = enCouleursDuTheme(CustomPalette).light;
const colColor = background['contrast-info'];
const colColorAlt = background['contrast-success'];

const Col = ({ color = colColor, label }: { color?: ThemeColor; label: string }) => (
  <Box backgroundColor={color} p="1W" style={{ borderRadius: RadiusList.sm }}>
    <Typography>{label}</Typography>
  </Box>
);

export const TwoEqualColumns = () => (
  <Grid gap="1W">
    <Grid.Column size={6}>
      <Col label="6 colonnes" />
    </Grid.Column>
    <Grid.Column size={6}>
      <Col label="6 colonnes" />
    </Grid.Column>
  </Grid>
);

export const AsymmetricColumns = () => (
  <Grid gap="1W">
    <Grid.Column size={4}>
      <Col label="4 colonnes" />
    </Grid.Column>
    <Grid.Column size={8}>
      <Col color={colColorAlt} label="8 colonnes" />
    </Grid.Column>
  </Grid>
);

export const ThreeColumns = () => (
  <Grid gap="1W">
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
  <Grid gap="1W">
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
  <Grid gap="1W">
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
  <Grid gap="1W">
    <Grid.Column size={{ mobile: 12, desktop: 6 }}>
      <Col label="12 mobile / 6 desktop" />
    </Grid.Column>
    <Grid.Column size={{ mobile: 12, desktop: 6 }}>
      <Col color={colColorAlt} label="12 mobile / 6 desktop" />
    </Grid.Column>
  </Grid>
);

export const ResponsiveThreeColumns = () => (
  <Grid gap="1W">
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
  <Grid gap="3W">
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

export const EqualHeightCards = () => (
  <Grid gap="2W">
    <Grid.Column size={{ mobile: 12, tablet: 6, desktop: 4 }}>
      <Card>
        <Card.Header titre="Titre court" sousTitre="Une ligne" />
        <Card.Actions>
          <Button variant="secondary" title="Voir" size="sm" />
        </Card.Actions>
      </Card>
    </Grid.Column>
    <Grid.Column size={{ mobile: 12, tablet: 6, desktop: 4 }}>
      <Card>
        <Card.Header
          titre="Un titre bien plus long qui passe sur deux lignes"
          sousTitre="Un sous-titre lui aussi assez long pour occuper plusieurs lignes dans la carte"
        />
        <Card.Actions>
          <Button variant="secondary" title="Voir" size="sm" />
        </Card.Actions>
      </Card>
    </Grid.Column>
    <Grid.Column size={{ mobile: 12, tablet: 6, desktop: 4 }}>
      <A href="/components/Card">
        <Card>
          <Card.Header titre="Carte cliquable" />
        </Card>
      </A>
    </Grid.Column>
  </Grid>
);

export * as Sources from './Grid.stories.sources';
