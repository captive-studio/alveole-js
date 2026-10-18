import { renderHookOnDesktop } from '@/__tests__/helpers/renderWeb';
import { soulignementDuLien } from '../../core/styleTamagui/soulignement';
import { useStyles } from './Link.styles';

// Un lien pris dans du texte ne doit pas se distinguer par sa seule couleur (WCAG 1.4.1) : il
// est souligné au repos, comme chez Atlassian et Base. Au survol, le soulignement disparaît :
// le changement signale le lien sous le pointeur sans rien déplacer. Le rendu, lui, se mesure
// dans le navigateur (apps/docs/e2e/link.spec.ts).
test("souligne le lien au repos, dans la couleur d'action du theme", () => {
  const { result } = renderHookOnDesktop(() => useStyles());

  expect(result.current.link).toEqual({ color: 'var(--text-action-high-info)' });
  expect(soulignementDuLien.default).toBe('underline');
});

test('retire le soulignement au survol', () => {
  expect(soulignementDuLien.hover).toBe('none');
});
