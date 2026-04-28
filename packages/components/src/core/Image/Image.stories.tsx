import { Story } from '../../type';
import { Box } from '../Box';
import { Typography } from '../Typography';
import { Image } from './Image';

export default {
  title: 'Image',
  tags: ['Kit'],
  experimental: true,
  description:
    "Permet d'afficher une image de manière responsive que ce soit sur mobile ou desktop. Actuellement l'image ne peut que être fill, il faudrait développer les autres en se basant sur l'élément <img> HTML. https://www.w3schools.com/csS/css3_object-fit.asp",
  component: Image,
  styleFn: () => 'Aucun style appliqué',
} satisfies Story;

export const Cover = () => {
  return (
    <Box>
      <Box>
        <Typography>Image originale avec 400 x 300</Typography>
        <Image source="https://picsum.photos/seed/696/400/300" width={400} height={300} />
      </Box>

      <Box>
        <Typography>Image déformée avec width 250 et height 200 (rendu 250 x 200)</Typography>
        <Image source="https://picsum.photos/seed/696/400/300" width={250} height={200} />
      </Box>

      <Box>
        <Typography>Image avec une width de 200px (rendu 200 x 150)</Typography>
        <Image source="https://picsum.photos/seed/696/400/300" width={200} />
      </Box>

      <Box>
        <Typography>Image avec une height de 200px (rendu 400 x 200)</Typography>
        <Image source="https://picsum.photos/seed/696/400/300" height={200} />
      </Box>
    </Box>
  );
};

export const MaxWidth = () => {
  return (
    <Box>
      <Typography>Image avec maxWidth de 200px (rendu 200 x 400)</Typography>
      <Image source="https://picsum.photos/seed/696/400/300" maxWidth={200} />
    </Box>
  );
};

export const MaxHeight = () => {
  return (
    <Box>
      <Typography>Image avec maxHeight de 200px (rendu 300 x 200)</Typography>
      <Image source="https://picsum.photos/seed/696/400/300" maxHeight={200} />
    </Box>
  );
};

export const MaxWidthAndHeight = () => {
  return (
    <Box>
      <Typography>Image avec maxWidth et maxHeight de 200px (rendu 200 x 200)</Typography>
      <Image source="https://picsum.photos/seed/696/400/300" maxWidth={200} maxHeight={200} />
    </Box>
  );
};

export const contain = () => {
  return (
    <>
      <Box>
        <Typography>Image avec contentFit de contain (rendu 250 x 150)</Typography>
        <Image source="https://www.w3schools.com/csS/paris.jpg" contentFit="contain" width={250} height={150} />
      </Box>

      <Box>
        <Typography>Image avec contentFit de contain (rendu 250 x 150)</Typography>
        <Image
          source="https://www.w3schools.com/csS/paris.jpg"
          contentFit="contain"
          contentPosition="left"
          width={250}
          height={150}
        />
      </Box>
    </>
  );
};

export const cover = () => {
  return (
    <Box>
      <Typography>Image avec contentFit de cover (rendu 500 x 500)</Typography>
      <Image source="https://picsum.photos/seed/696/400/300" contentFit="cover" width={500} height={500} />
    </Box>
  );
};

export const fill = () => {
  return (
    <Box>
      <Typography>Image avec contentFit de fill (rendu 500 x 500)</Typography>
      <Image source="https://picsum.photos/seed/696/400/300" contentFit="fill" width={500} height={500} />
    </Box>
  );
};

export const transition = () => {
  return (
    <Box>
      <Typography>Image avec transition de 1000ms (rendu 200 x 200)</Typography>
      <Image source="https://picsum.photos/seed/696/400/300" transition={1000} width={200} height={200} />
    </Box>
  );
};

export const withAnotherImage = () => {
  return (
    <Box>
      <Typography>Image avec contentFit de contain (rendu 200 x 150)</Typography>
      <Image
        source="https://www.w3schools.com/csS/paris.jpg"
        contentFit="contain"
        contentPosition="left"
        width={200}
        height={150}
      />
    </Box>
  );
};

export const responsiveImage = () => {
  return (
    <Box>
      <Typography>Image responsive. L&apos;image doit prendre la taille de son conteneur. Ici 200 x 100</Typography>
      <Box width={200} height={100}>
        <Image source="https://picsum.photos/seed/696/400/300" width={'100%'} height={'100%'} />
      </Box>
    </Box>
  );
};

export const ImageNotFound = () => {
  return (
    <Box>
      <Typography>Image non trouvée</Typography>
      <Image source="https://invalid.url" width={200} height={200} />
    </Box>
  );
};

export * as Sources from './Image.stories.sources';
