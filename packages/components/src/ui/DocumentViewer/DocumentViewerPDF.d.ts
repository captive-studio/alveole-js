import { BoxProps } from '@alveole/components';
import type { PDFDocumentProxy } from 'pdfjs-dist';
import 'pdfjs-dist/legacy/build/pdf.worker.min.mjs';
import { DocumentViewerRotation } from './DocumentViewer';
export type DocumentViewerPDFProps = {
  source: string;
  page: number;
  height?: BoxProps['height'];
  rotation: DocumentViewerRotation;
  scale?: number;
  onReady?: (state: PDFDocumentProxy) => void;
};
export declare const DocumentViewerPDF: (props: DocumentViewerPDFProps) => import('react/jsx-runtime').JSX.Element;
//# sourceMappingURL=DocumentViewerPDF.d.ts.map
