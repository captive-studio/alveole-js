import { TransitionKeys } from 'tamagui';

/**
 * Le seul endroit qui sait comment Tamagui nomme sa prop d'animation : `transition` depuis
 * la v2 (`animation` en v1). Les composants étalent son résultat, `<X {...animer('quicker')} />`.
 */
export const animer = (cle: TransitionKeys) => ({ transition: cle });
