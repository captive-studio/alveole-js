import { ALVEOLE_COMPONENTS_VERSION } from '@alveole/components';
import { renderScreen } from '../../__tests__/helpers/renderScreen';
import { DocFooter } from './DocFooter';

describe('DocFooter', () => {
  // La version affichee est celle publiee : sans elle, on ne sait pas quel kit on lit.
  it('affiche la version du kit', () => {
    const { getByText } = renderScreen(<DocFooter />);

    expect(getByText(`Alveole UI Kit — v${ALVEOLE_COMPONENTS_VERSION}`)).toBeTruthy();
  });
});
