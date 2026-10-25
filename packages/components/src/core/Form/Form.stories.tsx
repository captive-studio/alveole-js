import { TextInput as RNTextInput } from 'react-native';
import { Story } from '../../type';
import { Box } from '../Box';
import { Form } from './Form';
import { useStyles } from './Form.styles';

export default {
  title: 'Form',
  tags: ['core'],
  experimental: false,
  description:
    "Ferme le clavier au clic en dehors d'un champ. Doit être utilisé pour contenir tous les formulaires (pas de `<form>` en React Native). Le scroll au-dessus du clavier est géré par [KeyboardAwareScrollView](https://docs.expo.dev/guides/keyboard-handling).",
  shortDescription: "Ferme le clavier au clic en dehors d'un champ. À utiliser pour contenir tous les formulaires.",
  component: Form,
  styleFn: useStyles,
} satisfies Story;

const inputStyle = { borderWidth: 1, borderColor: '#ccc', borderRadius: 4, padding: 8 };

/** Taper dans le champ — cliquer en dehors ferme le clavier. */
export const WithKeyboardAware = () => (
  <Form>
    <Box display="flex" flexDirection="column" gap="3V">
      <RNTextInput placeholder="Prénom" style={inputStyle} />
      <RNTextInput placeholder="Email" keyboardType="email-address" style={inputStyle} />
    </Box>
  </Form>
);

export * as Sources from './Form.stories.sources';
