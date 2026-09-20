import type { useStyles } from './SelectList.styles';

type SelectListStyles = ReturnType<typeof useStyles>;

export type SelectItemState = {
  selected?: boolean;
  highlighted?: boolean;
  disabled?: boolean;
};

/**
 * Les quatre variations d'aspect d'une option : desactivee, selectionnee, survolee. Elles
 * vivaient dans le rendu sous forme de ternaires empiles, qui n'y disaient rien de plus que
 * ce que leur nom dit ici, et qui rendaient la fonction de rendu illisible a force de branches.
 */
export const selectItemStyle = (
  styles: SelectListStyles,
  couleurs: { texte: string; texteDesactive: string },
  { selected, highlighted, disabled }: SelectItemState,
) => ({
  item: { ...styles.item, ...(disabled ? styles.itemDisabled : {}) },
  band: { ...styles.band, ...(selected || highlighted ? styles.bandHighlighted : {}) },
  // Le survol ne doit pas repondre sur une option qu'on ne peut pas choisir.
  bandHover: disabled ? undefined : styles.bandHighlighted,
  label: { ...styles.itemLabel, ...(disabled ? styles.itemLabelDisabled : {}) },
  icone: disabled ? couleurs.texteDesactive : couleurs.texte,
});
