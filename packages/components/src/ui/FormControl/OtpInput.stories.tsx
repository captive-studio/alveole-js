import { Box } from '../../core/Box';
import { Story } from '../../type';
import { FormControl } from './FormControl';
import { OtpInput } from './OtpInput';
import { useStyles } from './OtpInput.styles';

export default {
  title: 'OtpInput',
  tags: ['ui'],
  experimental: false,
  description:
    'Champ OTP (code à 4 chiffres), nu : on le place dans un FormControl pour son libellé, son aide et sa validation.',
  component: OtpInput,
  styleFn: useStyles,
} satisfies Story;

export const Default = () => (
  <Box display="flex" flexDirection="column" gap="3W">
    <FormControl label="Code de vérification">
      <OtpInput numberOfDigits={4} onChange={() => {}} />
    </FormControl>
    <FormControl label="Avec erreur" error="Code invalide">
      <OtpInput numberOfDigits={4} onChange={() => {}} error="Code invalide" />
    </FormControl>
    <FormControl label="Avec succès" success="Code vérifié">
      <OtpInput numberOfDigits={4} onChange={() => {}} success="Code vérifié" />
    </FormControl>
    <FormControl label="Désactivé" disabled>
      <OtpInput numberOfDigits={4} onChange={() => {}} disabled />
    </FormControl>
  </Box>
);

export * as Sources from './OtpInput.stories.sources';
