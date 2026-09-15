import { render, screen } from '@/__tests__/helpers';
import { ToastView } from './Toast';

test('nomme le bouton qui ferme la notification', () => {
  render(<ToastView title="Enregistré" />);

  expect(screen.getByRole('button', { name: 'Fermer la notification' })).toBeTruthy();
});
