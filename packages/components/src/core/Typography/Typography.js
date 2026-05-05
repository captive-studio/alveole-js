import { styled, Text as TamaguiText } from '@tamagui/core';
import React from 'react';
import { jsx as _jsx } from 'react/jsx-runtime';
const StyledTypography = styled(TamaguiText, { name: 'Typography' });
export const Typography = React.forwardRef(function Typography(props, ref) {
  const { tag, style, textAlign, hoverStyle, ...textProps } = props;
  return _jsx(StyledTypography, {
    ref: ref,
    hoverStyle: hoverStyle,
    tag: tag ?? 'typography',
    style: style,
    textAlign: textAlign,
    ...textProps,
  });
});
