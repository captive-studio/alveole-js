import { Box } from '../Box';
import { MapProps } from './Map.props';
import { useGoogleMap } from './useGoogleMap';

export const Map = (props: MapProps) => {
  const { containerRef } = useGoogleMap(props);

  return (
    <Box
      ref={containerRef}
      style={{
        width: '100%',
        height: '100%',
        minHeight: 240,
        borderRadius: 12,
        overflow: 'hidden',
      }}
    />
  );
};
