export declare const Breakpoints: {
  readonly SM: 576;
  readonly MD: 768;
  readonly LG: 992;
  readonly XL: 1248;
};
export type BreakpointKey = keyof typeof Breakpoints;
export type Breakpoint = (typeof Breakpoints)[BreakpointKey];
export declare const breakpointToVariant: (width: number) => 'mobile' | 'tablet' | 'desktop';
//# sourceMappingURL=Breakpoint.d.ts.map
