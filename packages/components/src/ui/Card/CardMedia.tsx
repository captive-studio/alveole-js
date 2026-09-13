import { Box, BoxProps } from '../../core/Box';
import { useStyles } from './CardMedia.styles';

export type CardMediaVariant = 'default' | 'disabled';

export type CardMediaProps = BoxProps & {
  variant?: CardMediaVariant;
};

export const CardMedia = (props: CardMediaProps) => {
  const { variant = 'default', style, children, ...boxProps } = props;

  const styles = useStyles();

  return (
    <Box
      tag="card-media"
      style={[styles.cardMedia, variant === 'disabled' ? styles.disabled : {}, style]}
      {...boxProps}
    >
      {children}
    </Box>
  );
};
