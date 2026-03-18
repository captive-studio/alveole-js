import { Box } from '../Box';

import type { PdfViewerProps } from './PdfViewer.props';

export const PdfViewer = (props: PdfViewerProps) => {
  const { source, title = 'Document PDF' } = props;

  return (
    <Box flex={1}>
      <iframe src={source} style={{ width: '100%', height: '100%', border: 'none' }} title={title} />
    </Box>
  );
};
