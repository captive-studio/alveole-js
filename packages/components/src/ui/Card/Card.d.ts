import { BoxProps } from '../../core';
import { CardActions } from './CardActions';
import { CardHeader } from './CardHeader';
import { CardSection } from './CardSection';
export type CardProps = BoxProps;
declare const CardBase: (props: CardProps) => import('react/jsx-runtime').JSX.Element;
type CardCompoundComponent = typeof CardBase & {
  Header: typeof CardHeader;
  Section: typeof CardSection;
  Actions: typeof CardActions;
};
export declare const Card: CardCompoundComponent;
export {};
//# sourceMappingURL=Card.d.ts.map
