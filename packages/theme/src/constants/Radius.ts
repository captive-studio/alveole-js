export const RadiusList = {
  sm: 4,
  md: 6,
  lg: 10,
  full: 99999,
} as const;

// helpers
export type RadiusKey = keyof typeof RadiusList;
export type Radius = (typeof RadiusList)[RadiusKey];
