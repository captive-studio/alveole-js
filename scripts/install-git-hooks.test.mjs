import assert from 'node:assert/strict';
import { test } from 'node:test';
import { installeLesHooks } from './install-git-hooks.mjs';

test('fait pointer git sur les hooks versionnés du dépôt', () => {
  const appels = [];

  installeLesHooks(args => appels.push(args));

  assert.deepEqual(appels.at(-1), ['config', 'core.hooksPath', '.githooks']);
});

test("ne fait rien hors d'un dépôt git, comme dans le conteneur de la CI", () => {
  const horsDepot = () => {
    throw new Error('fatal: not in a git directory');
  };

  assert.doesNotThrow(() => installeLesHooks(horsDepot));
});
