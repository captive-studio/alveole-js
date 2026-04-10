import { makeStyles } from '@alveole/theme';

export const useStyles = makeStyles(({ text, color, spacing, radius }) => ({
  determinate: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressTrack: {
    width: '100%',
    overflow: 'hidden',
    position: 'relative',
  },
  progressed: {
    height: '100%',
    borderRadius: radius('sm'),
    backgroundColor: color.light.background['action-low-primary'],
  },
  progressedAbsolute: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    borderRadius: radius('sm'),
    backgroundColor: color.light.background['action-low-primary'],
  },
  remaining: {
    height: '100%',
    borderRadius: radius('sm'),
    backgroundColor: color.light.border['default-grey'],
  },
  remainingAbsolute: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    borderRadius: radius('sm'),
    backgroundColor: color.light.border['default-grey'],
  },
  progress: {
    backgroundColor: color.light.background['action-low-primary'],
    width: '100%',
    borderRadius: radius('sm'),
    overflow: 'hidden',
  },
  bar: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: '100%',
    borderRadius: radius('sm'),
    backgroundColor: color.light.border['default-grey'],
  },
  indicator: {
    ...text['Corps de texte'].XS.Regular,
    color: color.light.artwork['major-primary'],
    marginTop: spacing('1W'),
    marginLeft: 'auto',
    marginRight: 'auto',
  },
}));
