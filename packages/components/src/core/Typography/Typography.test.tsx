import { renderNative } from '@/__tests__/helpers/renderNative';
import { CustomPalette } from '@alveole/theme';
import { StyleSheet } from 'react-native';
import { Typography } from './Typography';

describe('Typography', () => {
  it('applique la couleur de texte par defaut du theme', async () => {
    const { getByText } = await renderNative(<Typography>Mon texte</Typography>);

    const style = StyleSheet.flatten(getByText('Mon texte').props.style);

    expect(style.color).toBe(CustomPalette.light.text['default-grey']);
  });
});
