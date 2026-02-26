import { isSpacingKey, Spacings } from '@alveole/theme';
import {
  RNTamaguiViewNonStyleProps,
  styled,
  TamaguiElement,
  View as TamaguiView,
  ViewProps as TamaguiViewProps,
} from '@tamagui/core';
import React, { CSSProperties } from 'react';
import { BoxStyle } from './Box.types';

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
    mt: isSpacingKey(mt) ? Spacings[mt] : mt,
    mb: isSpacingKey(mb) ? Spacings[mb] : mb,
    ml: isSpacingKey(ml) ? Spacings[ml] : ml,
    mr: isSpacingKey(mr) ? Spacings[mr] : mr,
    m: isSpacingKey(m) ? Spacings[m] : m,
  };

  const paddings = {
    pt: isSpacingKey(pt) ? Spacings[pt] : pt,
    pb: isSpacingKey(pb) ? Spacings[pb] : pb,
    pl: isSpacingKey(pl) ? Spacings[pl] : pl,
    pr: isSpacingKey(pr) ? Spacings[pr] : pr,
    p: isSpacingKey(p) ? Spacings[p] : p,
  };

  const spacings = {
    gap: isSpacingKey(gap) ? Spacings[gap] : gap,
  };

  return (
    <StyledView
      ref={ref}
      tag={tag ?? 'box'}
      style={style}
      {...radius}
      hoverStyle={hoverStyle as any}
      {...viewProps}
      {...margins}
      {...paddings}
      {...spacings}
    />
  );
});
