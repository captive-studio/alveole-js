import { Variants } from './Variant';
export const Breakpoints = {
  SM: 576,
  MD: 768,
  LG: 992,
  XL: 1248,
};
export const breakpointToVariant = width => {
  if (width < Breakpoints.MD) return Variants.Mobile;
  if (width >= Breakpoints.LG) return Variants.Desktop;
  return Variants.Tablet;
};
