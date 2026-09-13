import { Box } from '../../core/Box';
import { Story } from '../../type';
import { FormControl } from '../FormControl';
import { InputButtonAdornment } from './InputButtonAdornment';
import { useStyles } from './InputButtonAdornment.styles';

export default {
  title: 'InputButtonAdornment',
  tags: ['ui'],
  experimental: false,
  description: "Bouton icône avec bordure latérale, à placer en début ou fin d'input.",
  component: InputButtonAdornment,
  styleFn: useStyles,
} satisfies Story;

export const End = () => (
  <Box display="flex" flexDirection="column" gap={24}>
    <FormControl>
      <InputButtonAdornment icon="Eye" position="end" onPress={() => {}} />
    </FormControl>
    <FormControl>
      <InputButtonAdornment icon="X" position="end" onPress={() => {}} />
    </FormControl>
  </Box>
);

export const Start = () => (
  <FormControl>
    <InputButtonAdornment icon="Plus" position="start" onPress={() => {}} />
  </FormControl>
);

export * as Sources from './InputButtonAdornment.stories.sources';
