import { Story } from '../../type';
import { Button, TextInput } from '../../ui';
import { Form } from './Form';
import { useStyles } from './Form.styles';

export default {
  title: 'Form',
  tags: ['Kit'],
  experimental: false,
  description:
    'Empêche le clavier de cacher les TextInput sur iOS et permet de quitter le clavier au clique sur l’écran. Doit être utilisé pour contenir tous les fomulaires (pas de <form> en React Native).',
  component: Form,
  styleFn: useStyles,
} satisfies Story;

export const ExampleUsage = () => (
  <Form>
    <TextInput />
    <Button variant="primary" title="Valide" />
  </Form>
);
