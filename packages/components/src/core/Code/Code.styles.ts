import { makeStyles, MonospaceFont } from '@alveole/theme';

export const useStyles = makeStyles(({ color, radius }) => {
  const texte = {
    ...MonospaceFont,
    color: color.light.text['default-error'],
  };
  const surface = {
    backgroundColor: 'rgba(135, 131, 120, 0.12)',
    paddingLeft: 4,
    paddingRight: 4,
    paddingTop: 2,
    paddingBottom: 2,
    borderRadius: radius('sm'),
  };

  return {
    code: { ...texte, ...surface },
    codeText: texte,
    codeSurface: {
      ...surface,
      // La ligne SM fait déjà 20 px : ajouter du padding vertical fait dépasser
      // la vue inline du paragraphe. Le décalage la recentre sur la ligne native.
      paddingTop: 0,
      paddingBottom: 0,
      transform: 'translateY(2px)',
    },
  };
});
