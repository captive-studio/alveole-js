import { focusBorder, makeStyles } from '@alveole/theme';

export const useStyles = makeStyles(({ text, color, spacing }) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: color.light.border['plain-grey'],
    paddingBottom: spacing('1W'),
  },
  // Le champ de prix n'a qu'un trait sous le montant en guise de cadre : le focus le recolore,
  // et l'anneau encastre des autres champs (ADR 0017) entoure la zone du montant.
  containerFocused: (({ borderWidth, borderColor, ...anneau }) => ({
    ...anneau,
    borderBottomWidth: borderWidth,
    borderBottomColor: borderColor,
  }))(focusBorder()),
  priceInputContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  input: {
    outline: 'none',
    borderWidth: 0,
    // Le blanc par defaut d'un <input> recouvrirait l'anneau encastre du cadre.
    backgroundColor: 'transparent',
    textAlign: 'center',
    color: color.light.text['title-grey'],
    fontFamily: text['Titres alternatifs'].MD.fontFamily,
    fontSize: text['Titres alternatifs'].MD.fontSize,
  },
  inputPlaceholder: {
    color: color.light.text['mention-grey'],
  },
  inputDevise: {
    color: color.light.text['title-grey'],
    marginTop: 'auto',
    marginBottom: 'auto',
    ...text['Titres alternatifs'].MD,
    position: 'relative',
    top: 2,
  },
}));
