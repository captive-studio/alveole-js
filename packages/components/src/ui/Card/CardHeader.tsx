import React from 'react';
import { Box, BoxProps, Typography } from '../../core';
import { useStyles } from './CardHeader.styles';

export type CardHeaderVariant = 'default' | 'disabled';

export type CardHeaderProps = BoxProps & {
  variant?: CardHeaderVariant;
  titre?: string;
  sousTitre?: string;
  image?: React.ReactNode;
  badge?: React.ReactNode;
};

export const CardHeader = (props: CardHeaderProps) => {
  const { variant = 'default', titre, sousTitre, image, badge, style, children, ...boxProps } = props;

  const styles = useStyles();

  const disabledTextStyle = variant === 'disabled' ? styles.disabledText : {};

  return (
    <Box tag="card-header" style={[styles.cardHeader, disabledTextStyle, style]} {...boxProps}>
      {image}
      <Box tag="card-header-texte" style={styles.texte}>
        <Typography style={[styles.titre, disabledTextStyle]}>{titre}</Typography>
        {sousTitre && (
          <Typography style={[styles.sousTitre, disabledTextStyle]}>{sousTitre}</Typography>
        )}
      </Box>
      {badge}
    </Box>
  );
};
