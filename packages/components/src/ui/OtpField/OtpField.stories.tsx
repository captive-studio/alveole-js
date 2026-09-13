import { Box } from '../../core/Box';
import { Story } from '../../type';
import { OtpField } from './OtpField';
import { useStyles } from './OtpField.styles';

export default {
  title: 'OtpField',
  tags: ['ui'],
  experimental: false,
  description: 'Champ OTP (code à 4 chiffres) avec label.',
  component: OtpField,
  styleFn: useStyles,
} satisfies Story;

export const Default = () => (
  <Box display="flex" flexDirection="column" gap={24}>
    <OtpField label="Code de vérification" onChange={() => {}} />
    <OtpField label="Avec erreur" onChange={() => {}} error="Code invalide" />
    <OtpField label="Désactivé" onChange={() => {}} disabled />
  </Box>
);

export * as Sources from './OtpField.stories.sources';
