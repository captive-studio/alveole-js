import { expect, test } from '@playwright/test';
import { animatedZones, snapshotName } from './cliches';

test('nomme le cliché d’une fiche d’après sa route', () => {
  expect(snapshotName('/components/Button')).toEqual(['components', 'Button.png']);
});

test('masque les animations Lottie sur leur fiche', () => {
  expect(animatedZones('/components/Lottie')).toEqual(['canvas']);
});

test('ne masque rien sur une fiche sans animation, même si elle dessine dans un canvas', () => {
  expect(animatedZones('/components/Signature')).toEqual([]);
});
