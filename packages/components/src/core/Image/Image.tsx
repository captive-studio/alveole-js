import { Image as ExpoImage, ImageProps as ExpoImageProps, ImageLoadEventData } from 'expo-image';
import React, { useState } from 'react';
import { LucideIcon } from '../../ui/LucideIcon';
import { Box } from '../Box';
import { dimensionsImage } from './dimensionsImage';
import { useStyles } from './Image.style';

type Dimension = number | `${number}%`;
const isNumericDimension = (value?: Dimension): value is number => value != null && typeof value === 'number';

export type ImageProps = ExpoImageProps & {
  width?: Dimension;
  height?: Dimension;
  maxWidth?: number;
  maxHeight?: number;
};

export const Image = (props: ImageProps) => {
  const { source, width, height, maxWidth, maxHeight, style, alt, accessibilityLabel, ...rest } = props;

  // expo-image documente `alt` comme alias d'`accessibilityLabel`, mais ne l'applique que
  // dans l'une de ses deux branches de rendu web (ExpoImage.web.tsx) : selon le chemin
  // emprunté, l'attribut `alt` du <img> disparaît. On résout l'alias ici, une fois.
  const label = accessibilityLabel ?? alt;

  const maxWidthNumber = maxWidth ?? (isNumericDimension(width) ? width : undefined);
  const maxHeightNumber = maxHeight ?? (isNumericDimension(height) ? height : undefined);

  const styles = useStyles();

  const [error, setError] = useState(false);
  const [dimensions, setDimensions] = useState<{ width: number; height: number } | null>(null);

  const imageSource = React.useMemo<ImageProps['source']>(
    () => (typeof source === 'string' ? { uri: source } : source),
    [source],
  );

  const imageStyle = React.useMemo<Pick<ImageProps, 'width' | 'height' | 'maxWidth' | 'maxHeight'>>(
    () =>
      dimensionsImage({
        fixedWidth: isNumericDimension(width) ? width : undefined,
        fixedHeight: isNumericDimension(height) ? height : undefined,
        maxWidthNumber,
        maxHeightNumber,
        dimensions,
      }),
    [width, height, maxWidthNumber, maxHeightNumber, dimensions],
  );

  const handleLoad = (event: ImageLoadEventData) => setDimensions(event.source);
  const handleError = () => setError(true);

  return error ? (
    <Box>
      <LucideIcon name="ImageOff" size="md" />
    </Box>
  ) : (
    <ExpoImage
      style={{
        ...styles.image,
        ...imageStyle,
        width: width === '100%' ? '100%' : imageStyle.width,
        height: height === '100%' ? '100%' : imageStyle.height,
      }}
      source={imageSource}
      accessibilityLabel={label}
      onLoad={handleLoad}
      onError={handleError}
      {...rest}
    />
  );
};
