import { dataSetAttribute } from './dataSetAttribute';

/**
 * L'attribut par lequel un lien du kit demande les styles que seule une feuille de style peut
 * porter. Même opt-in que `FOCUS_DATA_SET_KEY` : la règle ne touche jamais les `<a>` propres à
 * l'application cliente (ADR 0008).
 */
export const LINK_DATA_SET_KEY = 'alveoleLink';

export const LINK_ATTRIBUTE = dataSetAttribute(LINK_DATA_SET_KEY);
