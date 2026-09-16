import { makeStyles } from '@alveole/theme';

export const useStyles = makeStyles(({ color, radius, spacingValue }) => {
  const base = {
    overflow: 'scroll' as const,
    padding: spacingValue('2W'),
    width: '100%' as const,
    backgroundColor: color.light.background['alt-grey'],
  };

  return {
    highlightContainer: {
      width: '100%',
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
