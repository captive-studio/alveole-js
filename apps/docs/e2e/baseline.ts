import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

export const BASELINE_PATH = resolve(process.cwd(), 'e2e', 'a11y-baseline.json');

export type RuleCounts = Record<string, number>;

const plural = (count: number, word: string) => `${count} ${word}${count > 1 ? 's' : ''}`;

// Cliquet : la baseline fige le nombre de violations connues pour une page, par règle axe.
// Tout écart est signalé, dans les deux sens. Vers le haut c'est une régression ; vers le
// bas c'est une correction dont la baseline n'a pas été resserrée, et sans cette seconde
// moitié le garde-fou ne redescendrait jamais.
export function compare(actual: RuleCounts, expected: RuleCounts): string[] {
  const rules = new Set([...Object.keys(actual), ...Object.keys(expected)]);

  return [...rules].flatMap(rule => {
    const count = actual[rule] ?? 0;
    const allowed = expected[rule] ?? 0;
    if (count === allowed) return [];

    const gap = `${rule} : ${plural(count, 'occurrence')}, ${plural(allowed, 'attendue')}`;
    return [count > allowed ? gap : `${gap}. Corrigé : resserrer le cliquet.`];
  });
}

export type Baseline = Record<string, RuleCounts>;

// Absence de fichier et baseline vide sont le même cas : un dépôt qui n'a jamais figé de
// violation part de zéro, et toute violation observée est alors une régression à déclarer.
export function load(path: string): Baseline {
  if (!existsSync(path)) return {};

  return JSON.parse(readFileSync(path, 'utf8')) as Baseline;
}

export function merge(existing: Baseline, fresh: Baseline, audited: string[]): Baseline {
  const kept = Object.keys(existing).filter(route => !audited.includes(route));

  return Object.fromEntries([...kept.map(route => [route, existing[route]]), ...Object.entries(fresh)]);
}
