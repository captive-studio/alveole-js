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
    // flexBasis 0 : le retour a la ligne se decide sur les 40 % minimum, pas sur la longueur
    // du titre. Les actions ne passent dessous que sur ecran etroit.
    flexGrow: 1,
    flexBasis: 0,
    flexShrink: 1,
    minWidth: '40%',
  },
  actions: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: spacing('1W'),
  },
}));
