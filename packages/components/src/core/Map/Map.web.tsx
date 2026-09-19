import { Box } from '../Box';
import { MapProps } from './Map.props';
import { useStyles } from './Map.styles';
import { useGoogleMap } from './useGoogleMap';

export const Map = (props: MapProps) => {
  const { containerRef } = useGoogleMap(props);
  const styles = useStyles();

  return <Box ref={containerRef} style={styles.container} />;
};
