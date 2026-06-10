import { Box, BoxProps } from '../../core';
import { useStyles } from './Divider.styles';

export type DividerProps = Omit<BoxProps, 'children'>;

export const Divider = (props: DividerProps) => {
  const styles = useStyles();
  const { style, ...rest } = props;
  return <Box tag="divider" {...rest} style={[styles.divider, style]} />;
};
