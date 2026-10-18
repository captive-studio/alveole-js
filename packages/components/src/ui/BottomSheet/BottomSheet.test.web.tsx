import { renderWeb, screen } from '@/__tests__/helpers/renderWeb';
import { BottomSheet } from './BottomSheet';

test('expose le panneau comme un dialogue nommé par son titre', () => {
  renderWeb(
    <BottomSheet open title="Filtrer" setOpen={() => undefined} fitContent>
      <div>contenu</div>
    </BottomSheet>,
  );

  expect(screen.getByRole('dialog', { name: 'Filtrer' }).textContent).toContain('contenu');
});
