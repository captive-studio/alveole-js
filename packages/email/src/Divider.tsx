import { Hr } from '@react-email/components';
import { theme } from './theme';

export const Divider = () => (
  <Hr
    className="al-separateur"
    style={{ borderColor: theme.color.light.border['default-grey'], margin: `${theme.spacing('4W')}px 0` }}
  />
);
