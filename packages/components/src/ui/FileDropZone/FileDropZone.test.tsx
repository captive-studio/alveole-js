import { renderNative, screen } from '@/__tests__/helpers/renderNative';
import { Text } from 'react-native';
import { FileDropZone } from './FileDropZone';

test('hors web, la zone rend simplement ses enfants', async () => {
  await renderNative(
    <FileDropZone value={null} onChange={jest.fn()}>
      <Text>Formulaire</Text>
    </FileDropZone>,
  );

  expect(screen.getByText('Formulaire')).toBeTruthy();
});
