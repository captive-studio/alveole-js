import {
  RNTamaguiViewNonStyleProps,
  styled,
  TamaguiElement,
  View as TamaguiView,
  ViewProps as TamaguiViewProps,
} from '@tamagui/core';
import React, { CSSProperties } from 'react';
import { pseudoEtatsTamagui } from '../styleTamagui/pseudoEtatsTamagui';
import { BoxStyle } from './Box.types';
import { resolveSpacing } from './resolveSpacing';

export type BoxProps = Pick<TamaguiViewProps, 'exitStyle' | 'focusStyle' | 'pressStyle' | 'disabledStyle'> &
  Omit<RNTamaguiViewNonStyleProps, 'tag'> &
  BoxStyle & {
    // Possede ici et non herite de Tamagui, qui retire `tag` en v2 : le passage a Tamagui
    // se fait en un seul endroit, dans le rendu ci-dessous.
    tag?: string;
    hoverStyle?: CSSProperties;
  };

const StyledView = styled(TamaguiView, { name: 'Box' });
export type BoxElement = TamaguiElement;

export const Box = React.forwardRef<BoxElement, BoxProps>(function Box(props, ref) {
  const { pseudoEtats, autres } = pseudoEtatsTamagui<TamaguiViewProps>()(props);
  const { tag, style, borderRadius, mt, mb, mr, ml, m, pt, pb, pl, pr, p, gap, ...viewProps } = autres;
  const radius = {
    borderBottomRightRadius: borderRadius,
    borderTopRightRadius: borderRadius,
    borderBottomLeftRadius: borderRadius,
    borderTopLeftRadius: borderRadius,
  };

  const margins = {
    mt: resolveSpacing(mt),
    mb: resolveSpacing(mb),
    ml: resolveSpacing(ml),
    mr: resolveSpacing(mr),
    m: resolveSpacing(m),
  };

  const paddings = {
    pt: resolveSpacing(pt),
    pb: resolveSpacing(pb),
    pl: resolveSpacing(pl),
    pr: resolveSpacing(pr),
    p: resolveSpacing(p),
  };

  const spacings = {
    gap: resolveSpacing(gap),
  };

  return (
    <StyledView
      ref={ref}
      render={tag ?? 'box'}
      style={style}
      {...radius}
      {...pseudoEtats}
      {...viewProps}
      {...margins}
      {...paddings}
      {...spacings}
    />
  );
});
