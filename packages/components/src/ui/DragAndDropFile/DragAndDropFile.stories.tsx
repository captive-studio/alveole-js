import { useState } from 'react';
import { Box } from '../../core/Box';
import { Story } from '../../type';
import { DragAndDropFile, DragAndDropFileValue } from './DragAndDropFile';
import { useStyles } from './DragAndDropFile.styles';

export default {
  title: 'DragAndDropFile',
  tags: ['ui'],
  experimental: false,
  webOnly: true,
  description: 'Zone de dépôt de fichiers par glisser-déposer ou clic.',
  component: DragAndDropFile,
  styleFn: useStyles,
} satisfies Story;

export const Default = () => {
  const [document, setDocument] = useState<DragAndDropFileValue>(null);
  const [image, setImage] = useState<DragAndDropFileValue>(null);
  return (
    <Box display="flex" flexDirection="column" gap={24}>
      <DragAndDropFile label="Document" value={document} onChange={setDocument} />
      <DragAndDropFile label="Image uniquement" type="image/*" value={image} onChange={setImage} />
    </Box>
  );
};

export const Multiple = () => {
  const [files, setFiles] = useState<DragAndDropFileValue>(null);
  return <DragAndDropFile label="Documents (plusieurs)" multiple value={files} onChange={setFiles} />;
};

export const AvecFichiersEnregistres = () => {
  const [files, setFiles] = useState<DragAndDropFileValue>([
    {
      id: '1',
      persisted: true,
      uri: 'https://example.com/devis.pdf',
      name: 'devis.pdf',
      mimeType: 'application/pdf',
      lastModified: 0,
    },
  ]);
  return <DragAndDropFile label="Pièces jointes" multiple value={files} onChange={setFiles} />;
};

export const WithError = () => (
  <DragAndDropFile label="Document" error="Format non supporté" value={null} onChange={() => {}} />
);

export * as Sources from './DragAndDropFile.stories.sources';
