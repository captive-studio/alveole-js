import { renderWeb, screen } from '@/__tests__/helpers/renderWeb';
import { ToastView } from './Toast';

test('nomme le bouton qui ferme la notification', () => {
  renderWeb(<ToastView title="Enregistré" />);

  expect(screen.getByRole('button', { name: 'Fermer la notification' })).toBeTruthy();
});
