import { renderNative } from '@/__tests__/helpers/renderNative';
import { Highlight } from './Highlight';

describe('langages de Highlight', () => {
  it('conserve les caractères du texte brut sans les interpréter', async () => {
    const view = await renderNative(<Highlight language="plaintext">{'plain <text> & value'}</Highlight>);

    expect(JSON.stringify(view.toJSON())).toContain('plain <text> & value');
  });
});
