import { expect, test } from '@playwright/test';
import { mkdirSync, mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { animatedZones, byDemonstration, missingSnapshots, snapshotName } from './cliches';

test('nomme le cliché d’une fiche d’après sa route', () => {
  expect(snapshotName('/components/Button')).toEqual(['components', 'Button.png']);
});

test('nomme le cliché d’une démonstration d’après sa fiche et son exemple', () => {
  expect(snapshotName('/components/Badge', 'Variants')).toEqual(['components', 'Badge', 'Variants.png']);
});

test('masque les animations Lottie sur leur fiche', () => {
  expect(animatedZones('/components/Lottie')).toEqual(['canvas']);
});

test('ne masque rien sur une fiche sans animation, même si elle dessine dans un canvas', () => {
  expect(animatedZones('/components/Signature')).toEqual([]);
});

test('capture Badge démonstration par démonstration, en premier composant (ADR 0036)', () => {
  expect(byDemonstration('/components/Badge')).toBe(true);
});

test('garde le cliché de fiche sur les fiches pas encore passées aux démonstrations', () => {
  expect(byDemonstration('/components/Button')).toBe(false);
});

test('signale la page dont aucun cliché n’a été pris', () => {
  const dir = mkdtempSync(join(tmpdir(), 'cliches-'));
  mkdirSync(join(dir, 'components', 'Badge'), { recursive: true });
  writeFileSync(join(dir, 'components', 'Badge', 'Variants.png'), '');
  writeFileSync(join(dir, 'components', 'A.png'), '');

  expect(missingSnapshots(['/components/A', '/components/Badge', '/components/Button'], dir)).toEqual([
    '/components/Button',
  ]);
});
