import { makeStyles } from '@alveole/theme';
import { Platform } from 'react-native';

export const useStyles = makeStyles(() => ({
  metabase: {
    height: Platform.OS === 'web' ? '100%' : 600,
    width: '100%',
    flex: 1,
    background: '#ffffff',
    borderRadius: 10,
    boxSizing: 'border-box',
  },
}));
