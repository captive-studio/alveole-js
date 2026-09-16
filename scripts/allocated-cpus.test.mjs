import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import { CFS_PERIOD, CFS_QUOTA, allocatedCpus, allocation } from './allocated-cpus.mjs';

test('déduit les cœurs alloués du quota cgroup', () => {
  assert.equal(
    allocatedCpus(() => '400000 100000', 16),
    4,
  );
});

test('prend la moitié des cœurs du nœud quand aucun quota n’est déclaré', () => {
  assert.equal(
    allocatedCpus(() => 'max 100000', 16),
    8,
  );
});

test('prend la moitié aussi quand le quota est illisible', () => {
  assert.equal(
    allocatedCpus(() => {
      throw new Error('ENOENT');
    }, 10),
    5,
  );
});

test('arrondit un quota fractionnaire vers le bas', () => {
  assert.equal(
    allocatedCpus(() => '150000 100000', 16),
    1,
  );
});

test('garde un cœur quand le quota est inférieur à un cœur', () => {
  assert.equal(
    allocatedCpus(() => '50000 100000', 16),
    1,
  );
});

test('imprime le compte alloué, pour les outils qui ne se dimensionnent qu’en ligne de commande', () => {
  const { stdout } = spawnSync(
    process.execPath,
    [fileURLToPath(new URL('print-allocated-cpus.mjs', import.meta.url))],
    {
      encoding: 'utf8',
    },
  );

  assert.match(stdout.trim(), /^[1-9][0-9]*$/);
});

test('lit le quota d’un cgroup v1, où cpu.max n’existe pas', () => {
  const files = { [CFS_QUOTA]: '400000', [CFS_PERIOD]: '100000' };

  assert.equal(
    allocatedCpus(path => {
      if (files[path] === undefined) throw new Error('ENOENT');
      return files[path];
    }, 16),
    4,
  );
});

test('traite le -1 d’un cgroup v1 comme une absence de plafond', () => {
  const files = { [CFS_QUOTA]: '-1', [CFS_PERIOD]: '100000' };

  assert.equal(
    allocatedCpus(path => {
      if (files[path] === undefined) throw new Error('ENOENT');
      return files[path];
    }, 16),
    8,
  );
});

test('dit d’où vient le compte, pour qu’un pod sans plafond se voie dans les logs', () => {
  assert.deepEqual(
    allocation(() => 'max 100000', 16),
    { cpus: 8, source: 'aucun plafond déclaré' },
  );
});

test('annonce sur la sortie d’erreur d’où vient le compte, sans polluer la substitution', () => {
  const { stdout, stderr } = spawnSync(
    process.execPath,
    [fileURLToPath(new URL('print-allocated-cpus.mjs', import.meta.url))],
    {
      encoding: 'utf8',
    },
  );

  assert.match(stdout.trim(), /^[1-9][0-9]*$/);
  assert.match(stderr, /cgroup v1|cgroup v2|aucun plafond déclaré/);
});
