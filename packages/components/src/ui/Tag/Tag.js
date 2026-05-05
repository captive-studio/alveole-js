import { jsx as _jsx } from 'react/jsx-runtime';
import { Box, Typography } from '../../core';
import { useStyles } from './Tag.styles';
export const Tag = props => {
  const { size, color, children, style, ...tagProps } = props;
  const styles = useStyles();
  const tagSize = size === 'sm' ? styles.tagSm : styles.tagMd;
  const tagVariant = () => {
    switch (color) {
      case 'action':
        return styles.tagAction;
      case 'default':
        return styles.tagDefault;
    }
  };
  return _jsx(Box, {
    tag: 'tag',
    style: { ...styles.tagContainer, ...style },
    children: _jsx(Typography, {
      style: { ...styles.tag, ...tagVariant(), ...tagSize },
      ...tagProps,
      children: children,
    }),
  });
};
