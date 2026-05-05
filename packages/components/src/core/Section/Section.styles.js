import { makeStyles } from '@alveole/theme';
export const useStyles = makeStyles(({ externalPadding, spacing }) => {
  const paddingValue = externalPadding();
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
