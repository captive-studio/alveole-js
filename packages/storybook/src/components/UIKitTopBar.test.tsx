import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import * as Router from 'expo-router';
import { fireEvent, renderScreen } from '../../__tests__/helpers/renderScreen';
import { UIKitTopBar } from './UIKitTopBar';

jest.mock('expo-router', () => ({
  ...jest.requireActual<typeof Router>('expo-router'),
  usePathname: jest.fn(() => '/'),
  useFocusEffect: () => {},
  useNavigation: () => ({}),
}));

describe('UIKitTopBar', () => {
  beforeEach(() => {
    jest.mocked(Router.usePathname).mockReturnValue('/');
  });

  it('signale la rubrique active comme page courante', () => {
    const { getByRole } = renderScreen(
      <UIKitTopBar activeKey="components" items={[{ key: 'components', label: 'Composants', href: '/' }]} />,
    );

    expect(getByRole('link', { name: 'Composants' }).getAttribute('aria-current')).toBe('page');
  });

  it('ouvre et referme le menu mobile depuis son bouton', () => {
    const { getByRole, queryByRole } = renderScreen(
      <UIKitTopBar activeKey="components" items={[{ key: 'components', label: 'Composants', href: '/' }]} />,
      { largeur: 390 },
    );

    expect(queryByRole('link', { name: 'Composants' })).toBeNull();
    fireEvent.click(getByRole('button', { name: 'Ouvrir le menu' }));
    expect(getByRole('link', { name: 'Composants' }).getAttribute('href')).toBe('/');
    fireEvent.click(getByRole('button', { name: 'Fermer le menu' }));
    expect(queryByRole('link', { name: 'Composants' })).toBeNull();
  });

  it('referme le menu après une navigation dans la même rubrique', () => {
    const pathname = jest.mocked(Router.usePathname).mockReturnValue('/components/Button');
    const bar = (
      <UIKitTopBar
        activeKey="components"
        items={[{ key: 'components', label: 'Composants', href: '/' }]}
        columnGroups={[{ title: 'Contrôles', items: [{ key: 'input', title: 'Input', href: '/components/Input' }] }]}
      />
    );
    const { getByRole, queryByRole, rerender } = renderScreen(bar, { largeur: 390 });

    fireEvent.click(getByRole('button', { name: 'Ouvrir le menu' }));
    expect(getByRole('link', { name: 'Input' }).getAttribute('href')).toBe('/components/Input');

    pathname.mockReturnValue('/components/Input');
    rerender(
      <UIKitTopBar
        activeKey="components"
        items={[{ key: 'components', label: 'Composants', href: '/' }]}
        columnGroups={[{ title: 'Contrôles', items: [{ key: 'input', title: 'Input', href: '/components/Input' }] }]}
      />,
    );

    expect(queryByRole('link', { name: 'Input' })).toBeNull();
    expect(getByRole('button', { name: 'Ouvrir le menu' })).toBeTruthy();
  });
});
