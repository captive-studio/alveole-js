import { Font, FontWeightMap } from '../constants';
import { isRecord } from './isRecord';

const estPolice = (famille: unknown): famille is Font => typeof famille === 'string' && famille in FontWeightMap;

const traduitArbre = (node: unknown): unknown => {
  if (!isRecord(node)) return node;
  // Hors web, `fontStyle` ne pose que la cle de police : on rend la famille, son repli et le poids.
  if (typeof node.fontSize === 'number' && estPolice(node.fontFamily)) {
    const { familyWithFallback, weight } = FontWeightMap[node.fontFamily];
    return { ...node, fontFamily: familyWithFallback, fontWeight: weight };
  }
  return Object.fromEntries(Object.entries(node).map(([key, value]) => [key, traduitArbre(value)]));
};

/**
 * Normalise l'arbre des jetons typographiques en valeurs brutes, quelle que soit la plateforme :
 * famille avec repli systeme et poids, comme sur le web. La forme de l'arbre est preservee, d'ou
 * l'assertion, toleree pour la meme raison que dans `toCSSVarTypography` (exemptee par la
 * config ESLint).
 */
export const typographieBrute = traduitArbre as <T>(node: T) => T;
