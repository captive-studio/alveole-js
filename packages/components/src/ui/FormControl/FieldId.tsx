import React from 'react';

// Identifiant partagé par le libellé et le champ d'un même contrôle. Les deux sont rendus
// par des composants frères, FormControlLabel et TextInput, sans lien direct entre eux :
// sans ce relais, le libellé ne peut pas désigner le champ et celui-ci reste anonyme.
const FieldIdContext = React.createContext<string | undefined>(undefined);

export const useFieldId = () => React.useContext(FieldIdContext);

export const FieldIdProvider = ({ children }: React.PropsWithChildren) => {
  const fieldId = React.useId();

  return <FieldIdContext.Provider value={fieldId}>{children}</FieldIdContext.Provider>;
};
