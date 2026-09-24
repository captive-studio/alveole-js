import {
  RNTamaguiViewNonStyleProps,
  styled,
  TamaguiElement,
  View as TamaguiView,
  ViewProps as TamaguiViewProps,
} from '@tamagui/core';
import React, { CSSProperties } from 'react';
import { versStyleTamagui } from '../styleTamagui/versStyleTamagui';
import { BoxStyle } from './Box.types';
import { resolveSpacing } from './resolveSpacing';

export type BoxProps = Pick<TamaguiViewProps, 'exitStyle' | 'focusStyle' | 'pressStyle' | 'disabledStyle'> &
  RNTamaguiViewNonStyleProps &
  BoxStyle & {
    hoverStyle?: CSSProperties;
  };

const StyledView = styled(TamaguiView, { name: 'Box' });
export type BoxElement = TamaguiElement;

export const Box = React.forwardRef<BoxElement, BoxProps>(function Box(props, ref) {
  const { tag, style, borderRadius, hoverStyle, mt, mb, mr, ml, m, pt, pb, pl, pr, p, gap, ...viewProps } = props;
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
      tag={tag ?? 'box'}
      style={style}
      {...radius}
      hoverStyle={versStyleTamagui<TamaguiViewProps['hoverStyle']>(hoverStyle)}
      {...viewProps}
      {...margins}
      {...paddings}
      {...spacings}
    />
  );
});
