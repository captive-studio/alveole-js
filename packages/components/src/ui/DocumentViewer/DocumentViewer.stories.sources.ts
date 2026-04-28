// This file is generated. Do not edit manually.
// Source: src/ui/DocumentViewer/DocumentViewer.stories.tsx

export const DocumentImageEx = () => "export const DocumentImageEx = () => (\n  <Box maxW={500} height={500}>\n    <DocumentViewer title=\"Document image\" type=\"image\" source=\"https://picsum.photos/1000/2000\" height=\"100%\" />\n  </Box>\n);";

export const DocumentPdf = () => "export const DocumentPdf = () => (\n  <Box height={400} maxW={500}>\n    <DocumentViewer\n      title=\"Document PDF\"\n      type=\"pdf\"\n      source=\"https://ontheline.trincoll.edu/images/bookdown/sample-local-pdf.pdf\"\n      height=\"100%\"\n    />\n  </Box>\n);";

export const WithChildren = () => "export const WithChildren = () => (\n  <Box height={600}>\n    <DocumentViewer\n      title=\"Document PDF\"\n      type=\"pdf\"\n      source=\"https://ontheline.trincoll.edu/images/bookdown/sample-local-pdf.pdf\"\n      height=\"100%\"\n    >\n      <Box p={'2W'} minW={600}>\n        <Typography>Contenu enfant</Typography>\n      </Box>\n    </DocumentViewer>\n  </Box>\n);";

export const storySources = {
  DocumentImageEx,
  DocumentPdf,
  WithChildren,
} as const;

export type StorySourceName = keyof typeof storySources;
