import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import { exitCode, loadLine, packageDurations, report, thresholdSeconds } from './time-test-unit.mjs';

test('chronomètre chaque paquet entre sa commande et sa fin', () => {
  const lines = [
    { at: 1000, text: 'packages/core test:unit$ npx jest --ci' },
    { at: 1500, text: 'packages/theme test:unit$ jest --ci' },
    { at: 3000, text: 'packages/core test:unit: Done' },
    { at: 9500, text: 'packages/theme test:unit: Failed' },
  ];

  assert.deepEqual(packageDurations(lines), { 'packages/core': 2000, 'packages/theme': 8000 });
});

test('fixe le seuil à 40 s quand rien ne le surcharge', () => {
  assert.equal(thresholdSeconds({}), 40);
});

test('laisse TEST_UNIT_THRESHOLD_SECONDS surcharger le seuil', () => {
  assert.equal(thresholdSeconds({ TEST_UNIT_THRESHOLD_SECONDS: '90' }), 90);
});

test('échoue quand la durée dépasse le seuil, même si les tests passent', () => {
  assert.equal(exitCode({ status: 0, elapsedMs: 41_000, thresholdSeconds: 40 }), 1);
});

test('reprend le code de sortie de test:unit quand il échoue sous le seuil', () => {
  assert.equal(exitCode({ status: 2, elapsedMs: 10_000, thresholdSeconds: 40 }), 2);
});

test('annonce la charge machine sur une minute rapportée aux cœurs', () => {
  assert.equal(loadLine({ loadAverage: 5.234, cpus: 8 }), 'charge : 5.23 pour 8 CPU');
});

test('prévient qu’une mesure prise sur machine saturée ne vaut pas référence', () => {
  assert.equal(
    loadLine({ loadAverage: 71, cpus: 8 }),
    'charge : 71.00 pour 8 CPU (machine saturée : mesure non représentative)',
  );
});

test('rapporte chaque paquet, du plus lent au plus rapide, puis le total face au seuil', () => {
  assert.equal(
    report({
      durations: { 'packages/core': 1_500, 'packages/components': 38_250 },
      elapsedMs: 41_000,
      thresholdSeconds: 40,
    }),
    ['packages/components  38.3 s', 'packages/core         1.5 s', 'total                41.0 s (seuil : 40 s)'].join(
      '\n',
    ),
  );
});

// Une commande factice qui parle comme `pnpm -r --parallel`, pour ne pas lancer la vraie
// suite depuis ses propres tests.
const fakeTestUnit = (status = 0) => [
  process.execPath,
  '-e',
  `console.log('packages/fake test:unit$ jest'); console.log('packages/fake test:unit: Done'); process.exit(${status});`,
];

const timeTestUnit = (command, env = {}) =>
  spawnSync(process.execPath, [fileURLToPath(new URL('time-test-unit.mjs', import.meta.url)), ...command], {
    encoding: 'utf8',
    env: { ...process.env, ...env },
  });

test('lance la commande, relaie sa sortie et rapporte la charge puis les durées', () => {
  const { status, stdout } = timeTestUnit(fakeTestUnit());

  assert.equal(status, 0);
  assert.match(stdout, /^charge : \d+\.\d{2} pour \d+ CPU/);
  assert.match(stdout, /packages\/fake test:unit: Done/);
  assert.match(stdout, /packages\/fake +\d+\.\d s\ntotal +\d+\.\d s \(seuil : 40 s\)\n$/);
});

test('sort en échec quand le seuil surchargé par l’environnement est dépassé', () => {
  const { status, stdout } = timeTestUnit(fakeTestUnit(), { TEST_UNIT_THRESHOLD_SECONDS: '0' });

  assert.equal(status, 1);
  assert.match(stdout, /\(seuil : 0 s\)/);
});

test('échoue quand test:unit est tué par un signal, sans code de sortie', () => {
  assert.equal(exitCode({ status: null, elapsedMs: 10_000, thresholdSeconds: 40 }), 1);
});

test('refuse un seuil qui n’est pas un nombre positif, plutôt que de ne jamais échouer', () => {
  assert.throws(() => thresholdSeconds({ TEST_UNIT_THRESHOLD_SECONDS: 'quarante' }), /TEST_UNIT_THRESHOLD_SECONDS/);
});
