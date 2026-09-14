import { useTheme } from '@alveole/theme';
import { Box } from '../../core/Box';
import { Typography } from '../../core/Typography';
import { LucideIcon, LucideIconProps } from '../LucideIcon';
import { useStyles } from './SelectList.styles';

export type SelectItemProps = {
  label: string;
  icon?: LucideIconProps['name'];
  /** Option actuellement sélectionnée : fond + indicateur. */
  selected?: boolean;
  /** Option survolée ou active au clavier : fond seul. */
  highlighted?: boolean;
  disabled?: boolean;
};

/**
 * Rendu d'une option, sans aucun comportement : la zone pressable (natif) ou
 * le conteneur porteur du clavier et de l'ARIA (web, via `components.Option`
 * de react-select) est fourni par l'appelant.
 */
export const SelectItem = (props: SelectItemProps) => {
  const { label, icon, selected = false, highlighted = false, disabled = false } = props;

  const styles = useStyles();
  const { color } = useTheme();

  const iconColor = disabled ? color.light.text['disabled-grey'] : color.light.text['default-grey'];

  return (
    <Box
      tag="select-item"
      style={{
        ...styles.item,
        ...(selected || highlighted ? styles.itemHighlighted : {}),
        ...(disabled ? styles.itemDisabled : {}),
      }}
      hoverStyle={disabled ? undefined : styles.itemHighlighted}
    >
      {selected && (
        <Box tag="select-item-indicator" style={styles.indicator}>
          <Box style={styles.indicatorContent} />
        </Box>
      )}

      {icon && <LucideIcon size="sm" name={icon} color={iconColor} />}

      <Typography style={{ ...styles.itemLabel, ...(disabled ? styles.itemLabelDisabled : {}) }}>{label}</Typography>
    </Box>
  );
};
