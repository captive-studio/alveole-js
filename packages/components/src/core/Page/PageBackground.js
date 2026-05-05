import { Colors } from '@alveole/theme';
import { LinearGradient } from 'expo-linear-gradient';
import { jsx as _jsx } from 'react/jsx-runtime';
import { useStyles } from './Page.styles';
export const PageBackground = ({ children }) => {
  const styles = useStyles();
  return _jsx(LinearGradient, {
    colors: [Colors.Neutre['1000'], Colors.Neutre['975']],
    start: { x: 0.5, y: 0 },
    end: { x: 0.5, y: 1 },
    style: styles.gradientBackground,
    children: children,
  });
};
