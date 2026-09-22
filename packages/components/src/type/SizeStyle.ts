export type Dimension = number | `${string}%`;

export type SizeStyle = {
  width?: Dimension;
  height?: Dimension;
  minW?: Dimension;
  maxW?: Dimension;
  minH?: Dimension;
  maxH?: Dimension;
};
