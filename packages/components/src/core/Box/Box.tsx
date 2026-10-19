import {
  RNTamaguiViewNonStyleProps,
  styled,
  TamaguiElement,
  View as TamaguiView,
  ViewProps as TamaguiViewProps,
} from '@tamagui/core';
import React from 'react';
import { aplatirStyle } from '../styleTamagui/aplatirStyle';
import { definis } from '../styleTamagui/definis';
import { correctionFlexDuWeb } from '../styleTamagui/flexDuWeb';
import { BoxStyle } from './Box.types';
import { resolveSpacing } from './resolveSpacing';

// Les props de style de Tamagui passent telles quelles, clauses comprises (`bg="x hover:y"`,
// ADR 0031) : la doc officielle de Tamagui v3 s'applique a Box sans traduction. Seules les
// props dont Alveole fixe le sens (espacements du theme, rayon, `tag`) restent les siennes.
export type BoxProps = Omit<TamaguiViewProps, keyof BoxStyle | 'tag' | 'style'> &
  Omit<RNTamaguiViewNonStyleProps, 'tag'> &
  BoxStyle & {
    // Possede ici et non herite de Tamagui, qui retire `tag` en v2 : le passage a Tamagui
    // se fait en un seul endroit, dans le rendu ci-dessous.
    tag?: string;
  };

const StyledView = styled(TamaguiView, { name: 'Box' });
export type BoxElement = TamaguiElement;

export const Box = React.forwardRef<BoxElement, BoxProps>(function Box(props, ref) {
  const { tag, style, borderRadius, mt, mb, mr, ml, m, pt, pb, pl, pr, p, gap, ...viewProps } = props;
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

  const correctionFlex = correctionFlexDuWeb(style);

  return (
    <StyledView
      ref={ref}
      render={tag ?? 'box'}
      style={correctionFlex ? { ...aplatirStyle(style), ...correctionFlex } : style}
      {...radius}
      {...viewProps}
      {...definis(margins)}
      {...definis(paddings)}
      {...definis(spacings)}
    />
  );
});
