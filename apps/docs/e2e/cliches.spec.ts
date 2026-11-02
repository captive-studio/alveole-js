import { expect, test } from '@playwright/test';
import { mkdirSync, mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { animatedZones, byDemonstration, missingSnapshots, snapshotName, withoutSnapshot } from './cliches';

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

test('capture Badge démonstration par démonstration (ADR 0036)', () => {
  expect(byDemonstration('/components/Badge')).toBe(true);
});

test('capture toute fiche démonstration par démonstration, sans liste écrite en dur', () => {
  expect(byDemonstration('/components/Avatar')).toBe(true);
});

test('garde le cliché de fiche sur les fiches à couche ouverte, que la démonstration couperait', () => {
  expect(byDemonstration('/components/Button')).toBe(false);
});

test('ne prend aucun cliché des pages de texte, dont l’audit suffit', () => {
  expect(withoutSnapshot('/theme/css-variables')).toBe(true);
});

test('ne prend aucun cliché de l’index du catalogue', () => {
  expect(withoutSnapshot('/components')).toBe(true);
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

test('n’attend aucun cliché des pages de texte', () => {
  const dir = mkdtempSync(join(tmpdir(), 'cliches-'));

  expect(missingSnapshots(['/components', '/theme/css-variables'], dir)).toEqual([]);
});
