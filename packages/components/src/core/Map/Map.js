import { jsx as _jsx } from 'react/jsx-runtime';
import { Box, Typography } from '../../core';
export const Map = _ => {
  return _jsx(Box, {
    p: '075',
    children: _jsx(Typography, { textAlign: 'center', children: 'La carte n\u2019est pas disponible sur le mobile' }),
  });
};
