import { FieldBorderState, fieldBorderState } from '../FormControl/fieldBorderState';
import { useStyles } from './PriceInput.styles';

type Styles = ReturnType<typeof useStyles>;

/**
 * Le trait sous le montant tient lieu de cadre au champ de prix : il prend les etats de tous
 * les champs, dans la priorite commune de l'ADR 0012.
 */
export const cadrePrix = (styles: Styles, state: FieldBorderState) => ({
  ...styles.container,
  ...fieldBorderState(styles, state),
});
