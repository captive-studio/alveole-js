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
  message: {
    ...text['Corps de texte'].MD.Bold,
    backgroundColor: color.light.background['default-grey'],
    borderRadius: radius('lg'),
    paddingHorizontal: spacing('2W'),
    paddingVertical: spacing('1W'),
    color: color.light.text['default-info'],
  },
}));
