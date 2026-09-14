import { expect, test } from '@playwright/test';
import type { Result } from 'axe-core';
import { countByRule, describeTargets } from './violations';

const result = (id: string, targets: string[]) =>
  ({ id, impact: 'serious', nodes: targets.map(target => ({ target: [target] })) }) as Result;

test('compte les occurrences de chaque règle, nœud par nœud', () => {
  expect(countByRule([result('label', ['#a', '#b']), result('image-alt', ['img'])])).toEqual({
    label: 2,
    'image-alt': 1,
  });
});

test('décrit chaque violation par sa règle et son élément', () => {
  expect(describeTargets([result('label', ['#a', '#b'])])).toBe('label → #a\nlabel → #b');
});
