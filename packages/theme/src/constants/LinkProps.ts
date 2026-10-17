import { focusRingProps } from './FocusProps';
import { LINK_DATA_SET_KEY } from './Link';
import { marques } from './marques';

/**
 * Les props d'un lien de texte du kit : la marque de lien et la bague de focus, posees
 * ensemble, sans quoi l'etalement de l'une ecraserait le `dataSet` de l'autre.
 */
export const linkProps = () => marques({ ...focusRingProps().dataSet, [LINK_DATA_SET_KEY]: 'text' });
