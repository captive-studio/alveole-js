import assert from 'node:assert/strict';
import { mkdirSync, mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { test } from 'node:test';
import { cliquetsDepasses, rapport } from './check-coverage-ratchet.mjs';

/** Un faux depot : par paquet, le cliquet ecrit dans jest.config.js et la couverture mesuree. */
const depotAvec = paquets => {
  const racine = mkdtempSync(join(tmpdir(), 'cliquets-'));
  for (const [paquet, { cliquet, mesure }] of Object.entries(paquets)) {
    const dossier = join(racine, 'packages', paquet);
    mkdirSync(join(dossier, 'coverage'), { recursive: true });
    writeFileSync(
      join(dossier, 'jest.config.js'),
      `module.exports = { coverageThreshold: { global: ${JSON.stringify(cliquet)} } };`,
    );
    const total = Object.fromEntries(Object.entries(mesure).map(([m, pct]) => [m, { pct }]));
    writeFileSync(join(dossier, 'coverage', 'coverage-summary.json'), JSON.stringify({ total }));
  }

  return racine;
};

test('ne signale rien quand la couverture colle au cliquet', () => {
  const racine = depotAvec({
    core: { cliquet: { statements: 79, branches: 59 }, mesure: { statements: 79.4, branches: 59.8 } },
  });

  assert.deepEqual(cliquetsDepasses(racine, 2), []);
});

test('signale le cliquet laisse derriere par un gain de couverture', () => {
  const racine = depotAvec({
    core: { cliquet: { statements: 79, branches: 59 }, mesure: { statements: 79.4, branches: 66.2 } },
  });

  assert.deepEqual(cliquetsDepasses(racine, 2), [{ paquet: 'core', metrique: 'branches', cliquet: 59, mesure: 66.2 }]);
});

test('le rapport nomme le paquet, la metrique et les deux taux', () => {
  const lignes = rapport([{ paquet: 'core', metrique: 'branches', cliquet: 59, mesure: 66.2 }]);

  assert.match(lignes, /core/);
  assert.match(lignes, /branches/);
  assert.match(lignes, /59/);
  assert.match(lignes, /66\.2/);
});
