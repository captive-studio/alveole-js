import { Spacings, useTheme } from '@alveole/theme';
import { Story } from '../../type';
import { Typography } from '../Typography';
import { Box } from './Box';

export default {
  title: 'Box',
  tags: ['core'],
  experimental: false,
  description:
    "La Box doit être utilisé pour tout contenir, à la manière d'une <div>. De type View (tamagui), elle permet de définir le tag rendu en web.",
  shortDescription: "Composant de base pour tout contenir, à la manière d'une div. De type View (Tamagui).",
  component: Box,
  styleFn: () => 'Aucun style appliqué',
} satisfies Story;

export const BoxDefault = () => (
  <Box tag="box">
    <Typography>Contenu par défaut</Typography>
  </Box>
);

export const BoxPadded = () => (
  <Box tag="padded" p="2W">
    <Typography>Box avec padding</Typography>
  </Box>
);

export const BoxPaddedWithBackground = () => {
  const { color } = useTheme();
  return (
    <Box tag="padded-with-background" backgroundColor={color.light.background['alt-grey']} p="2W">
      <Typography>Box avec fond gris clair et padding</Typography>
    </Box>
  );
};

export const BoxHovered = () => {
  const { color } = useTheme();
  return (
    <Box tag="hovered" backgroundColor={`hover:${color.light.background['alt-grey']}`}>
      <Typography>Box avec fond gris changeant au hover</Typography>
    </Box>
  );
};

// Sans tag, Box rend l'element inconnu <box> : il se met en page comme une div.
export const BoxSansTag = () => {
  const { color } = useTheme();
  return (
    <Box tag="box-comparaison" gap="1W">
      <Box backgroundColor={color.light.background['alt-grey']} p="2W">
        <Typography>Box sans tag</Typography>
      </Box>
      <Box tag="div" backgroundColor={color.light.background['alt-grey']} p="2W">
        <Typography>Box en div</Typography>
      </Box>
    </Box>
  );
};

// Dans un parent de hauteur indéfinie, `flex: 1` garde la hauteur de son contenu, en prop comme en style.
export const BoxFlexDansParentIndefini = () => (
  <Box tag="box-flex-parent">
    <Box tag="box-flex-en-prop" flex={1}>
      <Typography>flex: 1 en prop</Typography>
    </Box>
    <Box tag="box-flex-en-style" style={{ flex: 1 }}>
      <Typography>flex: 1 en style</Typography>
    </Box>
  </Box>
);

// Un style objet, en tableau ou en tableau imbriqué est fusionné avant d'atteindre le DOM.
export const BoxStyles = () => (
  <Box gap="1W">
    <Box tag="box-style-objet" style={{ paddingLeft: Spacings['6W'] }}>
      <Typography>Style objet</Typography>
    </Box>
    <Box tag="box-style-tableau" style={[{ paddingLeft: Spacings['6W'] }, { marginTop: Spacings['0V'] }]}>
      <Typography>Style en tableau</Typography>
    </Box>
    <Box tag="box-style-imbrique" style={[[{ paddingLeft: Spacings['6W'] }], { marginTop: Spacings['0V'] }]}>
      <Typography>Style en tableau imbriqué</Typography>
    </Box>
  </Box>
);

export * as Sources from './Box.stories.sources';
