import assert from 'node:assert/strict';
import { test } from 'node:test';
import { installeLesHooks } from './install-git-hooks.mjs';

test('fait pointer git sur les hooks versionnés du dépôt', () => {
  const appels = [];

  installeLesHooks(args => appels.push(args));

  assert.deepEqual(appels, [['config', 'core.hooksPath', '.githooks']]);
});
