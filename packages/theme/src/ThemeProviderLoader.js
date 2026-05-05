import { ActivityIndicator, View } from 'react-native';
import { jsx as _jsx } from 'react/jsx-runtime';
export const ThemeProviderLoader = () => {
  return _jsx(View, {
    style: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    children: _jsx(ActivityIndicator, { size: 'large' }),
  });
};
