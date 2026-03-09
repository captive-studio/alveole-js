import { makeStyles } from '@alveole/theme';

export const useStyles = makeStyles(({ text, color, spacing }) => ({
  toolbarContainer: {
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: spacing('025'),
    paddingRight: spacing('025'),
    paddingTop: spacing('050'),
    paddingBottom: spacing('050'),
  },
  compactLargetoolbarContainer: {
    paddingTop: spacing('3V'),
    paddingBottom: spacing('1W'),
    paddingLeft: spacing('2W'),
    paddingRight: spacing('2W'),
  },
  largeToolbarContainer: {
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  toolbarNavigation: {
    display: 'flex',
    justifyContent: 'center',
    gap: spacing('075'),
  },
  toolbarInformation: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing('075'),
    flex: 1,
  },
  toolbarInformationTitle: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    flex: 1,
  },
  compactLargeInformations: {
    paddingBottom: 0,
    justifyContent: 'center',
  },
  toolbarInformationTitleText: {
    ...text['Corps de texte'].SM.SemiBold,
    color: color.light.text['title-grey'],
  },
  largeInformationTitleText: {
    ...text.Titres['H1 - XL'],
  },
  toolbarInformationTitleSubText: {
    ...text['Corps de texte'].XS.Regular,
    color: color.light.text['mention-grey'],
  },
  largeToolbarInformationTitleSubText: {
    ...text['Corps de texte'].SM.Regular,
  },
  toolbarActions: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  toolbarInformationContainer: {
    flex: 1,
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
}));
