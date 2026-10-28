import { useState } from 'react';
import { Box } from '../../core/Box';
import { Typography } from '../../core/Typography';
import { Story } from '../../type';
import { Button } from '../Button';
import { DateInput as DateInputControl } from '../DateInput';
import { TimeInput } from '../TimeInput';
import { FormControl } from './FormControl';
import { useStyles } from './FormControl.styles';
import { FormControlCaption } from './FormControlCaption';
import { FormControlHint } from './FormControlHint';
import { FormControlLabel } from './FormControlLabel';
import { FormControlModal } from './FormControlModal';
import { TextInput } from './TextInput';

export default {
  title: 'FormControl',
  tags: ['ui'],
  experimental: false,
  description: 'Eléments de construction de champs de saisie (label, input, helper text).',
  component: FormControl,
  styleFn: useStyles,
} satisfies Story;

export const WithTextInput = () => (
  <FormControl label="Adresse email" hint="Votre email professionnel" required>
    <TextInput type="email" placeholder="jean@exemple.fr" />
  </FormControl>
);

export const WithError = () => (
  <FormControl label="Adresse email" error="Format invalide">
    <TextInput type="email" placeholder="jean@exemple.fr" error="Format invalide" />
  </FormControl>
);

export const WithSuccess = () => (
  <FormControl label="Adresse email" success="Email valide">
    <TextInput type="email" placeholder="jean@exemple.fr" success="Email valide" />
  </FormControl>
);

export const Label = () => (
  <Box display="flex" flexDirection="column" gap="3W">
    <FormControlLabel label="Label par defaut" />
    <FormControlLabel label="Desactive" disabled />
    <FormControlLabel label="Avec badge" labelRight={<Typography>Optionnel</Typography>} />
  </Box>
);

export const Caption = () => (
  <Box display="flex" flexDirection="column" gap="3W">
    <FormControlCaption error="Champ requis" />
    <FormControlCaption success="Valeur correcte" />
  </Box>
);

export const Hint = () => (
  <Box display="flex" flexDirection="column" gap="3W">
    <FormControlHint hint="Texte descriptif du champ" />
    <FormControlHint hint="Texte desactive" disabled />
  </Box>
);

export const Modal = () => {
  const [open, setOpen] = useState(false);
  return (
    <Box>
      <Button variant="secondary" title="Ouvrir la modale" onPress={() => setOpen(true)} />
      <FormControlModal
        open={open}
        onClose={() => setOpen(false)}
        submitLabel="Valider"
        onSubmit={() => setOpen(false)}
      >
        <TextInput placeholder="Saisir un texte..." multiline numberOfLines={6} />
      </FormControlModal>
    </Box>
  );
};

export const DateInput = () => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [month, setMonth] = useState('');
  return (
    <Box display="flex" flexDirection="column" gap="3V">
      <FormControl label="Date">
        <DateInputControl type="date" value={date} onChange={setDate} />
      </FormControl>
      <FormControl label="Heure">
        <TimeInput value={time} onChange={setTime} />
      </FormControl>
      <FormControl label="Mois">
        <DateInputControl type="month" value={month} onChange={setMonth} />
      </FormControl>
    </Box>
  );
};

export * as Sources from './FormControl.stories.sources';
