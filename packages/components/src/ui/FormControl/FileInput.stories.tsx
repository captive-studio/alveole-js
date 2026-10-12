import { useState } from 'react';
import { Story } from '../../type';
import { FileInput, FileInputValue } from './FileInput';
import { useStyles } from './FileInput.styles';
import { FormControl } from './FormControl';

export default {
  title: 'FileInput',
  tags: ['ui'],
  experimental: false,
  description:
    "Sélection de fichiers avec validation MIME et liste des fichiers choisis. Sur natif, propose galerie, appareil photo ou document. Nue : on la place dans un FormControl pour son libellé, son aide et sa validation. Pour déposer des fichiers sur tout un formulaire (web), l'envelopper dans une [FileDropZone](/components/FileDropZone).",
  component: FileInput,
  styleFn: useStyles,
} satisfies Story;

export const Default = () => {
  const [file, setFile] = useState<FileInputValue>(null);
  return (
    <FormControl label="Document">
      <FileInput value={file} onChange={setFile} />
    </FormControl>
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

export const ImagesSeulement = () => {
  const [files, setFiles] = useState<FileInputValue>(null);
  return (
    <FormControl label="Photos" hint="Formats acceptés : JPG, PNG">
      <FileInput type="image/*" value={files} onChange={setFiles} multiple />
    </FormControl>
  );
};

export const AvecFichiersEnregistres = () => {
  const [files, setFiles] = useState<FileInputValue>([
    {
      id: '1',
      persisted: true,
      uri: 'https://picsum.photos/id/10/200',
      name: 'photo-chantier.jpg',
      mimeType: 'image/jpeg',
      lastModified: 0,
    },
    {
      id: '2',
      persisted: true,
      uri: 'https://example.com/devis.pdf',
      name: 'devis.pdf',
      mimeType: 'application/pdf',
      lastModified: 0,
    },
  ]);
  return (
    <FormControl label="Pièces jointes" hint="Un fichier enregistré retiré reste dans la valeur, marqué removed.">
      <FileInput value={files} onChange={setFiles} multiple />
    </FormControl>
  );
};

export const LibellesPersonnalises = () => {
  const [file, setFile] = useState<FileInputValue>(null);
  return (
    <FormControl label="Attachment">
      <FileInput
        value={file}
        onChange={setFile}
        labels={{ addFile: 'Add a file', gallery: 'Gallery', camera: 'Camera', document: 'Document', cancel: 'Cancel' }}
      />
    </FormControl>
  );
};

export const Desactive = () => (
  <FormControl label="Document" disabled>
    <FileInput
      value={{
        uri: 'https://example.com/contrat.pdf',
        name: 'contrat.pdf',
        mimeType: 'application/pdf',
        lastModified: 0,
      }}
      onChange={() => {}}
      disabled
    />
  </FormControl>
);

export const NonRetirable = () => (
  <FormControl label="Justificatif">
    <FileInput
      value={{
        id: '3',
        persisted: true,
        uri: 'https://example.com/justificatif.pdf',
        name: 'justificatif.pdf',
        mimeType: 'application/pdf',
        lastModified: 0,
      }}
      onChange={() => {}}
      removable={false}
    />
  </FormControl>
);

export * as Sources from './FileInput.stories.sources';
