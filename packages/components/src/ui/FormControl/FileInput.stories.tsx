import { useState } from 'react';
import { Box } from '../../core/Box';
import { Story } from '../../type';
import { FileInput, FileInputValue } from './FileInput';
import { useStyles } from './FileInput.styles';
import { FormControl } from './FormControl';

export default {
  title: 'FileInput',
  tags: ['ui'],
  experimental: false,
  description:
    'Sélection de fichier avec validation MIME, nue : on la place dans un FormControl pour son libellé, son aide et sa validation.',
  component: FileInput,
  styleFn: useStyles,
} satisfies Story;

export const Default = () => {
  const [file, setFile] = useState<FileInputValue>(null);
  return (
    <Box display="flex" flexDirection="column" gap={24}>
      <FormControl label="Document">
        <FileInput value={file} onChange={setFile} />
      </FormControl>
      <FormControl label="Image uniquement">
        <FileInput type="image/*" value={file} onChange={setFile} />
      </FormControl>
      <FormControl label="Avec erreur" error="Ce champ est requis">
        <FileInput value={null} onChange={() => {}} />
      </FormControl>
      <FormControl label="Désactivé" disabled>
        <FileInput value={null} onChange={() => {}} disabled />
      </FormControl>
    </Box>
  );
};

export const Multiple = () => {
  const [files, setFiles] = useState<FileInputValue>(null);
  return (
    <FormControl label="Documents">
      <FileInput value={files} onChange={setFiles} multiple />
    </FormControl>
  );
};

export * as Sources from './FileInput.stories.sources';
