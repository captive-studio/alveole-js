import { Box } from '../../core/Box';
import { Story } from '../../type';
import { DragAndDropFile } from './DragAndDropFile';
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

export const Default = () => (
  <Box display="flex" flexDirection="column" gap={24}>
    <DragAndDropFile label="Document" value={null} onChange={() => {}} />
    <DragAndDropFile label="Image uniquement" type="image/*" value={null} onChange={() => {}} />
  </Box>
);

export const Multiple = () => (
  <DragAndDropFile label="Documents (plusieurs)" multiple value={null} onChange={() => {}} />
);

export const WithError = () => (
  <DragAndDropFile label="Document" error="Format non supporté" value={null} onChange={() => {}} />
);

export * as Sources from './DragAndDropFile.stories.sources';
