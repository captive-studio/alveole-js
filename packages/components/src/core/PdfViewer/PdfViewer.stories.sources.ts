// This file is generated. Do not edit manually.
// Source: src/core/PdfViewer/PdfViewer.stories.tsx

export const Default = () =>
  'export const Default = () => (\n  <Box width={\'100%\'} height={600}>\n    <PdfViewer source={samplePdfUrl} title="Document PDF exemple" />\n  </Box>\n);';

export const WithHeaders = () =>
  "export const WithHeaders = () => (\n  <Box width={'100%'} height={600}>\n    <PdfViewer\n      source={samplePdfUrl}\n      headers={{ Authorization: 'Bearer example-token' }}\n      title=\"Document PDF avec headers\"\n    />\n  </Box>\n);";

export const CustomTitle = () =>
  'export const CustomTitle = () => (\n  <Box width={\'100%\'} height={600}>\n    <PdfViewer source={samplePdfUrl} title="Mon document personnalisé" />\n  </Box>\n);';

export const storySources = {
  Default,
  WithHeaders,
  CustomTitle,
} as const;

export type StorySourceName = keyof typeof storySources;
