import { makeStyles } from '@alveole/theme';

export const useStyles = makeStyles(({ externalPadding, text, color, spacing, radius, isVariant }) => {
  const paddingValue = externalPadding();

  return {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: isVariant('mobile') ? spacing('2W') : spacing('3W'),
      paddingTop: isVariant('mobile') ? 0 : spacing('3W'),
      paddingBottom: isVariant('mobile') ? 0 : spacing('3W'),
      paddingLeft: paddingValue,
      paddingRight: paddingValue,
      textAlign: 'center',
      height: isVariant('mobile') ? '100%' : undefined,
      width: '100%',
    },
    contenu: {
      display: 'flex',
      gap: spacing('2W'),
      alignItems: 'center',
      textAlign: 'center',
      flex: isVariant('mobile') ? 1 : undefined,
      justifyContent: 'center',
      width: '100%',
    },
    media: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: color.light.text['active-primary'],
      backgroundColor: color.light.background['alt-primary'],
      borderRadius: radius('full'),
      padding: spacing('075'),
    },
    messageEtDescription: {
      display: 'flex',
      flexDirection: 'column',
      gap: spacing('2W'),
      width: '100%',
      justifyContent: 'center',
    },
    title: {
      color: color.light.text['title-grey'],
      ...text.Titres['H6 - XXS'],
      textAlign: 'center',
    },
    description: {
      color: color.light.text['mention-grey'],
      ...text['Corps de texte'].SM.Regular,
      textAlign: 'center',
    },
    footer: {
      width: isVariant('mobile') ? '100%' : undefined,
      display: 'flex',
      flexDirection: 'column',
      gap: spacing('100'),
    },
  };
});
