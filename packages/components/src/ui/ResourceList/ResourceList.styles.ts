import { makeStyles } from '@alveole/theme';

export const useStyles = makeStyles(({ color, text, radius, spacing, isVariant }) => ({
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing('1V'),
  },
  entete: {
    paddingTop: spacing('1V'),
    paddingBottom: spacing('1V'),
  },
  enteteTitle: {
    ...text['Corps de texte'].SM.Medium,
    color: color.light.text['label-grey'],
  },
  items: {
    borderRadius: radius('md'),
  },
  itemsWithWhiteBackground: {
    backgroundColor: '#FFFFFF',
  },
  withBorder: {
    borderWidth: 1,
    borderColor: color.border['default-grey'],
    borderLeftWidth: 1,
    borderRightWidth: 1,
  },
  noBorder: {
    borderWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing('4W'),
  },
  noContent: {
    display: 'flex',
    padding: spacing('4W'),
    flexDirection: 'column',
    alignItems: 'center',
    gap: spacing('5W'),
    borderRadius: isVariant('mobile') ? 0 : spacing('2W'),
    borderWidth: 1,
    borderColor: color.border['default-grey'],
    backgroundColor: '#FFFFFF',
    borderLeftWidth: isVariant('mobile') ? 0 : 1,
    borderRightWidth: isVariant('mobile') ? 0 : 1,
    width: '100%',
  },
  noContentIntro: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: spacing('2W'),
  },
  noContentText: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: spacing('1W'),
  },

  noContentTextTitle: {
    color: color.text['title-grey'],
    ...text.Titres['H6 - XXS'],
  },

  noContentTextDescription: {
    color: color.text['mention'],
    ...text['Corps de texte'].SM.Regular,
  },
}));
