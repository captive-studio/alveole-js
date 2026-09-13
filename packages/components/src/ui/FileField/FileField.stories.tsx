import { Box } from '../../core/Box';
import { Story } from '../../type';
import { FileField } from './FileField';
import { useStyles } from './FileField.styles';

export default {
  title: 'FileField',
  tags: ['ui'],
  experimental: false,
  description: 'Champ de sélection de fichier avec label et validation MIME.',
  component: FileField,
  styleFn: useStyles,
} satisfies Story;

export const Default = () => (
  <Box display="flex" flexDirection="column" gap={24}>
    <FileField label="Document" value={null} onChange={() => {}} />
    <FileField label="Image uniquement" type="image/*" value={null} onChange={() => {}} />
    <FileField label="Avec erreur" value={null} error="Ce champ est requis" onChange={() => {}} />
  </Box>
);

export const Multiple = () => <FileField label="Documents" value={null} multiple onChange={() => {}} />;

export * as Sources from './FileField.stories.sources';
