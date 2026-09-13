import React from 'react';
import { Box, BoxProps } from '../../core/Box';
import { Typography } from '../../core/Typography';
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

  const isDisabled = variant === 'disabled';
  const disabledTextStyle = isDisabled ? styles.disabledText : {};

  return (
    <Box tag="card-header" style={[styles.cardHeader, disabledTextStyle, style]} {...boxProps}>
      {image && (
        <Box tag="card-image" style={[isDisabled ? styles.imageDisabled : {}]}>
          {image}
        </Box>
      )}
      <Box tag="card-header-texte" style={styles.texte}>
        <Typography style={[styles.titre, disabledTextStyle]}>{titre}</Typography>
        {sousTitre && <Typography style={[styles.sousTitre, disabledTextStyle]}>{sousTitre}</Typography>}
      </Box>
      {badge && (
        <Box tag="card-trailing" style={styles.trailing}>
          {badge}
        </Box>
      )}
    </Box>
  );
};
