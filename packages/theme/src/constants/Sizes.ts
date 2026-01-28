export const Sizes = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 30,
  '4xl': 36,
  '5xl': 48,
  '6xl': 60,
  '7xl': 72,
  '8xl': 96,
  '9xl': 128,
} as const;

export const Heights = {
  xs: 16,
  sm: 20,
  md: 24,
  lg: 28,
  xl: 28,
  '2xl': 32,
  '3xl': 36,
  '4xl': 40,
  '5xl': '100%',
  '6xl': '100%',
  '7xl': '100%',
  '8xl': '100%',
  '9xl': '100%',
} as const;

// helpers
export type SizeKey = keyof typeof Sizes;
export type Size = (typeof Sizes)[SizeKey];
export type HeightKey = keyof typeof Heights;
export type Height = (typeof Heights)[HeightKey];
