import { DocumentViewerProps } from './DocumentViewer';
export type DocumentViewerToolbarState = {
  fileType: DocumentViewerProps['type'];
  rotation: 0 | 90 | 180 | 270;
  page?: number;
  totalPages?: number;
};
export type DocumentViewerToolbarProps = {
  title: string;
  state: DocumentViewerToolbarState;
  withChildren: boolean;
  onRotateLeft: () => void;
  onRotateRight: () => void;
  onPreviousPage?: () => void;
  onNextPage?: () => void;
};
export declare const DocumentViewerToolbar: (
  props: DocumentViewerToolbarProps,
) => import('react/jsx-runtime').JSX.Element;
//# sourceMappingURL=DocumentViewerToolbar.d.ts.map
