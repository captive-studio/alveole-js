import { makeStyles } from '@alveole/theme';

export const useStyles = makeStyles(({ color, text, spacing, spacingValue, isVariant, shadows }) => ({
  container: {
    backgroundColor: isVariant('mobile') ? color.light.background['default-grey'] : color.light.background['alt-grey'],
    ...(isVariant('mobile')
      ? shadows('raised')
      : { borderBottomWidth: 1, borderBottomColor: color.light.border['default-grey'] }),
    position: 'sticky',
    top: 0,
    zIndex: 100,
    width: '100%',
  },
  inner: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: isVariant('mobile') ? spacingValue('8W') - spacingValue('1W') : spacingValue('8W'),
    gap: spacing('3W'),
    paddingLeft: spacing('2W'),
    paddingRight: spacing('2W'),
  },
  identity: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing('1W'),
  },
  titleText: {
    ...text['Corps de texte'].SM.Bold,
    color: color.light.text['title-grey'],
    display: isVariant('mobile') ? ('none' as const) : ('flex' as const),
  },
  right: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
}));
