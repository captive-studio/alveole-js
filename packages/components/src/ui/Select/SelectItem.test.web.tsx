import { renderWeb, screen } from '@/__tests__/helpers/renderWeb';
import { SelectItem } from './SelectItem';

// Comme chez Primer, une barre d'accent dans la gouttiere signale l'option active : le fond gris
// seul se lisait mal sur un panneau blanc.
test('marque l option active par une barre', async () => {
  await renderWeb(<SelectItem label="Option A" highlighted />);

  expect(screen.getByTestId('select-item-barre')).toBeTruthy();
});
