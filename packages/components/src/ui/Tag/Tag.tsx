import React, { CSSProperties } from 'react';
import { Box } from '../../core/Box';
import { Typography } from '../../core/Typography';
import { useStyles } from './Tag.styles';

export type TagColors = 'default' | 'action';
export type TagProps = {
  children: React.ReactNode;
  color: TagColors;
  size: 'sm' | 'md';
  style?: CSSProperties;
};

export const Tag = (props: TagProps) => {
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

  return (
    <Box tag="tag" style={{ ...styles.tagContainer, ...style }}>
      <Typography style={{ ...styles.tag, ...tagVariant(), ...tagSize }} {...tagProps}>
        {children}
      </Typography>
    </Box>
  );
};
