import { makeStyles } from '@alveole/theme';

export const useStyles = makeStyles(({ color, text, spacing }) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing('1V'),
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: spacing('1V'),
  },
  title: {
    // Registre applicatif, pas celui d'un site de documentation : Atlassian titre ses pages a
    // 24, Primer a 20. Le catalogue, lui, compose son titre a part.
    ...text.Titres['H4 - SM'],
    color: color.light.text['title-grey'],
    // Sur ecran etroit, le titre garde une largeur lisible et les actions passent dessous.
    flexGrow: 1,
    flexShrink: 1,
    minWidth: 200,
  },
  actions: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: spacing('1W'),
  },
}));
