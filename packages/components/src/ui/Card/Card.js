import { jsx as _jsx } from 'react/jsx-runtime';
import { Box } from '../../core';
import { useStyles } from './Card.styles';
import { CardActions } from './CardActions';
import { CardHeader } from './CardHeader';
import { CardSection } from './CardSection';
const CardBase = props => {
  const { style, children, ...boxProps } = props;
  const styles = useStyles();
  return _jsx(Box, { tag: 'card', style: [styles.card, style], ...boxProps, children: children });
};
export const Card = Object.assign(CardBase, {
  Header: CardHeader,
  Section: CardSection,
  Actions: CardActions,
});
