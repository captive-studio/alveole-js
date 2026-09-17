import React from 'react';

/**
 * Un booleen qui se remet a `false` des qu'une cle change, avant meme le prochain effet :
 * l'erreur d'une source ne doit jamais rester affichee un instant sur la suivante. La mise a
 * jour se fait au rendu plutot que dans un effet, pour eviter cet instant.
 */
export const useEtatReinitialiseParCle = <Cle>(cle: Cle) => {
  const [actif, setActif] = React.useState(false);
  const [clePrecedente, setClePrecedente] = React.useState(cle);

  if (clePrecedente !== cle) {
    setClePrecedente(cle);
    setActif(false);
  }

  return [actif, setActif] as const;
};
