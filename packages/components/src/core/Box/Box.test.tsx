import { renderNative, screen } from '@/__tests__/helpers/renderNative';
import { StyleSheet } from 'react-native';
import { Box } from './Box';

const styleRendu = () => StyleSheet.flatten(screen.getByTestId('box').props.style);

// Parite avec le web : une cle de Spacings se resout en pixels en natif aussi.
test('resout un padding en cle de Spacings', async () => {
  await renderNative(<Box testID="box" p="2W" />);

  expect(styleRendu()).toMatchObject({ paddingTop: 16, paddingRight: 16, paddingBottom: 16, paddingLeft: 16 });
});

test('resout les espacements par cote et le gap en cles de Spacings', async () => {
  await renderNative(<Box testID="box" pt="1V" pr="1W" pb="3V" pl="3W" mt="1V" mr="1W" mb="3V" ml="3W" gap="4W" />);

  expect(styleRendu()).toMatchObject({
    paddingTop: 4,
    paddingRight: 8,
    paddingBottom: 12,
    paddingLeft: 24,
    marginTop: 4,
    marginRight: 8,
    marginBottom: 12,
    marginLeft: 24,
    gap: 32,
  });
});

test('resout une marge globale en cle de Spacings', async () => {
  await renderNative(<Box testID="box" m="2W" />);

  expect(styleRendu()).toMatchObject({ marginTop: 16, marginRight: 16, marginBottom: 16, marginLeft: 16 });
});

// Tamagui eclate couleur et epaisseur de bordure par cote, en natif ; la valeur resolue reste celle du web.
test('applique fond, bordure et rayon comme sur le web', async () => {
  await renderNative(
    <Box testID="box" backgroundColor="#f0f0f0" borderColor="#123456" borderWidth={1} borderRadius={8} />,
  );

  expect(styleRendu()).toMatchObject({
    backgroundColor: '#f0f0f0',
    borderTopColor: '#123456',
    borderRightColor: '#123456',
    borderBottomColor: '#123456',
    borderLeftColor: '#123456',
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  });
});
