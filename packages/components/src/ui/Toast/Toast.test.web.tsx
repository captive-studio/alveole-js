import { renderWeb, screen } from '@/__tests__/helpers/renderWeb';
import { Text } from 'react-native';
import { ToastView } from './Toast';

test('nomme le bouton qui ferme la notification', () => {
  renderWeb(<ToastView title="Enregistré" />);

  expect(screen.getByRole('button', { name: 'Fermer la notification' })).toBeTruthy();
});

test('rend un element passe en leading', () => {
  renderWeb(<ToastView title="Enregistré" variant="success" leading={<Text testID="logo">L</Text>} />);

  expect(screen.getByTestId('logo')).toBeTruthy();
});

test("n'affiche aucune icone avec leading={null}", () => {
  const { container } = renderWeb(<ToastView title="Enregistré" variant="success" leading={null} />);

  // Seule reste la croix de fermeture.
  expect(container.querySelectorAll('svg')).toHaveLength(1);
});
