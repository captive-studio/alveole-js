import { makeStyles } from '@alveole/theme';

export const useStyles = makeStyles(({ color, text, radius, spacing }) => ({
  item: {
    display: 'flex',
    flexDirection: 'row',
    paddingLeft: spacing('2W'),
    paddingRight: spacing('2W'),
    alignItems: 'center',
    gap: spacing('3V'),
    alignSelf: 'stretch',
  },

  itemHover: {
    backgroundColor: color.alpha(color.light.background['alt-grey'], 0.75),
    borderRadius: radius('md'),
    cursor: 'pointer',
  },

  container: {
    display: 'flex',
    flexDirection: 'row',
    gap: spacing('3V'),
  },

  detail: {
    paddingTop: spacing('1W'),
    paddingBottom: spacing('1W'),
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
    gap: spacing('1W'),
    position: 'relative',
  },

  separateur: {
    left: 0,
    top: 0,
    position: 'absolute',
    width: '100%',
    height: 1,
    backgroundColor: color.light.border['default-grey'],
  },

  principal: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    flex: 1,
  },

  title: {
    color: color.light.text['default-grey'],
    ...text['Corps de texte'].SM.Regular,
  },

  description: {
    color: color.light.text['mention-grey'],
    ...text['Corps de texte'].XS.Regular,
  },

  additional: {},

  trailing: {
    display: 'flex',
    justifyContent: 'center',
    alignSelf: 'stretch',
    color: color.light.text['mention-grey'],
  },
  loading: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: color.primary,
  },

  defaultIcon: {
    color: color.light.text['mention-grey'],
  },

  previewContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderRadius: spacing('0,5V'),
  },

  preview: {
    width: 40,
    height: 40,
  },
}));
