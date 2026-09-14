import type { NativeSyntheticEvent, TargetedEvent } from 'react-native';
import type { FormControlCaptionProps, FormControlHintProps, FormControlLabelProps } from '../FormControl';
import type { LucideIconProps } from '../LucideIcon';

export type SelectOption = {
  value: string;
  label: string;
  /** Icône affichée à gauche du libellé, dans le panneau et dans le champ fermé. */
  icon?: LucideIconProps['name'];
  /** Les options consécutives partageant le même `group` sont regroupées sous un en-tête. */
  group?: string;
  disabled?: boolean;
};

/**
 * Handle exposé par `ref`, identique sur web et natif.
 * `focus`/`blur` sont des alias d'`open`/`close` : ouvrir le panneau est l'équivalent
 * de la prise de focus sur un `<select>`.
 */
export type SelectRef = {
  focus: () => void;
  blur: () => void;
  open: () => void;
  close: () => void;
};

export type SelectProps = FormControlLabelProps &
  FormControlHintProps &
  FormControlCaptionProps & {
    value: string | null;
    options: SelectOption[];
    placeholder?: string;
    onChange?: (value: string | null) => void;
    /** Titre du bottom sheet sur mobile. Par défaut : `label`. */
    sheetTitle?: string;
    /** Ajoute une entrée permettant de revenir à une sélection vide. */
    clearable?: boolean;
    /**
     * Le paramètre est absent sur natif : l'ouverture du panneau n'émet pas
     * d'événement natif de focus.
     */
    onFocus?: (event?: NativeSyntheticEvent<TargetedEvent>) => void;
    onBlur?: (event?: NativeSyntheticEvent<TargetedEvent>) => void;
  };
