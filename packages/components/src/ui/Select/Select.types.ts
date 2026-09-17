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

type SelectSharedProps = FormControlLabelProps &
  FormControlHintProps &
  FormControlCaptionProps & {
    options: SelectOption[];
    placeholder?: string;
    /** Titre du bottom sheet sur mobile. Par défaut : `label`. */
    sheetTitle?: string;
    /** Ajoute une entrée permettant de revenir à une sélection vide. */
    clearable?: boolean;

    /** Ajoute un champ de recherche au panneau. Par défaut : false. */
    searchable?: boolean;
    searchPlaceholder?: string;
    /**
     * Saisie de recherche, émise après stabilisation (300 ms) et jamais au montage.
     * Combiner avec `localFilter={false}` pour une recherche distante.
     */
    onSearchChange?: (query: string) => void;
    /**
     * Filtre les options sur leur libellé. Par défaut : true.
     * Mettre à false quand `options` est déjà le résultat d'une recherche distante.
     */
    localFilter?: boolean;
    /** Signale une recherche en cours à la place du message de liste vide. */
    loading?: boolean;
    loadingMessage?: string;
    emptyMessage?: string;

    /** Propose de créer une option à partir de la saisie. Implique `searchable`. */
    creatable?: boolean;
    /**
     * Reçoit la saisie débarrassée de ses espaces. `Select` restant strictement
     * contrôlé, c'est à l'appelant d'ajouter l'option à `options` puis de mettre
     * `value` à jour : la nouvelle valeur n'apparaît qu'au rendu suivant.
     */
    onCreateOption?: (query: string) => void;
    createLabel?: (query: string) => string;

    /**
     * Le paramètre est absent sur natif : l'ouverture du panneau n'émet pas
     * d'événement natif de focus.
     */
    onFocus?: (event?: NativeSyntheticEvent<TargetedEvent>) => void;
    onBlur?: (event?: NativeSyntheticEvent<TargetedEvent>) => void;
  };

export type SelectSingleValueProps = SelectSharedProps & {
  multiple?: false;
  value: string | null;
  onChange?: (value: string | null) => void;
};

export type SelectMultiValueProps = SelectSharedProps & {
  multiple: true;
  value: string[];
  onChange?: (value: string[]) => void;
};

/**
 * Union discriminée par `multiple` plutôt que composant générique : `forwardRef`
 * ne préserve pas les génériques sans cast, et `multiple` omis inférerait
 * `boolean` au lieu de `false`. Conséquence côté implémentation : ne jamais
 * déstructurer `multiple`/`value`/`onChange`, le narrowing ne joue que sur
 * l'objet `props` entier.
 */
export type SelectProps = SelectSingleValueProps | SelectMultiValueProps;
