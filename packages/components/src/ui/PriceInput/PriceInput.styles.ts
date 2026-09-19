import { focusBorder, makeStyles } from '@alveole/theme';

export const useStyles = makeStyles(({ text, color, spacing }) => ({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: color.light.border['plain-grey'],
    paddingBottom: spacing('1W'),
  },
  // Le champ de prix n'a qu'un trait sous le montant en guise de cadre : c'est donc lui que
  // le focus recolore, avec la meme definition que la bordure complete des autres champs.
  containerFocused: {
    borderBottomWidth: focusBorder().borderWidth,
    borderBottomColor: focusBorder().borderColor,
  },
  priceInputContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  input: {
    outline: 'none',
    borderWidth: 0,
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
