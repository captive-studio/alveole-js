import { ButtonIcon } from '@alveole/components';
import { jsx as _jsx } from 'react/jsx-runtime';
export const ToolbarButton = props => {
  const { icon, disabled, onPress } = props;
  return _jsx(ButtonIcon, { variant: 'tertiary', icon: icon, disabled: disabled, onPress: onPress });
};
