import { renderWeb, screen } from '@/__tests__/helpers/renderWeb';
import { BottomSheet } from './BottomSheet';

// Tamagui rend deux Frame par panneau, l'un porteur du contenu et l'autre vide : les deux
// héritent donc du rôle et du nom. On vise celui qui porte le contenu, le seul que
// l'utilisateur voit. Le doublon reste un défaut, à traiter chez Tamagui.
const dialogueVisible = (nom: string) =>
  screen.getAllByRole('dialog', { name: nom }).find(element => element.textContent?.includes('contenu'));

test('expose le panneau comme un dialogue nommé par son titre', () => {
  renderWeb(
    <BottomSheet open title="Filtrer" setOpen={() => undefined} fitContent>
      <div>contenu</div>
    </BottomSheet>,
  );

  expect(dialogueVisible('Filtrer')).toBeTruthy();
});
