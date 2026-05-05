import { type BoxProps } from '@alveole/components';
export type DocumentViewerRotation = 0 | 90 | 180 | 270;
export declare const isDocumentViewerRotation: (value: number) => value is DocumentViewerRotation;
export type DocumentViewerProps = BoxProps & {
  type: 'image' | 'pdf';
  title: string;
  source: string;
  height?: BoxProps['height'];
  ChildrenProps?: Omit<BoxProps, 'children'>;
};
export declare const DocumentViewer: (props: DocumentViewerProps) => import('react/jsx-runtime').JSX.Element;
//# sourceMappingURL=DocumentViewer.d.ts.map
