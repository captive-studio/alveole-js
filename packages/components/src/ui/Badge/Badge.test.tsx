import { renderNative } from '@/__tests__/helpers/renderNative';
import { Badge } from './Badge';

describe('Badge', () => {
  it.each(['default', 'info', 'success', 'error', 'new', 'warning'] as const)(
    'rend le texte du badge %s',
    async variant => {
      const { getByText } = await renderNative(
        <Badge size="md" variant={variant}>
          Badge {variant}
        </Badge>,
      );

      expect(getByText(`Badge ${variant}`)).toBeTruthy();
    },
  );

  it('rend le texte avec une icone', async () => {
    const { getByText, getByTestId, root } = await renderNative(
      <Badge icon="Check" size="sm" variant="success">
        Badge icon
      </Badge>,
    );

    const badge = getByTestId('badge');
    // lucide-react-native ne pose que `data-testid` (convention web) sur son SVG,
    // jamais `testID` : injoignable via getByTestId en environnement natif.
    const icons = root?.queryAll(instance => instance.type === 'RNSVGSvgView') ?? [];

    expect(badge).toBeTruthy();
    expect(icons).toHaveLength(1);
    expect(icons[0]?.props).toEqual(expect.objectContaining({ width: 12, height: 12 }));
    expect(getByText('Badge icon')).toBeTruthy();
  });
});
