import { renderNative } from '@/__tests__/helpers/renderNative';
import { LucideIcon, resolveShareIconName } from './LucideIcon';

describe('resolveShareIconName', () => {
  it.each([
    ['ios', 'Share'],
    ['android', 'Share2'],
    ['web', 'Forward'],
    ['windows', 'Share'],
    ['macos', 'Share'],
  ] as const)('retourne %s pour la plateforme %s', (platform, expected) => {
    expect(resolveShareIconName(platform)).toBe(expected);
  });
});

describe('LucideIcon _platformOverride', () => {
  it.each(['ios', 'android', 'web'] as const)('rend sans erreur pour _platformOverride=%s', async platform => {
    await expect(renderNative(<LucideIcon name="Share" size="md" _platformOverride={platform} />)).resolves.toBeTruthy();
  });
});

describe('LucideIcon résolution du nom', () => {
  it('rend l’icône Lucide correspondante quand le nom en fait partie', async () => {
    const { toJSON } = await renderNative(<LucideIcon name="Check" size="md" />);

    expect(toJSON()).toMatchObject({ props: { className: 'lucide lucide-check' } });
  });

  it('retombe sur une icône Lab quand le nom n’est pas une icône Lucide', async () => {
    const { toJSON } = await renderNative(<LucideIcon name="appleCore" size="md" />);

    expect(toJSON()).toMatchObject({ props: { className: 'lucide' } });
  });
});
