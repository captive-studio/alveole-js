import { Box, type BoxProps } from '../../core/Box';
import { Typography } from '../../core/Typography';
import { DocumentViewerRotation } from './DocumentViewer';
import { useStyles } from './DocumentViewer.styles';

export type DocumentViewerPDFProps = {
  source: string;
  page: number;
  height?: BoxProps['height'];
  rotation: DocumentViewerRotation;
  scale?: number;
  onReady?: (_state: { numPages: number }) => void;
  errorLabel?: string;
};

export const DocumentViewerPDF = (props: DocumentViewerPDFProps) => {
  const { height = '100%' } = props;
  const styles = useStyles();

  return (
    <Box tag="document-viewer-pdf" width={'100%'} height={height} style={styles.viewerPdfContent}>
      <Box
        width={'100%'}
        height={'100%'}
        p={'1V'}
        style={[
          styles.viewerPdfStage,
          {
            alignItems: 'center',
            justifyContent: 'center',
          },
        ]}
      >
        <Typography>Not implemented</Typography>
      </Box>
    </Box>
  );
};
