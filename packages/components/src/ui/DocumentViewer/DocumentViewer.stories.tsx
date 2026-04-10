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

export const DocumentImage = () => (
  <Box maxW={500}>
    <DocumentViewer title="Document image" type="image" source="https://picsum.photos/1000/2000" height={600} />
  </Box>
);

export const DocumentPdf = () => (
  <Box maxW={500}>
    <DocumentViewer
      title="Document PDF"
      type="pdf"
      source="https://ontheline.trincoll.edu/images/bookdown/sample-local-pdf.pdf"
      height={600}
    />
  </Box>
);

export const WithChildren = () => (
  <Box>
    <DocumentViewer
      title="Document PDF"
      type="pdf"
      source="https://ontheline.trincoll.edu/images/bookdown/sample-local-pdf.pdf"
      height={600}
    >
      <Box p={'2W'} minW={600}>
        <Typography>Contenu enfant</Typography>
      </Box>
    </DocumentViewer>
  </Box>
);
