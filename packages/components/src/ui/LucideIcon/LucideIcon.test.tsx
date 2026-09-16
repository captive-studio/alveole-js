import { renderNative } from '@/__tests__/helpers/renderNative';
import { LucideIcon, resolveShareIconName } from './LucideIcon';
import { LucideIconPropsJSON } from './LucideIcon.props';

test('décrit les tailles et les noms des icônes dans le schéma du catalogue', () => {
  expect(LucideIconPropsJSON).toMatchObject({
    type: 'object',
    required: expect.arrayContaining(['size', 'name']),
    properties: {
      size: { type: 'string', enum: ['xs', 'sm', 'md', 'lg', 'xl'] },
      name: { type: 'string', enum: expect.arrayContaining(['Check', 'Share', 'Share2', 'Forward']) },
    },
  });
});

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
    await expect(
      renderNative(<LucideIcon name="Share" size="md" _platformOverride={platform} />),
    ).resolves.toBeTruthy();
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

it('conserve une icône hors de la sélection des applications clientes', async () => {
  const { toJSON } = await renderNative(<LucideIcon name="Telescope" size="md" />);
  expect(toJSON()).toMatchObject({ props: { className: 'lucide lucide-telescope' } });
});

it('préserve le dessin, la taille, la couleur et le trait Lucide', async () => {
  const { toJSON, root } = await renderNative(<LucideIcon name="Check" size="lg" color="#123456" />);
  expect(toJSON()).toMatchObject({
    props: { width: 32, height: 32, stroke: '#123456', strokeWidth: 1.5 },
  });
  const paths = root?.queryAll(instance => instance.type === 'RNSVGPath') ?? [];
  expect(paths).toHaveLength(1);
  expect(paths[0]?.props.d).toBe('M20 6 9 17l-5-5');
});

it('conserve les alias utilisés dans les applications', async () => {
  const canonical = await renderNative(<LucideIcon name="House" size="md" />);
  const alias = await renderNative(<LucideIcon name="Home" size="md" />);
  expect(alias.toJSON()).toEqual(canonical.toJSON());
});
