// This file is generated. Do not edit manually.
// Source: src/core/Image/Image.stories.tsx

export const Cover = () =>
  'export const Cover = () => {\n  return (\n    <Box>\n      <Box>\n        <Typography>Image originale avec 400 x 300</Typography>\n        <Image source="https://picsum.photos/seed/696/400/300" width={400} height={300} />\n      </Box>\n\n      <Box>\n        <Typography>Image déformée avec width 250 et height 200 (rendu 250 x 200)</Typography>\n        <Image source="https://picsum.photos/seed/696/400/300" width={250} height={200} />\n      </Box>\n\n      <Box>\n        <Typography>Image avec une width de 200px (rendu 200 x 150)</Typography>\n        <Image source="https://picsum.photos/seed/696/400/300" width={200} />\n      </Box>\n\n      <Box>\n        <Typography>Image avec une height de 200px (rendu 400 x 200)</Typography>\n        <Image source="https://picsum.photos/seed/696/400/300" height={200} />\n      </Box>\n    </Box>\n  );\n};';

export const MaxWidth = () =>
  'export const MaxWidth = () => {\n  return (\n    <Box>\n      <Typography>Image avec maxWidth de 200px (rendu 200 x 400)</Typography>\n      <Image source="https://picsum.photos/seed/696/400/300" maxWidth={200} />\n    </Box>\n  );\n};';

export const MaxHeight = () =>
  'export const MaxHeight = () => {\n  return (\n    <Box>\n      <Typography>Image avec maxHeight de 200px (rendu 300 x 200)</Typography>\n      <Image source="https://picsum.photos/seed/696/400/300" maxHeight={200} />\n    </Box>\n  );\n};';

export const MaxWidthAndHeight = () =>
  'export const MaxWidthAndHeight = () => {\n  return (\n    <Box>\n      <Typography>Image avec maxWidth et maxHeight de 200px (rendu 200 x 200)</Typography>\n      <Image source="https://picsum.photos/seed/696/400/300" maxWidth={200} maxHeight={200} />\n    </Box>\n  );\n};';

export const contain = () =>
  'export const contain = () => {\n  return (\n    <>\n      <Box>\n        <Typography>Image avec contentFit de contain (rendu 250 x 150)</Typography>\n        <Image source="https://www.w3schools.com/csS/paris.jpg" contentFit="contain" width={250} height={150} />\n      </Box>\n\n      <Box>\n        <Typography>Image avec contentFit de contain (rendu 250 x 150)</Typography>\n        <Image\n          source="https://www.w3schools.com/csS/paris.jpg"\n          contentFit="contain"\n          contentPosition="left"\n          width={250}\n          height={150}\n        />\n      </Box>\n    </>\n  );\n};';

export const cover = () =>
  'export const cover = () => {\n  return (\n    <Box>\n      <Typography>Image avec contentFit de cover (rendu 500 x 500)</Typography>\n      <Image source="https://picsum.photos/seed/696/400/300" contentFit="cover" width={500} height={500} />\n    </Box>\n  );\n};';

export const fill = () =>
  'export const fill = () => {\n  return (\n    <Box>\n      <Typography>Image avec contentFit de fill (rendu 500 x 500)</Typography>\n      <Image source="https://picsum.photos/seed/696/400/300" contentFit="fill" width={500} height={500} />\n    </Box>\n  );\n};';

export const transition = () =>
  'export const transition = () => {\n  return (\n    <Box>\n      <Typography>Image avec transition de 1000ms (rendu 200 x 200)</Typography>\n      <Image source="https://picsum.photos/seed/696/400/300" transition={1000} width={200} height={200} />\n    </Box>\n  );\n};';

export const withAnotherImage = () =>
  'export const withAnotherImage = () => {\n  return (\n    <Box>\n      <Typography>Image avec contentFit de contain (rendu 200 x 150)</Typography>\n      <Image\n        source="https://www.w3schools.com/csS/paris.jpg"\n        contentFit="contain"\n        contentPosition="left"\n        width={200}\n        height={150}\n      />\n    </Box>\n  );\n};';

export const responsiveImage = () =>
  "export const responsiveImage = () => {\n  return (\n    <Box>\n      <Typography>Image responsive. L&apos;image doit prendre la taille de son conteneur. Ici 200 x 100</Typography>\n      <Box width={200} height={100}>\n        <Image source=\"https://picsum.photos/seed/696/400/300\" width={'100%'} height={'100%'} />\n      </Box>\n    </Box>\n  );\n};";

export const ImageNotFound = () =>
  'export const ImageNotFound = () => {\n  return (\n    <Box>\n      <Typography>Image non trouvée</Typography>\n      <Image source="https://invalid.url" width={200} height={200} />\n    </Box>\n  );\n};';

export const storySources = {
  Cover,
  MaxWidth,
  MaxHeight,
  MaxWidthAndHeight,
  contain,
  cover,
  fill,
  transition,
  withAnotherImage,
  responsiveImage,
  ImageNotFound,
} as const;

export type StorySourceName = keyof typeof storySources;
