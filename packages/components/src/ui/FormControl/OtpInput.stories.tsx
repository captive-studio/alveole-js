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
  <Box display="flex" flexDirection="column" gap={24}>
    <FormControl label="Code de vérification">
      <OtpInput onChange={() => {}} />
    </FormControl>
    <FormControl label="Avec erreur" error="Code invalide">
      <OtpInput onChange={() => {}} error="Code invalide" />
    </FormControl>
    <FormControl label="Avec succès" success="Code vérifié">
      <OtpInput onChange={() => {}} success="Code vérifié" />
    </FormControl>
    <FormControl label="Désactivé" disabled>
      <OtpInput onChange={() => {}} disabled />
    </FormControl>
  </Box>
);

export * as Sources from './OtpInput.stories.sources';
