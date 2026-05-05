import { Color } from '../constants';
type Between0And1 = number;
type RGBAColor = `rgba${string}`;
/**
 * Génère une couleur avec de l’opacité à partir d’une valeur hexadecimal
 * @param hexadecimalColor - La couleur hexadecimal (Issue du thème ou string)
 * @param opacity - Entre 0 et 1
 * @returns La valeur rgba, par exemple: 'rgba(235, 220, 200, 0.5)'
 */
export declare const alpha: (hexadecimalColor: Color, opacity: Between0And1) => RGBAColor;
export {};
//# sourceMappingURL=alphaColor.d.ts.map
