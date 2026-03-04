import { makeStyles } from '@alveole/theme';

export const useStyles = makeStyles(({ isVariant, spacing }) => {
  const paddingValue = isVariant('mobile') ? spacing('100') : spacing('150');

  return {
    section: {
      display: 'flex',
      flexDirection: 'row',
      gap: spacing('075'),
      justifyContent: 'center',
      paddingLeft: paddingValue,
      paddingRight: paddingValue,
    },
    sectionWithPaddingY: {
      paddingTop: paddingValue,
      paddingBottom: paddingValue,
    },
    sectionContainer: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
    },
    sectionContainerFull: {},
    sectionContainerMD: {
      maxWidth: 1200,
    },
    sectionContainerSM: {
      maxWidth: 600,
    },
  };
});
