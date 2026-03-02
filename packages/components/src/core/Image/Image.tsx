import { Image as ExpoImage, ImageProps as ExpoImageProps, ImageLoadEventData } from 'expo-image';
import React, { useEffect, useState } from 'react';
import { LucideIcon } from '../../ui';
import { useStyles } from './Image.style';
import { Box } from '../Box';

const DEFAULT_ASPECT_RATIO = 3 / 4;
type Dimension = number | `${number}%`;
const isNumericDimension = (value?: Dimension): value is number => value != null && typeof value === 'number';

export type ImageProps = ExpoImageProps & {
  width?: Dimension;
  height?: Dimension;
  maxWidth?: number;
  maxHeight?: number;
};

export const Image = (props: ImageProps) => {
  const { source, width, height, maxWidth, maxHeight, style, ...rest } = props;

  const maxWidthNumber = maxWidth ?? (isNumericDimension(width) ? width : undefined);
  const maxHeightNumber = maxHeight ?? (isNumericDimension(height) ? height : undefined);

  const styles = useStyles();

  const [error, setError] = useState(false);
  const [dimensions, setDimensions] = useState<{ width: number; height: number } | null>(null);

  const imageSource = React.useMemo<ImageProps['source']>(
    () => (typeof source === 'string' ? { uri: source } : source),
    [source],
  );

  const imageStyle = React.useMemo<Pick<ImageProps, 'width' | 'height' | 'maxWidth' | 'maxHeight'>>(() => {
    const fixedWidth = isNumericDimension(width) ? width : undefined;
    const fixedHeight = isNumericDimension(height) ? height : undefined;

    if (dimensions) {
      let computedWidth = dimensions.width;
      let computedHeight = dimensions.height;

      if (maxWidthNumber != null && computedWidth > maxWidthNumber) {
        computedWidth = maxWidthNumber;
        if (fixedHeight == null) {
          computedHeight = computedWidth * (dimensions.height / dimensions.width);
        }
      }

      if (maxHeightNumber != null && computedHeight > maxHeightNumber) {
        computedHeight = maxHeightNumber;
        if (fixedWidth == null) {
          computedWidth = computedHeight * (dimensions.width / dimensions.height);
        }
      }

      return {
        width: computedWidth,
        height: computedHeight,
        maxWidth: maxWidthNumber,
        maxHeight: maxHeightNumber,
      };
    }

    let fallbackWidth: number | undefined;
    let fallbackHeight: number | undefined;

    if (fixedWidth != null && fixedHeight != null) {
      fallbackWidth = fixedWidth;
      fallbackHeight = fixedHeight;
    } else if (fixedWidth != null) {
      fallbackWidth = fixedWidth;
      fallbackHeight = maxHeightNumber ?? fixedWidth * DEFAULT_ASPECT_RATIO;
    } else if (fixedHeight != null) {
      fallbackHeight = fixedHeight;
      fallbackWidth = maxWidthNumber ?? fixedHeight / DEFAULT_ASPECT_RATIO;
    } else if (maxWidthNumber != null || maxHeightNumber != null) {
      fallbackWidth = maxWidthNumber;
      fallbackHeight = maxHeightNumber ?? (maxWidthNumber != null ? maxWidthNumber * DEFAULT_ASPECT_RATIO : undefined);
    }

    return {
      width: fallbackWidth,
      height: fallbackHeight,
      maxWidth: maxWidthNumber,
      maxHeight: maxHeightNumber,
    };
  }, [width, height, maxWidthNumber, maxHeightNumber, dimensions]);

  const handleLoad = (event: ImageLoadEventData) => setDimensions(event.source);
  const handleError = () => setError(true);

  useEffect(() => {
    setDimensions(null);
    setError(false);
  }, []);

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
      onLoad={handleLoad}
      onError={handleError}
      {...rest}
    />
  );
};
