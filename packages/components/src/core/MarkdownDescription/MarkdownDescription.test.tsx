import { Linking } from 'react-native';
import { fireEvent, renderNative, screen } from '../../../__tests__/helpers/renderNative';
import { MarkdownDescription } from './MarkdownDescription';

test('rend les titres, listes imbriquées, tableaux et blocs de code en natif', async () => {
  await renderNative(
    <MarkdownDescription>{`## Configuration

Un texte **important** avec du code \`iosAppId\`.

3. Installer
   - Dépendance
4. Configurer

| Prop | Type |
| --- | --- |
| iosAppId | string |

> Une citation.

\`\`\`js
const version = 1;
\`\`\``}</MarkdownDescription>,
  );

  expect(screen.getByText('Configuration')).toBeTruthy();
  expect(screen.getByText('important')).toBeTruthy();
  expect(screen.getByText('3.')).toBeTruthy();
  expect(screen.getByText('4.')).toBeTruthy();
  expect(screen.getByText('Dépendance')).toBeTruthy();
  expect(screen.getByText('Type')).toBeTruthy();
  expect(screen.getByText('Une citation.')).toBeTruthy();
  expect(screen.getByText('const version = 1;')).toBeTruthy();
});

test('ouvre un lien Markdown depuis son texte sur mobile', async () => {
  const ouvrir = jest.spyOn(Linking, 'openURL').mockResolvedValue(undefined);
  await renderNative(<MarkdownDescription>{'[Documentation](https://example.com)'}</MarkdownDescription>);

  await fireEvent.press(screen.getByRole('link'));

  expect(ouvrir).toHaveBeenCalledWith('https://example.com');
  ouvrir.mockRestore();
});
