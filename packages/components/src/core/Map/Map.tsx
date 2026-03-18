import { Box, Typography } from '../../core';
import { MapProps } from './Map.props';

export const Map = (_: MapProps) => {
  return (
    <Box p={'075'}>
      <Typography textAlign={'center'}>La carte n’est pas disponible sur le mobile</Typography>
    </Box>
  );
};
