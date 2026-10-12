import { makeStyles } from '@alveole/theme';

export const useStyles = makeStyles(({ color, radius, spacing, text }) => ({
  conteneur: {
    position: 'relative',
  },
  // Posee sur le contenu sans le deplacer ni capter les clics : le formulaire reste lisible dessous.
  surcouche: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: color.light.border['plain-info'],
    borderRadius: radius('lg'),
    backgroundColor: color.alpha(color.light.background['flat-info'], 0.1),
    alignItems: 'center',
    justifyContent: 'center',
    pointerEvents: 'none',
  },
  // Pastille opaque : le message reste lisible quel que soit le champ qu'il recouvre.
  pastille: {
    backgroundColor: color.light.background['default-grey'],
    borderRadius: radius('lg'),
    paddingLeft: spacing('2W'),
    paddingRight: spacing('2W'),
    paddingTop: spacing('1W'),
    paddingBottom: spacing('1W'),
  },
  message: {
    ...text['Corps de texte'].MD.Bold,
    color: color.light.text['default-info'],
  },
}));
