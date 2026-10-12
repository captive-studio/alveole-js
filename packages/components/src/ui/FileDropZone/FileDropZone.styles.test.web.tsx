import { renderHookOnDesktop } from '@/__tests__/helpers/renderWeb';
import { useStyles } from './FileDropZone.styles';

test('la surcouche porte une bordure bleue en tirets et un fond bleu transparent', () => {
  const { result } = renderHookOnDesktop(() => useStyles());
  const { surcouche } = result.current;

  expect(surcouche.borderStyle).toBe('dashed');
  expect(surcouche.borderColor).toBe('var(--border-plain-info)');
  expect(surcouche.backgroundColor).toBe('color-mix(in srgb, var(--background-flat-info) 10%, transparent)');
  expect(surcouche.pointerEvents).toBe('none');
});
