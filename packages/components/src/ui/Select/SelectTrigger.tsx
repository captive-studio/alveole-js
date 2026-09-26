import { useTheme } from '@alveole/theme';
import { Pressable, StyleProp, ViewStyle } from 'react-native';
import { Box } from '../../core/Box';
import { versStyleNatif } from '../../core/styleNatif/versStyleNatif';
import { Typography } from '../../core/Typography';
import { LucideIcon } from '../LucideIcon';
import { Tag } from '../Tag';
import { useStyles } from './Select.styles';
import type { SelectOption } from './Select.types';
import { selectTriggerStyle } from './selectTriggerStyle';

/** Nombre de puces affichées avant de résumer le reste par « +N ». */
const MAX_VISIBLE_TAGS = 3;

export type SelectTriggerProps = {
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
  success?: string;
  open: boolean;
  multiple?: boolean;
  /** Dans l'ordre de `value`, pas dans celui d'`options` : c'est la selection de l'appelant. */
  selectedOptions: SelectOption[];
  onPress: () => void;
  /** Absent quand le champ est desactive : les puces perdent alors leur croix. */
  onRemoveValue?: (value: string) => void;
};

const Puces = ({ options, onRemoveValue }: Pick<SelectTriggerProps, 'onRemoveValue'> & { options: SelectOption[] }) => {
  const styles = useStyles();

  const visibles = options.slice(0, MAX_VISIBLE_TAGS);
  const restantes = options.length - visibles.length;

  return (
    <Box style={styles.tagList}>
      {visibles.map(option => (
        // Une valeur choisie *est* selectionnee : `selected` lui donne le gris sombre et la
        // bordure contrastee sans qu'on ait a les redire ici.
        <Tag
          key={option.value}
          size="md"
          selected
          icon={option.icon}
          closable={!!onRemoveValue}
          onClose={onRemoveValue && (() => onRemoveValue(option.value))}
        >
          {option.label}
        </Tag>
      ))}
      {/* Le resume n'est pas une valeur : rien a retirer, rien a selectionner, donc inerte. */}
      {restantes > 0 && <Tag size="md">{`+${restantes}`}</Tag>}
    </Box>
  );
};

const ValeurSimple = ({
  option,
  placeholder,
  disabled,
}: Pick<SelectTriggerProps, 'placeholder' | 'disabled'> & { option?: SelectOption }) => {
  const styles = useStyles();
  const { color } = useTheme();

  return (
    <>
      {option?.icon && (
        <LucideIcon
          size="sm"
          name={option.icon}
          color={disabled ? color.light.text['disabled-grey'] : color.light.text['default-grey']}
        />
      )}

      <Typography
        style={{
          ...styles.value,
          ...(option ? {} : styles.valuePlaceholder),
          ...(disabled ? styles.valueDisabled : {}),
        }}
      >
        {option?.label ?? placeholder ?? ''}
      </Typography>
    </>
  );
};

/**
 * Le champ lui-meme : ce qu'on voit et ce qu'on presse quand le panneau est ferme. Il portait
 * a lui seul les deux tiers du composant `Select` et toutes ses branches d'affichage, alors
 * qu'il n'a besoin de connaitre ni la recherche, ni la creation, ni le panneau.
 */
export const SelectTrigger = (props: SelectTriggerProps) => {
  const { label, placeholder, disabled, error, success, open, multiple, selectedOptions, onPress, onRemoveValue } =
    props;

  const styles = useStyles();
  const { color } = useTheme();

  return (
    <Box tag="form-control-select-input" style={styles.inputContainer}>
      <Pressable
        testID="select-trigger"
        accessibilityRole="button"
        // Le lecteur d'écran annonce la sélection entière, que les puces résument.
        accessibilityLabel={
          selectedOptions.length > 0 ? `${label} : ${selectedOptions.map(o => o.label).join(', ')}` : label
        }
        accessibilityState={{ disabled: Boolean(disabled), expanded: open }}
        disabled={disabled}
        onPress={onPress}
        // `makeStyles` produit des CSSProperties (spacing renvoie une CSS var sur web) :
        // le cast est le même que celui des autres champs, cf. FormControl/TextInput.
        style={versStyleNatif<StyleProp<ViewStyle>>(
          selectTriggerStyle(styles, { disabled, open, multiple, error, success }),
        )}
      >
        {multiple && selectedOptions.length > 0 ? (
          <Puces options={selectedOptions} onRemoveValue={onRemoveValue} />
        ) : (
          <ValeurSimple
            option={multiple ? undefined : selectedOptions[0]}
            placeholder={placeholder}
            disabled={disabled}
          />
        )}

        <LucideIcon
          size="sm"
          name="ChevronDown"
          color={disabled ? color.light.text['disabled-grey'] : color.light.text['default-grey']}
        />
      </Pressable>
    </Box>
  );
};
