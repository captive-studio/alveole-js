import React from 'react';

// Ce que l'enveloppe d'un contrôle partage avec lui. Le libellé et le champ sont rendus
// par des composants frères, FormControlLabel et TextInput, sans lien direct entre eux :
// sans ce relais, le libellé ne peut pas désigner le champ et celui-ci reste anonyme. La
// désactivation et le caractère requis passent par le même chemin, comme chez Primer, Atlassian et Base.
// Le texte de l'étiquette y passe aussi : sans `aria-labelledby`, un contrôle natif doit le lire (ADR 0026).
type FieldContextValue = { fieldId?: string; label?: string; disabled?: boolean; required?: boolean };

const FieldContext = React.createContext<FieldContextValue>({});

export const useFieldId = () => React.useContext(FieldContext).fieldId;

// Posée sur le contrôle lui-même, la désactivation l'emporte sur celle de l'enveloppe.
export const useFieldDisabled = (ownDisabled?: boolean) => {
  const { disabled } = React.useContext(FieldContext);

  return ownDisabled ?? disabled;
};

export const useFieldLabel = () => React.useContext(FieldContext).label;

export const useFieldRequired = () => React.useContext(FieldContext).required;

export const FieldIdProvider = ({
  children,
  label,
  disabled,
  required,
}: React.PropsWithChildren<Omit<FieldContextValue, 'fieldId'>>) => {
  const fieldId = React.useId();

  return <FieldContext.Provider value={{ fieldId, label, disabled, required }}>{children}</FieldContext.Provider>;
};
