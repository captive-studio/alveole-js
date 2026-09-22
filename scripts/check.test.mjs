import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { copyFile, mkdir, mkdtemp, readFile, realpath, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { test } from 'node:test';
import { setTimeout } from 'node:timers/promises';

/**
 * Le faux gestionnaire de paquets que `check.mjs` lance a la place de npm. Il journalise son
 * demarrage et sa fin dans un fichier d'evenements, ce qui permet aux tests d'observer
 * l'ordonnancement reel des taches. Son comportement se pilote par variables d'environnement.
 */
const FAUX_NPM = `import { appendFileSync, existsSync, writeFileSync } from 'node:fs';
import { setTimeout as delay } from 'node:timers/promises';
import { spawn } from 'node:child_process';
if (process.cwd() !== process.env.FIXTURE_ROOT) throw new Error('wrong cwd');
const args = process.argv.slice(2);
const task = args[args.indexOf('run') + 1];
if (process.env.FAIL === 'signal' && task === 'test:unit') process.kill(process.pid, 'SIGTERM');
const record = event => appendFileSync(process.env.EVENTS, JSON.stringify({ task, event }) + '\\n');
appendFileSync(process.env.ARGS, JSON.stringify(args) + '\\n');
if (task === 'typecheck') await delay(Number(process.env.START_DELAY || 0));
record('start');
if (process.env.SYNC_WORKERS === '1' && ['test:unit', 'typecheck'].includes(task)) {
  writeFileSync(process.env.FIXTURE_ROOT + '/' + task + '.ready', '');
  const other = task === 'test:unit' ? 'typecheck' : 'test:unit';
  const deadline = Date.now() + 5000;
  while (!existsSync(process.env.FIXTURE_ROOT + '/' + other + '.ready')) {
    if (Date.now() >= deadline) throw new Error('second worker did not start');
    await delay(10);
  }
}
if (process.env.DESCENDANT === '1' && task === 'test:unit') {
  spawn(process.execPath, ['--input-type=module', '-e', \`
    import { appendFileSync } from 'node:fs';
    const record = event => appendFileSync(process.env.EVENTS, JSON.stringify({task:'descendant', event}) + '\\\\n');
    process.on('SIGTERM', () => { record('stop'); process.exit(0); });
    record('start');
    setInterval(() => {}, 1000);
  \`], { stdio: 'inherit' });
  setInterval(() => {}, 1000);
} else if (process.env.DESCENDANT === '1' && task === 'typecheck') {
  // Garder le second worker occupé jusqu'au signal, même sur un runner chargé.
  setInterval(() => {}, 1000);
} else {
  setTimeout(() => {
    record('end');
    console.log(task + ' output');
    process.exit((process.env.FAIL || '').split(',').includes(task) ? 17 : 0);
  }, 80);
}
`;

async function fixture(t, args = [], fail = '', env = {}) {
  const root = await realpath(await mkdtemp(join(tmpdir(), 'alveole-check-')));
  t.after(() => rm(root, { recursive: true, force: true }));
  await mkdir(join(root, 'scripts'));
  const script = join(root, 'scripts/check.mjs');
  await copyFile(new URL('./check.mjs', import.meta.url), script);
  const events = join(root, 'events.jsonl');
  await writeFile(events, '');
  // Les arguments passés au gestionnaire de paquets sont relevés à part : les tests
  // d'ordonnancement comparent les événements un par un, et y mêler l'argv les rendrait
  // illisibles pour une question qui ne les concerne pas.
  const argv = join(root, 'argv.jsonl');
  await writeFile(argv, '');
  const npm = join(root, 'npm.mjs');
  await writeFile(npm, FAUX_NPM);
  const child = spawn(process.execPath, [script, ...args], {
    env: { ...process.env, ...env, npm_execpath: npm, EVENTS: events, ARGS: argv, FAIL: fail, FIXTURE_ROOT: root },
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  let output = '';
  child.stdout.on('data', chunk => (output += chunk));
  child.stderr.on('data', chunk => (output += chunk));
  const done = new Promise(resolve => child.on('close', code => resolve({ code, output })));
  const readEvents = async () => (await readFile(events, 'utf8')).trim().split('\n').filter(Boolean).map(JSON.parse);
  const readArgv = async () => (await readFile(argv, 'utf8')).trim().split('\n').filter(Boolean).map(JSON.parse);
  return { child, done, readEvents, readArgv };
}

function peak(events) {
  let active = 0;
  let maximum = 0;
  for (const event of events) {
    active += event.event === 'start' ? 1 : -1;
    maximum = Math.max(maximum, active);
  }
  return maximum;
}

test('prépare les sources avant les trois contrôles, avec deux tâches au maximum', async t => {
  // Le chevauchement dépend d'un rendez-vous explicite, pas de la vitesse du runner.
  // Retarder un worker au-delà des 80 ms de travail reproduit l'ordonnancement CI.
  const { done, readEvents } = await fixture(t, [], '', { SYNC_WORKERS: '1', START_DELAY: '1000' });
  assert.equal((await done).code, 0);
  const events = await readEvents();
  assert.deepEqual(events.slice(0, 4), [
    { task: 'format:check', event: 'start' },
    { task: 'format:check', event: 'end' },
    { task: 'generate:sources', event: 'start' },
    { task: 'generate:sources', event: 'end' },
  ]);
  assert.deepEqual(
    events
      .filter(e => e.event === 'end')
      .map(e => e.task)
      .sort(),
    ['format:check', 'generate:sources', 'lint', 'test:unit', 'typecheck'],
  );
  assert.equal(peak(events), 2);
});

test('termine tous les contrôles indépendants et remonte chaque échec', async t => {
  const { done, readEvents } = await fixture(t, [], 'format:check,typecheck,lint');
  const result = await done;
  assert.equal(result.code, 1);
  for (const task of ['format:check', 'typecheck', 'lint']) assert.match(result.output, new RegExp(`ÉCHEC ${task}`));
  assert.equal((await readEvents()).filter(e => e.event === 'end').length, 5);
});

test('une erreur de génération empêche les contrôles dépendants', async t => {
  const { done, readEvents } = await fixture(t, [], 'generate:sources');
  assert.equal((await done).code, 1);
  assert.equal((await readEvents()).length, 4);
});

test('--fix formate avant les contrôles et --serial limite à une tâche', async t => {
  const { done, readEvents } = await fixture(t, ['--fix', '--serial']);
  assert.equal((await done).code, 0);
  const events = await readEvents();
  assert.equal(events[0].task, 'format');
  assert.equal(peak(events), 1);
});

test('refuse les options inconnues avant de lancer une commande', async t => {
  const { done, readEvents } = await fixture(t, ['--unknown']);
  assert.equal((await done).code, 1);
  assert.deepEqual(await readEvents(), []);
});

test(
  'une interruption arrête aussi les descendants et ne lance plus de tâche',
  { skip: process.platform === 'win32', timeout: 15000 },
  async t => {
    const { child, done, readEvents } = await fixture(t, [], '', { DESCENDANT: '1' });
    t.after(() => {
      if (child.exitCode === null) child.kill('SIGTERM');
    });
    const deadline = Date.now() + 10000;
    while (!(await readEvents()).some(e => e.task === 'descendant' && e.event === 'start')) {
      assert.ok(Date.now() < deadline, 'le descendant doit démarrer');
      await setTimeout(10);
    }
    child.kill('SIGTERM');
    assert.equal((await done).code, 143);
    const events = await readEvents();
    assert.ok(events.some(e => e.task === 'descendant' && e.event === 'stop'));
    assert.ok(!events.some(e => e.task === 'lint'));
  },
);

test('un processus terminé par un signal fait échouer la validation', async t => {
  const { done, readEvents } = await fixture(t, [], 'signal');
  const result = await done;
  assert.equal(result.code, 1);
  assert.match(result.output, /ÉCHEC test:unit/);
  assert.ok((await readEvents()).some(e => e.task === 'lint' && e.event === 'end'));
});

// pnpm veut ses options avant la sous-commande : `pnpm run x --filter y` passerait
// `--filter` au script au lieu de sélectionner le workspace, et la génération tournerait
// à la racine, où il n'y a rien à générer.
test('place les options du gestionnaire avant la sous-commande', async t => {
  const { done, readArgv } = await fixture(t);
  await done;

  assert.deepEqual(
    (await readArgv()).find(argv => argv.includes('generate:sources')),
    ['--filter', '@alveole/components', 'run', 'generate:sources'],
  );
});
