import { renderWeb, screen } from '@/__tests__/helpers/renderWeb';
import { Text } from 'react-native';
import { Button } from './Button';

test('rend un element passe en leading, avant le libelle', () => {
  renderWeb(<Button variant="tertiary" title="Marie Curie" leading={<Text testID="avatar">MC</Text>} />);

  const bouton = screen.getByRole('button');
  const avatar = screen.getByTestId('avatar');
  expect(bouton.textContent?.indexOf('MC')).toBeLessThan(bouton.textContent!.indexOf('Marie Curie'));
  expect(avatar).toBeTruthy();
});

test('rend un element passe en trailing, apres le libelle', () => {
  renderWeb(<Button variant="tertiary" title="Filtres" trailing={<Text>FIN</Text>} />);

  const texte = screen.getByRole('button').textContent!;
  expect(texte.indexOf('FIN')).toBeGreaterThan(texte.indexOf('Filtres'));
});

test("rend l'icone d'un nom passe en leading", () => {
  const { container } = renderWeb(<Button variant="tertiary" title="Ajouter" leading="Plus" />);

  expect(container.querySelector('svg')).not.toBeNull();
});

test('un element en leading ne change pas le nom accessible', () => {
  renderWeb(<Button variant="tertiary" title="Marie Curie" leading={<Text>MC</Text>} />);

  expect(screen.getByRole('button', { name: 'Marie Curie' })).toBeTruthy();
});

test('les anciennes props d icone n existent plus', () => {
  // Le test vit dans le typecheck : il echoue si l'une de ces props redevient acceptee.
  const anciens = [
    // @ts-expect-error `startIcon` est remplace par `leading` (ADR 0028)
    <Button key="start" variant="primary" title="A" startIcon="Plus" />,
    // @ts-expect-error `endIcon` est remplace par `trailing` (ADR 0028)
    <Button key="end" variant="primary" title="A" endIcon="Plus" />,
  ];

  expect(anciens).toHaveLength(2);
});
