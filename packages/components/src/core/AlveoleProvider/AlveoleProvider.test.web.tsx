import { tamaguiTestConfig } from '@/__tests__/helpers/tamaguiTestConfig';
import { toast } from '@tamagui/toast';
import { act, render, screen } from '@testing-library/react';
import { Pressable, Text } from 'react-native';
import { useToast } from '../../ui/Toast';
import { AlveoleProvider } from './AlveoleProvider';

afterEach(() => {
  toast.dismiss();
});

function Declencheur() {
  const toast = useToast();
  return (
    <Pressable accessibilityRole="button" onPress={() => toast.present('Enregistré')}>
      <Text>Notifier</Text>
    </Pressable>
  );
}

// La pile se monte seule, sans le wrapper de test : c'est son contrat.
test.each([true, false])('monte la pile obligatoire (keyboardProvider=%s)', async keyboardProvider => {
  render(
    <AlveoleProvider tamaguiConfig={tamaguiTestConfig} loader={false} staticCSS keyboardProvider={keyboardProvider}>
      <Declencheur />
    </AlveoleProvider>,
  );

  await act(async () => screen.getByRole('button', { name: 'Notifier' }).click());

  expect(await screen.findByText('Enregistré')).toBeTruthy();
});
