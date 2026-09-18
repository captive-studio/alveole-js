export type FieldBorderStyles<T> = {
  inputFocused: T;
  inputError: T;
  inputSuccess: T;
  inputDisabled: T;
};

export type FieldBorderState = {
  // `disabled` vient de TextInputProps, qui autorise `null` en plus de `undefined`.
  disabled?: boolean | null;
  focus?: boolean;
  error?: string;
  success?: string;
};

/**
 * La couleur de bordure d'un champ ou d'un selecteur : un seul etat a la fois, dans l'ordre
 * fixe par l'ADR 0012. Un controle desactive le reste quoi qu'il arrive ; sinon le focus
 * passe devant l'erreur et le succes, pour que le controle actif soit identifiable sans
 * ambiguite, et le verdict de validation revient au blur.
 *
 * La table de styles est injectee : chaque famille a la sienne, seule la regle de priorite
 * est commune. Sans ce point unique, la famille FormControl et Select divergeraient des la
 * premiere retouche, et c'est exactement la variante locale que l'ADR supprime.
 */
export const fieldBorderState = <T extends object>(
  styles: FieldBorderStyles<T>,
  state: FieldBorderState,
): Partial<T> => {
  if (state.disabled) return styles.inputDisabled;
  if (state.focus) return styles.inputFocused;
  if (state.error) return styles.inputError;
  if (state.success) return styles.inputSuccess;
  return {};
};
