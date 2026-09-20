import { Pressable, useWindowDimensions } from 'react-native';
import { Sheet as TamaguiSheet } from 'tamagui';
import { Typography } from '../../core/Typography';
import type { SelectOption } from './Select.types';
import { SelectItem } from './SelectItem';
import { useStyles } from './SelectList.styles';
import { SelectOptionRow } from './SelectOptionRow';
import { textesDuPanneau } from './selectReglages';
import { useDefilementVersSelection } from './useDefilementVersSelection';
import { useSelectOptions } from './useSelectOptions';

/** Part de la hauteur d'ecran au-dela de laquelle la liste defile. */
const MAX_HEIGHT_RATIO = 0.7;

/** Les reglages du panneau natif, partages par le sheet et la liste qu'il contient. */
export type SelectPanelProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  title: string;
  options: SelectOption[];
  /** Toujours un tableau : `Select` normalise le mono en zéro ou une valeur. */
  values: string[];
  multiple?: boolean;
  onSelect: (value: string) => void;
  onClear: () => void;
  clearable?: boolean;
  clearLabel?: string;
  searchable?: boolean;
  searchPlaceholder?: string;
  query: string;
  onQueryChange: (query: string) => void;
  localFilter?: boolean;
  creatable?: boolean;
  onCreate?: (query: string) => void;
  createLabel?: (query: string) => string;
  loading?: boolean;
  loadingMessage?: string;
  emptyMessage?: string;
};

/**
 * Le contenu deroulant du panneau : l'entree de creation, celle d'effacement, les options et
 * le message de liste vide. Il decide aussi de la fermeture, parce qu'elle depend du choix
 * qu'on vient de faire : en multi le panneau reste ouvert, la selection se construit par
 * touches successives et se valide par le bouton de l'en-tete.
 */
export const SelectOptionsList = (props: SelectPanelProps) => {
  const { values, multiple, setOpen, onSelect, onClear, onCreate, onQueryChange, clearable, query, loading } = props;

  const styles = useStyles();
  const { height } = useWindowDimensions();
  const { rows, canCreate } = useSelectOptions(props);
  const { scrollRef, onSelectedLayout } = useDefilementVersSelection(props.open);
  const { clearLabel, loadingMessage, emptyMessage, createLabel } = textesDuPanneau(props);

  const refermerSiMono = () => {
    if (!multiple) setOpen(false);
  };

  const handleClear = () => {
    onClear();
    refermerSiMono();
  };

  const handleSelect = (value: string) => {
    onSelect(value);
    refermerSiMono();
  };

  const handleCreate = () => {
    onCreate?.(query.trim());
    onQueryChange('');
    refermerSiMono();
  };

  return (
    <TamaguiSheet.ScrollView
      ref={scrollRef}
      keyboardShouldPersistTaps="handled"
      style={{ maxHeight: height * MAX_HEIGHT_RATIO }}
    >
      {canCreate && (
        <Pressable testID="select-create" accessibilityRole="button" onPress={handleCreate}>
          <SelectItem label={createLabel(query.trim())} icon="Plus" />
        </Pressable>
      )}

      {clearable && values.length > 0 && (
        <Pressable testID="select-clear" accessibilityRole="button" onPress={handleClear}>
          <SelectItem label={clearLabel} icon="X" />
        </Pressable>
      )}

      {rows.map(({ option, groupHeader }) => (
        <SelectOptionRow
          key={option.value}
          option={option}
          groupHeader={groupHeader}
          selected={values.includes(option.value)}
          multiple={multiple}
          onPress={handleSelect}
          onSelectedLayout={onSelectedLayout}
        />
      ))}

      {rows.length === 0 && !canCreate && (
        <Typography style={styles.emptyMessage}>{loading ? loadingMessage : emptyMessage}</Typography>
      )}
    </TamaguiSheet.ScrollView>
  );
};
