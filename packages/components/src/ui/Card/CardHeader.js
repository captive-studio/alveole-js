import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { Box, Typography } from '../../core';
import { useStyles } from './CardHeader.styles';
export const CardHeader = props => {
  const { variant = 'default', titre, sousTitre, image, badge, style, children, ...boxProps } = props;
  const styles = useStyles();
  const disabledTextStyle = variant === 'disabled' ? styles.disabledText : {};
  return _jsxs(Box, {
    tag: 'card-header',
    style: [styles.cardHeader, disabledTextStyle, style],
    ...boxProps,
    children: [
      image,
      _jsxs(Box, {
        tag: 'card-header-texte',
        style: styles.texte,
        children: [
          _jsx(Typography, { style: [styles.titre, disabledTextStyle], children: titre }),
          sousTitre && _jsx(Typography, { style: [styles.sousTitre, disabledTextStyle], children: sousTitre }),
        ],
      }),
      badge,
    ],
  });
};
