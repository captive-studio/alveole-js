/**
 * La hauteur d'une carte de fiche. Hors mobile, les cartes d'une rangee s'etirent a la plus
 * haute pour aligner leurs bas ; sur mobile, empilees, chacune garde celle de son contenu.
 */
export const hauteurDeCarte = (mobile: boolean): '100%' | undefined => (mobile ? undefined : '100%');
