import { act, renderWeb, screen, waitFor } from '@/__tests__/helpers/renderWeb';
import { toast } from '@tamagui/toast';
import { Pressable, Text } from 'react-native';
import { Toasts, useToast } from './Toasts';

// La file des notifications de Tamagui v3 est globale au module : chaque test repart à vide.
afterEach(() => {
  toast.dismiss();
});

function Declencheur() {
  const toast = useToast();
  return (
    <Pressable accessibilityRole="button" onPress={() => toast.present('Enregistré', 'Le dossier est à jour')}>
      <Text>Notifier</Text>
    </Pressable>
  );
}

test('affiche la notification presentee par useToast', async () => {
  renderWeb(
    <Toasts>
      <Declencheur />
    </Toasts>,
  );

  await act(async () => screen.getByRole('button', { name: 'Notifier' }).click());

  expect(await screen.findByText('Enregistré')).toBeTruthy();
  expect(screen.getByText('Le dossier est à jour')).toBeTruthy();
});

test('retire la notification fermee par sa croix', async () => {
  renderWeb(
    <Toasts>
      <Declencheur />
    </Toasts>,
  );
  await act(async () => screen.getByRole('button', { name: 'Notifier' }).click());

  await act(async () => (await screen.findByRole('button', { name: 'Fermer la notification' })).click());

  await waitFor(() => expect(screen.queryByText('Enregistré')).toBeNull());
});
