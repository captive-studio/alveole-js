import {
  Box,
  Button,
  Checkbox,
  FileDropZone,
  FileInput,
  type FileInputValue,
  Form,
  FormControl,
  Select,
  TextInput,
} from '@alveole/components';
import React, { useState } from 'react';

// Les démos de la page Formulaires. Le code affiché sous chaque démo est extrait de ce fichier
// par generate:sources : ce que la page montre est ce qui tourne.

export const Anatomie = () => {
  const [email, setEmail] = useState('jean@');
  const error = email.includes('.') ? undefined : 'Adresse email invalide';
  return (
    <FormControl label="Adresse email" hint="Votre email professionnel" error={error} required>
      <TextInput type="email" value={email} onChangeText={setEmail} error={error} />
    </FormControl>
  );
};

const PAYS = [
  { value: 'fr', label: 'France' },
  { value: 'be', label: 'Belgique' },
];

export const FormulaireDeBase = () => {
  const [nom, setNom] = useState('');
  const [pays, setPays] = useState<string | null>(null);
  const [cgu, setCgu] = useState(false);
  const [envoi, setEnvoi] = useState(false);

  const soumettre = () => {
    setEnvoi(true);
    setTimeout(() => setEnvoi(false), 1500);
  };

  return (
    <Form>
      <Box display="flex" flexDirection="column" gap="2W">
        <FormControl label="Nom" required>
          <TextInput value={nom} onChangeText={setNom} />
        </FormControl>
        <FormControl label="Pays">
          <Select placeholder="Choisir..." options={PAYS} value={pays} onChange={setPays} />
        </FormControl>
        <Checkbox label="J'accepte les conditions" checked={cgu} onCheckedChange={c => setCgu(c === true)} />
        <Button type="submit" variant="primary" title="Envoyer" isLoading={envoi} disabled={!cgu} onPress={soumettre} />
      </Box>
    </Form>
  );
};

export const Validation = () => {
  const [email, setEmail] = useState('');
  const [soumis, setSoumis] = useState(false);
  // L'erreur n'apparaît qu'après la première soumission : on ne reproche pas un champ pas encore rempli.
  const error = soumis && !email.includes('@') ? 'Adresse email invalide' : undefined;
  const success = soumis && !error ? 'Adresse valide' : undefined;

  return (
    <Form>
      <Box display="flex" flexDirection="column" gap="2W">
        <FormControl label="Adresse email" error={error} success={success} required>
          <TextInput type="email" value={email} onChangeText={setEmail} error={error} success={success} />
        </FormControl>
        <Button type="submit" variant="primary" title="Valider" onPress={() => setSoumis(true)} />
      </Box>
    </Form>
  );
};

export const Fichiers = () => {
  const [pieces, setPieces] = useState<FileInputValue>(null);
  return (
    <FileDropZone value={pieces} onChange={setPieces} multiple>
      <Box p="2W">
        <FormControl label="Pièces jointes" hint="Glissez des fichiers n'importe où sur le formulaire.">
          <FileInput value={pieces} onChange={setPieces} multiple />
        </FormControl>
      </Box>
    </FileDropZone>
  );
};

export const Clavier = () => {
  const prenom = React.useRef<React.ComponentRef<typeof TextInput>>(null);
  return (
    <Form>
      <Box display="flex" flexDirection="column" gap="2W">
        <FormControl label="Nom">
          <TextInput returnKeyType="next" submitBehavior="submit" onSubmitEditing={() => prenom.current?.focus()} />
        </FormControl>
        <FormControl label="Prénom">
          <TextInput ref={prenom} returnKeyType="done" />
        </FormControl>
      </Box>
    </Form>
  );
};

export * as Sources from './formulaires.stories.sources';
