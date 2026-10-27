import type { CSSProperties } from 'react';

/**
 * Le style d'un `<a>` brut du catalogue qui enveloppe un libellé. En flex, le libellé devient
 * un bloc à sa propre hauteur de ligne : sinon le lien garde celle de la police que Tamagui v2
 * remet sur chaque vue, plus haute, et décale son libellé. En colonne, le libellé s'étire à la
 * largeur du lien et passe à la ligne, là où une rangée le laissait déborder.
 */
export const styleDuLienBrut: CSSProperties = { display: 'flex', flexDirection: 'column', textDecoration: 'none' };
