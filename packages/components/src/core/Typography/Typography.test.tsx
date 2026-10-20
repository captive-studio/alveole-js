import { renderNative } from '@/__tests__/helpers/renderNative';
import { Badge } from '../../ui/Badge';
import { Typography } from './Typography';

it('conserve la hauteur de ligne absolue des styles React Native', async () => {
  const { getByText } = await renderNative(<Typography style={{ fontSize: 20, lineHeight: 28 }}>Titre</Typography>);

  expect(getByText('Titre')).toHaveStyle({ fontSize: 20, lineHeight: 28 });
});

it('conserve la derniere hauteur de ligne dans un tableau de styles imbrique', async () => {
  const { getByText } = await renderNative(
    <Typography style={[{ fontSize: 20, lineHeight: 24 }, [false, { lineHeight: 28 }]]}>Titre</Typography>,
  );

  expect(getByText('Titre')).toHaveStyle({ fontSize: 20, lineHeight: 28 });
});

it('laisse les ratios explicites des props Tamagui fonctionner', async () => {
  const { getByText } = await renderNative(
    <Typography fontSize={20} lineHeight={1.5}>
      Texte
    </Typography>,
  );

  expect(getByText('Texte')).toHaveStyle({ fontSize: 20, lineHeight: 30 });
});

it('garde le texte du badge dans sa hauteur de ligne de 20 points', async () => {
  const { getByText } = await renderNative(
    <Badge size="sm" variant="info">
      core
    </Badge>,
  );

  expect(getByText('core')).toHaveStyle({ fontSize: 12, lineHeight: 20 });
});
