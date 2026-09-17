import { renderScreen } from '../../__tests__/helpers/renderScreen';
import { UIKitTopBar } from './UIKitTopBar';

describe('UIKitTopBar', () => {
  it('affiche la rubrique active avec une graisse medium', () => {
    const { getByRole } = renderScreen(
      <UIKitTopBar activeKey="components" items={[{ key: 'components', label: 'Composants', href: '/' }]} />,
    );

    const label = getByRole('link', { name: 'Composants' }).querySelector('typography') as HTMLElement;

    expect(label.style.fontWeight).toBe('var(--typography-corps-de-texte-md-medium-font-weight)');
  });
});
