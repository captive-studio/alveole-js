import { isSpacingKey, Spacings } from '@alveole/theme';
import { styled, View as TamaguiView } from '@tamagui/core';
import React from 'react';
import { jsx as _jsx } from 'react/jsx-runtime';
const StyledView = styled(TamaguiView, { name: 'Box' });
export const Box = React.forwardRef(function Box(props, ref) {
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
  return _jsx(StyledView, {
    ref: ref,
    tag: tag ?? 'box',
    style: style,
    ...radius,
    hoverStyle: hoverStyle,
    ...viewProps,
    ...margins,
    ...paddings,
    ...spacings,
  });
});
