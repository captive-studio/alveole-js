import { spawn } from 'node:child_process';
import { resolve } from 'node:path';
import { createInterface } from 'node:readline';

const args = process.argv.slice(2);
if (args.some(arg => !['--fix', '--serial'].includes(arg))) {
  console.error('Usage : npm run check -- [--fix] [--serial]');
  process.exit(1);
}
if (!process.env.npm_execpath) {
  console.error('Lancer ce script avec npm run check.');
  process.exit(1);
}

const root = resolve(import.meta.dirname, '..');
const children = new Set();
const results = [];
const started = performance.now();
let interrupted = 0;

// Chaque tâche a son groupe de processus : interrompre aussi les descendants
// npm/Jest, qui resteraient sinon actifs après un Ctrl+C du coordinateur.
function interrupt(signal) {
  interrupted = signal === 'SIGINT' ? 130 : 143;
  for (const child of children) {
    if (!child.pid) continue;
    try {
      if (process.platform === 'win32') child.kill(signal);
      else process.kill(-child.pid, signal);
    } catch (error) {
      if (error.code !== 'ESRCH') throw error;
    }
  }
}
const onInterrupt = () => interrupt('SIGINT');
const onTerminate = () => interrupt('SIGTERM');
process.on('SIGINT', onInterrupt);
process.on('SIGTERM', onTerminate);

function run(name, extraArgs = []) {
  const start = performance.now();
  console.log(`[check] Début : ${name}`);
  return new Promise(resolveResult => {
    const child = spawn(process.execPath, [process.env.npm_execpath, 'run', name, ...extraArgs], {
      cwd: root,
      detached: process.platform !== 'win32',
      stdio: ['ignore', 'pipe', 'pipe'],
    });
    children.add(child);
    for (const stream of [child.stdout, child.stderr]) {
      createInterface({ input: stream }).on('line', line => console.log(`[${name}] ${line}`));
    }
    child.on('error', error => console.error(`[${name}] ${error.message}`));
    child.on('close', (code, signal) => {
      children.delete(child);
      const result = { name, ok: code === 0 && !signal, signal, seconds: (performance.now() - start) / 1000 };
      results.push(result);
      console.log(`[check] ${name} : ${result.ok ? 'OK' : 'ÉCHEC'} (${result.seconds.toFixed(1)} s)`);
      resolveResult(result);
    });
  });
}

try {
  // Terminer toutes les écritures avant les contrôles concurrents. Les scripts
  // de workspace peuvent alors régénérer les sources sans réécrire leur contenu.
  await run(args.includes('--fix') ? 'format' : 'format:check');
  if (!interrupted) {
    const generated = await run('generate:sources', ['--workspace=packages/components']);
    if (generated.ok && !interrupted) {
      const pending = ['test:unit', 'typecheck', 'lint'];
      const worker = async () => {
        while (pending.length && !interrupted) await run(pending.shift());
      };
      await Promise.all(Array.from({ length: args.includes('--serial') ? 1 : 2 }, worker));
    }
  }
} finally {
  process.off('SIGINT', onInterrupt);
  process.off('SIGTERM', onTerminate);
}

console.log('\n[check] Résultat de la validation :');
for (const result of results) {
  console.log(
    `  ${result.ok ? 'OK' : 'ÉCHEC'} ${result.name} — ${result.seconds.toFixed(1)} s${result.signal ? ` (${result.signal})` : ''}`,
  );
}
console.log(`[check] Total : ${((performance.now() - started) / 1000).toFixed(1)} s`);
process.exitCode = interrupted || (results.some(result => !result.ok) ? 1 : 0);
