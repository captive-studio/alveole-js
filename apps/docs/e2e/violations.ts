import type { Result } from 'axe-core';
import type { RuleCounts } from './baseline';

// Une règle axe peut être enfreinte par plusieurs éléments d'une même page : c'est le
// nombre de nœuds qui mesure l'ampleur du problème, pas le nombre de règles.
export function countByRule(violations: Result[]): RuleCounts {
  return Object.fromEntries(violations.map(violation => [violation.id, violation.nodes.length]));
}

// Le compte seul dit qu'une règle a régressé, pas où : sans le sélecteur de l'élément
// fautif, un échec de CI oblige à rejouer l'audit en local pour retrouver la cible.
export function describeTargets(violations: Result[]): string {
  return violations
    .flatMap(violation => violation.nodes.map(node => `${violation.id} → ${node.target.join(' ')}`))
    .join('\n');
}
