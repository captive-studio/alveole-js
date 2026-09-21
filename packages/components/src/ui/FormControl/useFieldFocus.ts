import React from 'react';

type Options<F, B> = {
  // `disabled`, `readOnly` et `editable` viennent de TextInputProps, qui autorise `null`
  // en plus de `undefined`.
  disabled?: boolean | null;
  readOnly?: boolean | null;
  editable?: boolean | null;
  onFocus?: (e: F) => void;
  onBlur?: (e: B) => void;
};

/**
 * L'etat de focus du champ, tenu par le composant et non laisse a la plateforme : c'est le
 * cadre qui porte la bordure, et lui seul sait s'il doit la colorer.
 *
 * Un champ desactive ou en lecture seule n'entre jamais dans cet etat, meme quand le
 * clavier l'atteint : il resterait atteignable sans pour autant se presenter comme
 * modifiable. Les rappels de l'appelant partent quand meme, eux : c'est l'apparence qu'on
 * retient, pas l'evenement.
 *
 * `editable={false}` compte au meme titre : c'est le mot de React Native pour « on n'ecrit
 * pas ici », et un appelant qui l'emploie plutot que `readOnly` decrit le meme champ.
 */
export const useFieldFocus = <F = unknown, B = unknown>({
  disabled,
  readOnly,
  editable,
  onFocus,
  onBlur,
}: Options<F, B>) => {
  const [focus, setFocus] = React.useState(false);
  const inerte = disabled === true || readOnly === true || editable === false;

  return {
    focus,
    handleFocus: (e: F) => {
      if (!inerte) setFocus(true);
      onFocus?.(e);
    },
    handleBlur: (e: B) => {
      if (!inerte) setFocus(false);
      onBlur?.(e);
    },
  };
};
