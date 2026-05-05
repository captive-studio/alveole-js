import type { StyleValue } from './makeStyles';
/**
 * Retire les propriétés CSS non supportées pour une platforme
 * @param styles Styles appliqués
 * @returns Les styles sans les propriétés exclues pour la platform
 */
export declare function removeUnsupportedCSSProperties<T extends Record<string, StyleValue>>(styles: T): T;
//# sourceMappingURL=removeUnsupportedCSSProperties.d.ts.map
