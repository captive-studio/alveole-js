import { CustomPalette } from '@alveole/theme';
import { renderHook } from '@testing-library/react-native';
import { couleurDuTexte } from './couleurDuTexte';
import { useStyles } from './Typography.styles';

const styles = async () => (await renderHook(() => useStyles())).result.current;

// Le defaut vit dans le composant et non dans une regle globale sur `body` (ADR 0009) : sans
// lui, le texte retombait sur le noir du theme tamagui au lieu du gris du design system.
it('applique la couleur de texte par defaut du theme', async () => {
  expect(couleurDuTexte(await styles())).toBe(CustomPalette.light.text['default-grey']);
});

it('laisse la couleur demandee primer sur le defaut', async () => {
  expect(couleurDuTexte(await styles(), 'red')).toBe('red');
});
