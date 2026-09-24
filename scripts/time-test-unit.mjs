import { spawn } from 'node:child_process';
import { once } from 'node:events';
import { cpus, loadavg } from 'node:os';
import { performance } from 'node:perf_hooks';
import { createInterface } from 'node:readline';
import { pathToFileURL } from 'node:url';

// pnpm préfixe chaque ligne du nom du paquet : « <paquet> test:unit$ <commande> » ouvre
// son exécution, « <paquet> test:unit: Done » ou « Failed » la clôt.
const START = /^(\S+) test:unit\$ /;
const END = /^(\S+) test:unit: (?:Done|Failed)$/;

export function packageDurations(lines) {
  const startedAt = {};
  const durations = {};

  for (const { at, text } of lines) {
    const [, started] = text.match(START) ?? [];
    const [, ended] = text.match(END) ?? [];

    if (started) startedAt[started] = at;
    if (ended) durations[ended] = at - startedAt[ended];
  }

  return durations;
}

const DEFAULT_THRESHOLD_SECONDS = 40;

// `Number('quarante')` vaut NaN, et aucune durée ne dépasse NaN : le seuil ne se déclencherait
// jamais, en silence.
export function thresholdSeconds({ TEST_UNIT_THRESHOLD_SECONDS: raw }) {
  if (raw === undefined) return DEFAULT_THRESHOLD_SECONDS;

  const seconds = Number(raw);

  if (!Number.isFinite(seconds)) {
    throw new Error(`TEST_UNIT_THRESHOLD_SECONDS doit être un nombre de secondes, reçu « ${raw} »`);
  }

  return seconds;
}

// L'échec des tests prime : son code dit plus que « trop lent ». Un processus tué par un
// signal n'a pas de code : `null` affecté à `process.exitCode` vaudrait un succès.
export function exitCode({ status, elapsedMs, thresholdSeconds }) {
  if (status !== 0) return status ?? 1;

  return elapsedMs > thresholdSeconds * 1000 ? 1 : 0;
}

// Les durées de référence d'ALV-82 ont été prises sous une charge de 71 pour 8 CPU : au-delà
// d'un processus prêt par cœur, la mesure dit l'état de la machine, pas celui des tests.
export function loadLine({ loadAverage, cpus }) {
  const line = `charge : ${loadAverage.toFixed(2)} pour ${cpus} CPU`;

  return loadAverage > cpus ? `${line} (machine saturée : mesure non représentative)` : line;
}

const seconds = ms => (ms / 1000).toFixed(1);

// Les paquets tournent en parallèle : le plus lent borne le total, il vient donc en tête.
export function report({ durations, elapsedMs, thresholdSeconds }) {
  const rows = [
    ...Object.entries(durations)
      .sort(([, a], [, b]) => b - a)
      .map(([name, ms]) => [name, seconds(ms), '']),
    ['total', seconds(elapsedMs), ` (seuil : ${thresholdSeconds} s)`],
  ];
  const nameWidth = Math.max(...rows.map(([name]) => name.length));
  const valueWidth = Math.max(...rows.map(([, value]) => value.length));

  return rows
    .map(([name, value, suffix]) => `${name.padEnd(nameWidth)}  ${value.padStart(valueWidth)} s${suffix}`)
    .join('\n');
}

// Relaie la sortie de la commande ligne à ligne, en horodatant chacune pour chronométrer
// les paquets. La sortie d'erreur passe telle quelle : pnpm n'y annonce rien.
async function run([command, ...args]) {
  const startedAt = performance.now();
  const child = spawn(command, args, { stdio: ['inherit', 'pipe', 'inherit'] });
  const lines = [];

  createInterface({ input: child.stdout }).on('line', text => {
    lines.push({ at: performance.now(), text });
    process.stdout.write(`${text}\n`);
  });

  const [status] = await once(child, 'close');

  return { status, lines, elapsedMs: performance.now() - startedAt };
}

async function main(command) {
  const threshold = thresholdSeconds(process.env);

  process.stdout.write(`${loadLine({ loadAverage: loadavg()[0], cpus: cpus().length })}\n`);

  const { status, lines, elapsedMs } = await run(command.length > 0 ? command : ['pnpm', 'run', 'test:unit']);

  process.stdout.write(`${report({ durations: packageDurations(lines), elapsedMs, thresholdSeconds: threshold })}\n`);
  process.exitCode = exitCode({ status, elapsedMs, thresholdSeconds: threshold });
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) await main(process.argv.slice(2));
