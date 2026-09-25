import { useState } from 'react';
import { Story } from '../../type';
import { FormControl } from './FormControl';
import { useStyles } from './FormControl.styles';
import { TextInput } from './TextInput';

export default {
  title: 'TextInput',
  tags: ['ui'],
  experimental: false,
  description:
    'Champ de saisie texte, nu : on le place dans un FormControl pour son libellé, son aide et sa validation.',
  component: TextInput,
  styleFn: useStyles,
} satisfies Story;

export const Default = () => (
  <FormControl label="Nom">
    <TextInput placeholder="Jean Dupont" />
  </FormControl>
);

export const Email = () => (
  <FormControl label="Adresse email">
    <TextInput type="email" placeholder="jean@exemple.fr" />
  </FormControl>
);

export const MotDePasse = () => (
  <FormControl label="Mot de passe">
    <TextInput type="password" placeholder="Votre mot de passe" />
  </FormControl>
);

export const NonModifiable = () => (
  <FormControl label="Adresse email">
    <TextInput type="email" value="jean@exemple.fr" editable={false} />
  </FormControl>
);

export const Multiline = () => (
  <FormControl label="Message">
    <TextInput placeholder="Votre message..." multiline numberOfLines={4} />
  </FormControl>
);

export const MultilineWithModal = () => {
  const [text, setText] = useState('');
  return (
    <FormControl label="Description">
      <TextInput
        value={text}
        onChangeText={setText}
        placeholder="Taper pour ouvrir la modale de saisie..."
        multiline
        openModal
        modalSubmitLabel="Confirmer"
      />
    </FormControl>
  );
};

export * as Sources from './TextInput.stories.sources';
