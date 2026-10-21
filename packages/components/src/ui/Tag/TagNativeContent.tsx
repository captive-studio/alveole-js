import { CSSProperties, ReactNode } from 'react';
import { Box } from '../../core/Box';
import { Typography } from '../../core/Typography';
import { useStyles } from './Tag.styles';

type TagNativeContentProps = {
  apparence: CSSProperties;
  leading: ReactNode;
  close: ReactNode;
  children: ReactNode;
};

/** Le texte et la croix sont des voisins : un Text natif ne centre pas les vues inline. */
export const TagNativeContent = ({ apparence, leading, close, children }: TagNativeContentProps) => {
  const styles = useStyles();
  const { fontFamily, fontSize, fontWeight, lineHeight, letterSpacing, color, ...surface } = apparence;

  return (
    <Box style={{ ...surface, ...styles.nativeContent }}>
      {leading}
      <Typography
        numberOfLines={1}
        color={color}
        style={{ fontFamily, fontSize, fontWeight, lineHeight, letterSpacing, ...styles.nativeLabel }}
      >
        {children}
      </Typography>
      {close}
    </Box>
  );
};
