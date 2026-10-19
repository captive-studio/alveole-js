import { spawnSync } from 'node:child_process';

const args = process.argv.slice(2);

if (args.length === 1 && ['--help', '-h'].includes(args[0])) {
  console.log('Usage : pnpm run publish:ios [branche-ou-tag]');
  console.log('Construit et soumet à TestFlight la révision distante choisie (main par défaut).');
  process.exit(0);
}

if (args.length > 1 || (args.length === 1 && (!args[0] || args[0].startsWith('-')))) {
  console.error('Usage : pnpm run publish:ios [branche-ou-tag]');
  process.exit(1);
}

const ref = args[0] ?? 'main';
console.log(`Lancement du build iOS et de la soumission à TestFlight depuis ${ref}…`);

const result = spawnSync(
  'gh',
  ['workflow', 'run', 'build-ios.yml', '--repo', 'Captive-Studio/alveole-js', '--ref', ref],
  { stdio: 'inherit' },
);

if (result.error) {
  console.error(`Impossible de lancer GitHub CLI : ${result.error.message}`);
  console.error('Installer gh, puis se connecter avec gh auth login.');
  process.exit(1);
}

if (result.status !== 0) process.exit(result.status ?? 1);

console.log('Workflow lancé. Suivi du build et de la soumission :');
console.log('https://github.com/Captive-Studio/alveole-js/actions/workflows/build-ios.yml');
