export declare const Sizes: {
  readonly xs: 12;
  readonly sm: 14;
  readonly md: 16;
  readonly lg: 18;
  readonly xl: 20;
  readonly '2xl': 24;
  readonly '3xl': 30;
  readonly '4xl': 36;
  readonly '5xl': 48;
  readonly '6xl': 60;
  readonly '7xl': 72;
  readonly '8xl': 96;
  readonly '9xl': 128;
};
export declare const Heights: {
  readonly xs: 16;
  readonly sm: 20;
  readonly md: 24;
  readonly lg: 28;
  readonly xl: 28;
  readonly '2xl': 32;
  readonly '3xl': 36;
  readonly '4xl': 40;
  readonly '5xl': '100%';
  readonly '6xl': '100%';
  readonly '7xl': '100%';
  readonly '8xl': '100%';
  readonly '9xl': '100%';
};
export type SizeKey = keyof typeof Sizes;
export type Size = (typeof Sizes)[SizeKey];
export type HeightKey = keyof typeof Heights;
export type Height = (typeof Heights)[HeightKey];
//# sourceMappingURL=Sizes.d.ts.map
