/** Le chemin du fond sur lequel se juge un texte. */
export const cheminDuFondParDefaut = 'light.background.default-grey';

/** Un rapport de contraste a une decimale et a la francaise : `1,4:1`. */
export const rapport = (contraste: number) => `${contraste.toFixed(1).replace('.', ',')}:1`;
