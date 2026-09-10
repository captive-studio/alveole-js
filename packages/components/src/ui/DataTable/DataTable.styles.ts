import { makeStyles } from '@alveole/theme';

export const useStyles = makeStyles(({ color, text, radius, spacing }) => ({
  table: {
    display: 'flex',
    flexDirection: 'column',
    borderWidth: 1,
    borderColor: color.light.border['default-grey'],
    borderRadius: radius('md'),
    overflow: 'hidden',
    backgroundColor: color.light.background['default-grey'],
  },
  scrollContent: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    minWidth: '100%',
  },
  headerRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'stretch',
    backgroundColor: color.light.background['alt-grey'],
    borderBottomWidth: 1,
    borderBottomColor: color.light.border['default-grey'],
  },
  headerCell: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing('1V'),
  },
  headerCellSm: {
    paddingLeft: spacing('1W'),
    paddingRight: spacing('1W'),
    paddingTop: spacing('1V'),
    paddingBottom: spacing('1V'),
  },
  headerCellMd: {
    paddingLeft: spacing('2W'),
    paddingRight: spacing('2W'),
    paddingTop: spacing('1,5V'),
    paddingBottom: spacing('1,5V'),
  },
  headerCellLg: {
    paddingLeft: spacing('3W'),
    paddingRight: spacing('3W'),
    paddingTop: spacing('1W'),
    paddingBottom: spacing('1W'),
  },
  headerLabel: {
    ...text['Corps de texte'].XS.SemiBold,
    color: color.light.text['mention-grey'],
  },
  headerLabelActive: {
    color: color.light.text['default-grey'],
  },
  headerSelectionCell: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerSelectionCellSm: {
    width: 40,
    paddingLeft: spacing('3V'),
    paddingRight: spacing('3V'),
  },
  headerSelectionCellMd: {
    width: 44,
    paddingLeft: spacing('2W'),
    paddingRight: spacing('2W'),
  },
  headerSelectionCellLg: {
    width: 48,
    paddingLeft: spacing('3W'),
    paddingRight: spacing('3W'),
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'stretch',
    backgroundColor: color.light.background['default-grey'],
    borderBottomWidth: 1,
    borderBottomColor: color.light.border['default-grey'],
  },
  rowHoverable: {
    cursor: 'pointer',
  },
  rowHover: {
    backgroundColor: color.light.background['alt-grey'],
  },
  rowSelected: {
    backgroundColor: color.light.background['action-low-primary'],
  },
  cell: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: 0,
  },
  cellSm: {
    paddingLeft: spacing('1W'),
    paddingRight: spacing('1W'),
    paddingTop: spacing('1V'),
    paddingBottom: spacing('1V'),
  },
  cellMd: {
    paddingLeft: spacing('2W'),
    paddingRight: spacing('2W'),
    paddingTop: spacing('3V'),
    paddingBottom: spacing('3V'),
  },
  cellLg: {
    paddingLeft: spacing('3W'),
    paddingRight: spacing('3W'),
    paddingTop: spacing('2W'),
    paddingBottom: spacing('2W'),
  },
  cellAlignEnd: {
    justifyContent: 'flex-end',
  },
  cellText: {
    ...text['Corps de texte'].SM.Regular,
    color: color.light.text['default-grey'],
  },
  selectionCell: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectionCellSm: {
    width: 40,
    paddingLeft: spacing('3V'),
    paddingRight: spacing('3V'),
  },
  selectionCellMd: {
    width: 44,
    paddingLeft: spacing('2W'),
    paddingRight: spacing('2W'),
  },
  selectionCellLg: {
    width: 48,
    paddingLeft: spacing('3W'),
    paddingRight: spacing('3W'),
  },
  emptyState: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing('6W'),
  },
  emptyStateLabel: {
    ...text['Corps de texte'].SM.Regular,
    color: color.light.text['mention-grey'],
  },
}));
