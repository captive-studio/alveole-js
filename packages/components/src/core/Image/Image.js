import { Image as ExpoImage } from 'expo-image';
import React, { useEffect, useState } from 'react';
import { jsx as _jsx } from 'react/jsx-runtime';
import { LucideIcon } from '../../ui';
import { Box } from '../Box';
import { useStyles } from './Image.style';
const DEFAULT_ASPECT_RATIO = 3 / 4;
const isNumericDimension = value => value != null && typeof value === 'number';
export const Image = props => {
  const { source, width, height, maxWidth, maxHeight, style, ...rest } = props;
  const maxWidthNumber = maxWidth ?? (isNumericDimension(width) ? width : undefined);
  const maxHeightNumber = maxHeight ?? (isNumericDimension(height) ? height : undefined);
  const styles = useStyles();
  const [error, setError] = useState(false);
  const [dimensions, setDimensions] = useState(null);
  const imageSource = React.useMemo(() => (typeof source === 'string' ? { uri: source } : source), [source]);
  const imageStyle = React.useMemo(() => {
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
    let fallbackWidth;
    let fallbackHeight;
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
  const handleLoad = event => setDimensions(event.source);
  const handleError = () => setError(true);
  useEffect(() => {
    setDimensions(null);
    setError(false);
  }, []);
  return error
    ? _jsx(Box, { children: _jsx(LucideIcon, { name: 'ImageOff', size: 'md' }) })
    : _jsx(ExpoImage, {
        style: {
          ...styles.image,
          ...imageStyle,
          width: width === '100%' ? '100%' : imageStyle.width,
          height: height === '100%' ? '100%' : imageStyle.height,
        },
        source: imageSource,
        onLoad: handleLoad,
        onError: handleError,
        ...rest,
      });
};
