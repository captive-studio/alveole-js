import { ReactNode } from 'react';
import { Box } from '../../core/Box';
import { Story } from '../../type';
import { FormControl, FormControlLabel } from '../FormControl';
import { InputHeading } from '../InputHeading';
import { TextareaInput } from './TextareaInput';

export default {
  title: 'TextareaInput',
  tags: ['ui'],
  experimental: false,
  description: 'Input multiline. Étend TextInput avec multiline activé par défaut.',
  component: TextareaInput,
  styleFn: () => ({}),
} satisfies Story;

// TextareaInput est le champ nu : c'est FormControl qui porte le libellé et le relie au
// champ. TextareaField fait cette composition pour vous ; la fiche la montre à découvert.
const Champ = ({ label, children }: { label: string; children: ReactNode }) => (
  <FormControl>
    <InputHeading>
      <FormControlLabel label={label} />
    </InputHeading>
    {children}
  </FormControl>
);

export const Default = () => (
  <Box display="flex" flexDirection="column" gap={24}>
    <Champ label="Message">
      <TextareaInput placeholder="Votre message..." numberOfLines={4} />
    </Champ>
    <Champ label="Avec valeur">
      <TextareaInput value="Contenu du message" numberOfLines={4} />
    </Champ>
    <Champ label="Désactivé">
      <TextareaInput placeholder="Désactivé" disabled numberOfLines={4} />
    </Champ>
  </Box>
);

export * as Sources from './TextareaInput.stories.sources';
