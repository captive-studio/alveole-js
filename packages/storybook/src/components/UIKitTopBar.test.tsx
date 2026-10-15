import { renderScreen } from '../../__tests__/helpers/renderScreen';
import { UIKitTopBar } from './UIKitTopBar';

describe('UIKitTopBar', () => {
  it('signale la rubrique active comme page courante', () => {
    const { getByRole } = renderScreen(
      <UIKitTopBar activeKey="components" items={[{ key: 'components', label: 'Composants', href: '/' }]} />,
    );

    expect(getByRole('link', { name: 'Composants' }).getAttribute('aria-current')).toBe('page');
  });
});
