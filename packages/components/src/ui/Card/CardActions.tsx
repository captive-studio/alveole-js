import { Box, BoxProps } from '../../core';
import { useStyles } from './CardActions.styles';

export type CardActionsProps = BoxProps;

export const CardActions = (props: CardActionsProps) => {
  const { style, children, ...boxProps } = props;

  const styles = useStyles();

  return (
    <Box tag="card-actions" style={[styles.cardActions, style]} {...boxProps}>
      {children}
    </Box>
  );
};
