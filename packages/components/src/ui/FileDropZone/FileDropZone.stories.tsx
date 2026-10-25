import { useState } from 'react';
import { Box } from '../../core/Box';
import { Story } from '../../type';
import { FileInput, FileInputValue, FormControl, TextInput } from '../FormControl';
import { FileDropZone } from './FileDropZone';
import { useStyles } from './FileDropZone.styles';

export default {
  title: 'FileDropZone',
  tags: ['ui'],
  experimental: false,
  webOnly: true,
  description:
    "Zone de dépôt : enveloppe une région (souvent tout un formulaire) sur laquelle on peut glisser-déposer des fichiers. Se branche sur le même état que le FileInput du formulaire. À réserver aux formulaires qui n'ont qu'un seul champ de fichier : avec plusieurs FileInput, l'utilisateur ne peut pas savoir lequel recevra le fichier déposé.",
  component: FileDropZone,
  styleFn: useStyles,
} satisfies Story;

export const Formulaire = () => {
  const [titre, setTitre] = useState('');
  const [fichiers, setFichiers] = useState<FileInputValue>(null);
  return (
    <FileDropZone value={fichiers} onChange={setFichiers} multiple>
      <Box display="flex" flexDirection="column" gap="2W" p="2W">
        <FormControl label="Titre">
          <TextInput value={titre} onChangeText={setTitre} />
        </FormControl>
        <FormControl label="Pièces jointes" hint="Glissez des fichiers n'importe où sur le formulaire.">
          <FileInput value={fichiers} onChange={setFichiers} multiple />
        </FormControl>
      </Box>
    </FileDropZone>
  );
};

export const Desactivee = () => {
  const [fichiers, setFichiers] = useState<FileInputValue>(null);
  return (
    <FileDropZone value={fichiers} onChange={setFichiers} multiple disabled>
      <Box p="2W">
        <FormControl label="Pièces jointes" disabled>
          <FileInput value={fichiers} onChange={setFichiers} multiple disabled />
        </FormControl>
      </Box>
    </FileDropZone>
  );
};

export const MessagePersonnalise = () => {
  const [photo, setPhoto] = useState<FileInputValue>(null);
  return (
    <FileDropZone value={photo} onChange={setPhoto} type="image/*" message="Lâchez la photo pour l'ajouter">
      <Box p="2W">
        <FormControl label="Photo">
          <FileInput value={photo} onChange={setPhoto} type="image/*" />
        </FormControl>
      </Box>
    </FileDropZone>
  );
};

export * as Sources from './FileDropZone.stories.sources';
