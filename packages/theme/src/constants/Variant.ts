export const Variants = {
  Mobile: 'mobile',
  Tablet: 'tablet',
  Desktop: 'desktop',
} as const;

// helpers
export type VariantKey = keyof typeof Variants;
export type Variant = (typeof Variants)[VariantKey];
