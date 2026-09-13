import React from 'react';
import { Box, BoxProps } from '../../core/Box';
import { useStyles } from './Card.styles';
import { CardActions } from './CardActions';
import { CardHeader } from './CardHeader';
import { CardMedia } from './CardMedia';
import { CardSection } from './CardSection';

export type CardProps = BoxProps;

const CardBase = (props: CardProps) => {
  const { style, children, ...boxProps } = props;

  const styles = useStyles();

  const allChildren = React.Children.toArray(children);
  const mediaChild = allChildren.find(child => React.isValidElement(child) && child.type === CardMedia);
  const contentChildren = allChildren.filter(child => !(React.isValidElement(child) && child.type === CardMedia));

  return (
    <Box tag="card" style={[styles.card, style]} {...boxProps}>
      {mediaChild}
      <Box tag="card-content" style={[styles.content]}>
        {contentChildren}
      </Box>
    </Box>
  );
};

type CardCompoundComponent = typeof CardBase & {
  Header: typeof CardHeader;
  Section: typeof CardSection;
  Actions: typeof CardActions;
  Media: typeof CardMedia;
};

export const Card: CardCompoundComponent = Object.assign(CardBase, {
  Header: CardHeader,
  Section: CardSection,
  Actions: CardActions,
  Media: CardMedia,
});
