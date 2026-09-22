import { focusRingProps } from './FocusProps';
import { LINK_DATA_SET_KEY } from './Link';

/**
 * Les props d'un lien de texte du kit : la marque de lien et la bague de focus. Toutes deux
 * passent par `dataSet`, qu'un simple étalement de l'une écraserait avec l'autre.
 */
export const linkProps = () => ({
  dataSet: { ...focusRingProps().dataSet, [LINK_DATA_SET_KEY]: 'text' },
});
