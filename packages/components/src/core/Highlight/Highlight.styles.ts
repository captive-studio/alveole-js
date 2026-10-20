import { makeStyles } from '@alveole/theme';
import { Platform } from 'react-native';

export const useStyles = makeStyles(({ color, radius, spacingValue }) => {
  const base = {
    overflow: 'scroll' as const,
    padding: spacingValue(Platform.OS === 'web' ? '2W' : '1W'),
    minWidth: '100%' as const,
    flexGrow: 1,
    flexShrink: 0,
    backgroundColor: color.light.background['alt-grey'],
  };

  return {
    highlightContainer: {
      width: '100%',
      flexGrow: 0,
      flexShrink: 0,
      backgroundColor: color.light.background['alt-grey'],
    },
    highlightContainerStandalone: {
      borderRadius: radius('md'),
    },
    code: {
      flexShrink: 0,
      ...(Platform.OS === 'web' && { whiteSpace: 'pre' as const }),
    },
    highlight: {
      ...base,
      borderRadius: radius('md'),
      borderWidth: 1,
      borderColor: color.light.border['default-grey'],
    },
    // Composé dans un cadre qui le délimite déjà : ni bordure ni rayon, sinon deux bordures
    // s'emboîtent et le coin arrondi intérieur découpe celui du cadre.
    highlightEmbedded: base,
  };
});
