import { readdirSync } from 'node:fs';
import { join } from 'node:path';

/** Le numero d'un ADR est son prefixe : `0014-tag-survol.md` porte le numero `0014`. */
const numeroDe = nom => nom.match(/^(\d+)-/)?.[1];

/**
 * Les numeros portes par plus d'un ADR, avec les fichiers qui se les disputent. Deux branches
 * peuvent prendre le meme numero sans faute : la faute n'existe qu'une fois les deux fusionnees.
 */
export const numerosEnDouble = racine => {
  const parNumero = new Map();

  for (const nom of readdirSync(join(racine, 'docs', 'adr'))) {
    const numero = numeroDe(nom);
    if (!numero) continue;
    parNumero.set(numero, [...(parNumero.get(numero) ?? []), nom]);
  }

  return [...parNumero.entries()]
    .filter(([, fichiers]) => fichiers.length > 1)
    .map(([numero, fichiers]) => ({ numero, fichiers: fichiers.sort() }));
};

/**
 * Ce que la CI affiche quand deux ADR partagent un numero. Le message dit quoi faire :
 * renumeroter le dernier arrive, puisque l'autre est deja cite ailleurs.
 */
export const rapport = doublons =>
  [
    'Deux ADR ne peuvent pas porter le meme numero : un ADR se cite par son numero.',
    '',
    ...doublons.map(({ numero, fichiers }) => `  ✗ ${numero} : ${fichiers.join(', ')}`),
    '',
    'Renumerotez le dernier arrive avec le premier numero libre. Les renvois vers l ancien',
    'numero restent valables pour celui qui le garde.',
  ].join('\n');

// Lance depuis la racine du depot : `node scripts/check-adr-numbers.mjs`.
if (process.argv[1] === new URL(import.meta.url).pathname) {
  const doublons = numerosEnDouble(new URL('..', import.meta.url).pathname);

  if (doublons.length > 0) {
    console.error(rapport(doublons));
    process.exitCode = 1;
  }
}
