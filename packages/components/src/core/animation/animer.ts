import { AnimationKeys } from 'tamagui';

/**
 * Le seul endroit qui sait comment Tamagui nomme sa prop d'animation. La v1 l'appelle
 * `animation`, la v2 `transition` ; en 1.144, `transition` n'est que la propriété CSS
 * brute, le renommage ne peut donc pas se faire à l'avance. À la bascule, seule cette
 * fonction change : les composants étalent son résultat, `<X {...animer('quicker')} />`.
 */
export const animer = (cle: AnimationKeys) => ({ animation: cle });
