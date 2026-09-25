import { useTheme } from '@alveole/theme';
import { Box } from '../../core/Box';
import { Typography } from '../../core/Typography';
import { LucideIcon, LucideIconProps } from '../LucideIcon';
import { useStyles } from './SelectList.styles';
import { selectItemStyle } from './selectItemStyle';

export type SelectItemProps = {
  label: string;
  icon?: LucideIconProps['name'];
  /** Option actuellement sélectionnée : fond + indicateur. */
  selected?: boolean;
  /** Option survolée ou active au clavier : fond seul. */
  highlighted?: boolean;
  disabled?: boolean;
  /** Multi-sélection : la sélection se marque par une case à cocher en tête de bande, pas par la barre. */
  multiple?: boolean;
};

/**
 * Rendu d'une option, sans aucun comportement : la zone pressable (natif) ou
 * le conteneur porteur du clavier et de l'ARIA (web, via `components.Option`
 * de react-select) est fourni par l'appelant.
 */
export const SelectItem = ({ label, icon, selected, highlighted, disabled, multiple }: SelectItemProps) => {
  const styles = useStyles();
  const { color } = useTheme();

  const aspect = selectItemStyle(
    styles,
    {
      texte: color.light.text['default-grey'],
      texteDesactive: color.light.text['disabled-grey'],
      coche: color.light.text['inverted-grey'],
    },
    { selected, highlighted, disabled },
  );

  return (
    <Box tag="select-item" style={aspect.item}>
      {selected && !multiple && (
        <Box tag="select-item-indicator" style={styles.indicator}>
          <Box style={styles.indicatorContent} />
        </Box>
      )}

      <Box tag="select-item-band" style={aspect.band} hoverStyle={aspect.bandHover}>
        {/* Simple visuel : la ligne entière reste l'unique zone pressable, un contrôle imbriqué
            dans un autre serait un anti-patron d'accessibilité. */}
        {multiple && (
          <Box tag="select-item-checkbox" style={aspect.caseACocher}>
            {selected && <LucideIcon size="xs" name="Check" color={aspect.coche} />}
          </Box>
        )}

        {icon && <LucideIcon size="sm" name={icon} color={aspect.icone} />}

        <Typography style={aspect.label}>{label}</Typography>
      </Box>
    </Box>
  );
};
