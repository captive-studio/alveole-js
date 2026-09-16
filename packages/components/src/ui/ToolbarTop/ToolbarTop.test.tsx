import { renderNative } from '@/__tests__/helpers/renderNative';
import { ToolbarTop } from './ToolbarTop';

// Le bouton de navigation n'affiche qu'une fleche. Son nom ne peut pas etre devine depuis
// l'icone : la meme fleche sert a revenir, a replier un panneau ou a ouvrir un menu, et seul
// l'appelant sait laquelle. Le type l'exige donc des qu'`onNavigate` est fourni.
it('nomme le bouton de navigation avec ce que l appelant en dit', async () => {
  const { getByRole } = await renderNative(
    <ToolbarTop title="Dossier" onNavigate={() => undefined} navigationLabel="Revenir aux dossiers" />,
  );

  expect(getByRole('button', { name: 'Revenir aux dossiers' })).toBeTruthy();
});
