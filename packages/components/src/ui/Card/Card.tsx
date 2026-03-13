import { Box, BoxProps } from '../../core';
import { useStyles } from './Card.styles';
import { CardActions } from './CardActions';
import { CardHeader } from './CardHeader';
import { CardSection } from './CardSection';

export type CardProps = BoxProps;

const CardBase = (props: CardProps) => {
  const { style, children, ...boxProps } = props;

  const styles = useStyles();

  return (
    <Box tag="card" style={[styles.card, style]} {...boxProps}>
      {children}
    </Box>
  );
};

type CardCompoundComponent = typeof CardBase & {
  Header: typeof CardHeader;
  Section: typeof CardSection;
  Actions: typeof CardActions;
};

export const Card: CardCompoundComponent = Object.assign(CardBase, {
  Header: CardHeader,
  Section: CardSection,
  Actions: CardActions,
});
