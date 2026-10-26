import { makeStyles } from '@alveole/theme';

export const useStyles = makeStyles(({ spacing, color, shadows, text }) => ({
  // Le reste de la coque (bordure, rayon, fond) vient de Card.
  repos: { ...shadows('raised') },
  survole: { ...shadows('overlap') },
  media: {
    width: '100%',
    aspectRatio: 16 / 9,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    backgroundColor: color.light.background['alt-grey'],
  },
  overlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    // Neutre 50 (#151617) à 40 %, valeur de la maquette : la palette n'a pas de voile.
    backgroundColor: 'rgba(21, 22, 23, 0.4)',
  },
  corps: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing('1,5V'),
  },
  type: {
    ...text['Corps de texte'].XS.Bold,
    color: color.light.text['inverted-grey'],
    backgroundColor: color.light.background['flat-error'],
    borderRadius: 3,
    paddingHorizontal: spacing('1V'),
    paddingVertical: 1,
  },
  nom: {
    ...text['Corps de texte'].XS.Regular,
    color: color.light.text['default-grey'],
    flexShrink: 1,
  },
}));
