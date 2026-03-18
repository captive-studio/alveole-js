import { Story } from '../../type/Story';
import { Box } from '../Box';
import { PdfViewer } from './PdfViewer';
import { useStyles } from './PdfViewer.styles';

export default {
  title: 'PdfViewer',
  tags: ['Composant'],
  experimental: false,
  description: "Affichage d'un document PDF. Utilise un iframe sur web et WebView sur mobile.",
  component: PdfViewer,
  styleFn: useStyles,
} satisfies Story;

const samplePdfUrl = 'https://upload.wikimedia.org/wikipedia/commons/1/13/Example.pdf';

export const Default = () => (
  <Box width={'100%'} height={600}>
    <PdfViewer source={samplePdfUrl} title="Document PDF exemple" />
  </Box>
);

export const WithHeaders = () => (
  <Box width={'100%'} height={600}>
    <PdfViewer
      source={samplePdfUrl}
      headers={{ Authorization: 'Bearer example-token' }}
      title="Document PDF avec headers"
    />
  </Box>
);

export const CustomTitle = () => (
  <Box width={'100%'} height={600}>
    <PdfViewer source={samplePdfUrl} title="Mon document personnalisé" />
  </Box>
);
