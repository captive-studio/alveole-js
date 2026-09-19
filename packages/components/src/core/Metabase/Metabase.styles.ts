import { makeStyles } from '@alveole/theme';
import { Platform } from 'react-native';

export const useStyles = makeStyles(({ radius }) => ({
  metabase: {
    height: Platform.OS === 'web' ? '100%' : 600,
    width: '100%',
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: radius('lg'),
    boxSizing: 'border-box',
  },
}));
