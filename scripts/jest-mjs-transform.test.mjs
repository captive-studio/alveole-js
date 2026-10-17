import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import test from 'node:test';

const { withMjsTransform } = createRequire(import.meta.url)('./jest-mjs-transform.cjs');

test('étend le transform JavaScript du preset aux modules .mjs', () => {
  const babel = 'babel-jest';
  const asset = 'asset-transformer';

  assert.deepEqual(withMjsTransform({ '\\.[jt]sx?$': babel, '^.+\\.png$': asset }), {
    '^.+\\.png$': asset,
    '\\.m?[jt]sx?$': babel,
  });
});

test('refuse un preset sans transform JavaScript au motif attendu', () => {
  assert.throws(() => withMjsTransform({ '\\.[jt]s$': 'babel-jest' }), /\\\.\[jt\]sx\?\$/);
});
