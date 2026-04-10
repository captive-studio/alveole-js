import { Box, Image } from '@alveole/components';
import React from 'react';
import { DocumentViewerRotation } from './DocumentViewer';
import { useStyles } from './DocumentViewer.styles';

export type DocumentViewerImageProps = {
  source: string;
  height: number;
  rotation: DocumentViewerRotation;
  scale?: number;
};

export const DocumentViewerImage = (props: DocumentViewerImageProps) => {
  const { source, rotation, height, scale = 1 } = props;
  const styles = useStyles();
  const [isHovered, setIsHovered] = React.useState(false);
  const [transformOrigin, setTransformOrigin] = React.useState('50% 50%');
  const hoveredScale = isHovered ? 2 : 1;

  const handlePointerMove = React.useCallback(
    (event: any) => {
      const rect = event.currentTarget?.getBoundingClientRect?.();
      if (!rect) return;

      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;
      const origin = getRotatedTransformOrigin(x, y, rotation);

      setTransformOrigin(`${clampPercent(origin.x)}% ${clampPercent(origin.y)}%`);
    },
    [rotation],
  );

  return (
    <Box
      tag="document-viewer-image"
      width={'100%'}
      height={height}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
      onPointerMove={handlePointerMove}
      style={styles.viewerImageContent}
    >
      <Box width={'100%'} height={'100%'} p={'1V'}>
        <Box width={'100%'} height={'100%'} style={{ transform: [{ rotate: `${rotation}deg` }] }}>
          <Box
            width={'100%'}
            height={'100%'}
            style={[styles.viewerImageZoomLayer, { transformOrigin }, { transform: [{ scale: scale * hoveredScale }] }]}
          >
            <Image source={{ uri: source }} contentFit="contain" width={'100%'} height={'100%'} pointerEvents="none" />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

const clampPercent = (value: number) => Math.max(0, Math.min(100, value));

const getRotatedTransformOrigin = (x: number, y: number, rotation: DocumentViewerRotation) => {
  switch (rotation) {
    case 90:
      return { x: y, y: 100 - x };
    case 180:
      return { x: 100 - x, y: 100 - y };
    case 270:
      return { x: 100 - y, y: x };
    case 0:
    default:
      return { x, y };
  }
};
