import { fireEvent, renderNative } from '@/__tests__/helpers/renderNative';
import { MediaCard } from './MediaCard';

describe('MediaCard', () => {
  it("remplace l'aperçu par l'icône de fichier quand l'image échoue", async () => {
    const { getByTestId, queryByTestId } = await renderNative(
      <MediaCard nom="devis.pdf" type="PDF" apercu="https://exemple.test/apercu.png" />,
    );
    await fireEvent(getByTestId('media-card-apercu'), 'error', { nativeEvent: { error: 'introuvable' } });
    expect(queryByTestId('media-card-apercu')).toBeNull();
  });

  it('déclenche onPress', async () => {
    const onPress = jest.fn();
    const { getByRole } = await renderNative(<MediaCard nom="devis.pdf" onPress={onPress} />);
    await fireEvent.press(getByRole('button'));
    expect(onPress).toHaveBeenCalled();
  });
});
