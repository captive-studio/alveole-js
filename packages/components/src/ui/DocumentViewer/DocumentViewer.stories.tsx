import { Box, Story, Typography } from '@alveole/components';
import { DocumentViewer } from './DocumentViewer';
import { useStyles } from './DocumentViewer.styles';

export default {
  title: 'DocumentViewer',
  tags: ['Kit'],
  experimental: false,
  webOnly: true,
  description: 'Viewer de documents (PDF, Image)',
  component: DocumentViewer,
  styleFn: useStyles,
} satisfies Story;

export const DocumentImageEx = () => (
  <Box maxW={500} height={500}>
    <DocumentViewer title="Document image" type="image" source="https://picsum.photos/1000/2000" height="100%" />
  </Box>
);

export const DocumentPdf = () => (
  <Box height={400} maxW={500}>
    <DocumentViewer
      title="Document PDF"
      type="pdf"
      source="https://ontheline.trincoll.edu/images/bookdown/sample-local-pdf.pdf"
      height="100%"
    />
  </Box>
);

export const WithChildren = () => (
  <Box height={600}>
    <DocumentViewer
      title="Document PDF"
      type="pdf"
      source="https://ontheline.trincoll.edu/images/bookdown/sample-local-pdf.pdf"
      height="100%"
    >
      <Box p={'2W'} minW={600}>
        <Typography>Contenu enfant</Typography>
      </Box>
    </DocumentViewer>
  </Box>
);

export * as Sources from './DocumentViewer.stories.sources';
