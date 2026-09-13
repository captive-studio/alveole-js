import type { BoxProps } from '../../core/Box';

export type DocumentViewerRotation = 0 | 90 | 180 | 270;

export const isDocumentViewerRotation = (value: number): value is DocumentViewerRotation =>
  [0, 90, 180, 270].includes(value);

export type DocumentViewerProps = BoxProps & {
  type: 'image' | 'pdf';
  title: string;
  source: string;
  height?: BoxProps['height'];
  ChildrenProps?: Omit<BoxProps, 'children'>;
  pdfErrorLabel?: string;
};
