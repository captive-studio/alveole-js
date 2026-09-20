import { makeStyles } from '@alveole/theme';

export const useStyles = makeStyles(({ radius, text, color, pill }) => ({
  tagContainer: {
    display: 'block',
  },
  tag: {
    display: 'inline-flex',
    alignItems: 'center',
    borderRadius: radius('full'),
  },

  // Colors
  tagDefault: {
    color: color.light.text['label-grey'],
    backgroundColor: color.light.background['contrast-grey'],
  },
  tagAction: {
    color: color.light.text['label-grey'],
    backgroundColor: color.light.background['action-low-primary'],
  },

  // Sizes
  // Aucun retrait vertical : la hauteur est fixee et le libelle centre par `alignItems`.
  // Un padding vertical en plus ne ferait que rouvrir la porte a une hauteur implicite.
  tagSm: {
    height: pill('sm').height,
    paddingLeft: pill('sm').paddingInline,
    paddingRight: pill('sm').paddingInline,
    ...text['Corps de texte'].XS.Bold,
  },
  tagMd: {
    height: pill('md').height,
    paddingLeft: pill('md').paddingInline,
    paddingRight: pill('md').paddingInline,
    ...text['Corps de texte'].SM.Bold,
  },
}));
