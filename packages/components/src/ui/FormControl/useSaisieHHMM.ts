import React from 'react';

/** Deux chiffres d'heures, puis les minutes derriere un deux-points des le troisieme. */
export const formaterHHMM = (chiffres: string) =>
  chiffres.length <= 2 ? chiffres : `${chiffres.slice(0, 2)}:${chiffres.slice(2)}`;

type SaisieHHMM = {
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  formater: (chiffres: string) => string;
};

/**
 * La saisie au clavier d'un couple heures-minutes : ne garde que quatre chiffres, les met en
 * forme a chaque frappe, et ne transmet la valeur qu'une fois complete (ou videe) et a la
 * perte du focus. Seule la mise en forme change d'un champ a l'autre.
 */
export const useSaisieHHMM = ({ value, onChange, onBlur, formater }: SaisieHHMM) => {
  const [localValue, setLocalValue] = React.useState(value ?? '');
  const [valeurRecue, setValeurRecue] = React.useState(value);

  // Une nouvelle valeur venue du parent remplace la saisie en cours. L'ajustement se fait
  // pendant le rendu plutot que dans un effet, qui peindrait d'abord l'ancienne valeur.
  if (value !== valeurRecue) {
    setValeurRecue(value);
    setLocalValue(value ?? '');
  }

  const handleChangeText = (text: string) => {
    const chiffres = text.replace(/\D/g, '').slice(0, 4);
    const formatted = formater(chiffres);
    setLocalValue(formatted);
    if (chiffres.length === 0 || chiffres.length === 4) {
      onChange?.(formatted);
    }
  };

  const handleBlur = () => {
    onChange?.(localValue);
    onBlur?.();
  };

  return { localValue, handleChangeText, handleBlur };
};
