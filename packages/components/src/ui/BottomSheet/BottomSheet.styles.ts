import { makeStyles, Spacings } from '@alveole/theme';

export const useStyles = makeStyles(({ spacing, text, color }) => ({
  container: {},
  content: {
    backgroundColor: '#FFFFFF',
    marginTop: spacing('2W'),
  },
  contentFull: {
    height: '100%',
  },
  header: {
    paddingLeft: spacing('2W'),
    paddingRight: spacing('2W'),
    display: 'flex',
    flexDirection: 'row',
  },
  handle: {
    width: '90%',
    margin: 'auto',
    height: Spacings['2W'],
    backgroundColor: '#FFFFFF',
  },
  frame: {
    backgroundColor: '#FFFFFF',
    marginBottom: spacing('3W'),
  },
  overlay: {
    backgroundColor: color.alpha(color.background.inverse, 0.5),
  },
  title: {
    ...text['Corps de texte'].LG.Medium,
    color: color.light.text['title-grey'],
    marginTop: 'auto',
    marginBottom: 'auto',
  },
}));
