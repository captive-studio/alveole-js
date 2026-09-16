/**
 * Copie une valeur, quand le navigateur le permet. Le presse-papiers n'existe pas partout : le
 * catalogue est aussi rendu hors navigateur, et un navigateur peut refuser l'acces. Appeler
 * l'API sans verifier leve une erreur que le gestionnaire d'evenement avale en silence, et la
 * copie echoue alors sans que rien ne le dise.
 *
 * Rend `true` quand la copie a ete lancee, pour que l'appelant n'annonce que ce qui a eu lieu.
 */
export const copier = (valeur: string, quandCopie: () => void): boolean => {
  if (typeof navigator === 'undefined' || !navigator.clipboard) return false;

  navigator.clipboard.writeText(valeur).then(quandCopie);

  return true;
};
