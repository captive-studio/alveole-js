import { Story } from '../../type/Story';
import { TextInput } from './TextInput';
import { useStyles } from './TextInput.style';

export default {
  title: 'TextInput',
  tags: ['Composant'],
  experimental: false,
  figmaURL:
    'https://www.figma.com/design/xJz8Z6vfrnZPKTtRbuT2W8/Alveole---Composants?node-id=1002-550',
  description:
    "Le TextInput par défaut. À ne pas confondre avec le TextField qui lui englobe le Label, les erreurs, etc...",
  component: TextInput,
  styleFn: useStyles,
} satisfies Story;

export const Default = () => <TextInput placeholder="Placeholder" />;
