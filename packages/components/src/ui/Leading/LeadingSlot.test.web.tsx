import { renderOnDesktop, renderWeb, screen } from '@/__tests__/helpers/renderWeb';
import { Text } from 'react-native';
import { ActionMenuItem } from '../ActionMenu/ActionMenuItem';
import { SidebarItem } from '../Sidebar/SidebarItem';
import { Tag } from '../Tag';

// Le contrat commun du contenu de tete (ADR 0028), tenu sur plusieurs composants : un
// element passe en `leading` est rendu avant le libelle, et ne s'ajoute pas a son nom.
const avant = (conteneur: HTMLElement, element: string, libelle: string) => {
  const texte = conteneur.textContent ?? '';
  return texte.indexOf(element) > -1 && texte.indexOf(element) < texte.indexOf(libelle);
};

test('Tag rend un element en leading avant son libelle', () => {
  const { container } = renderWeb(
    <Tag size="md" leading={<Text>MC</Text>}>
      Marie Curie
    </Tag>,
  );

  expect(avant(container, 'MC', 'Marie Curie')).toBe(true);
});

test('ActionMenuItem rend un element en leading avant son libelle', () => {
  const { container } = renderWeb(<ActionMenuItem title="Marie Curie" leading={<Text>MC</Text>} />);

  expect(avant(container, 'MC', 'Marie Curie')).toBe(true);
});

test('SidebarItem garde son libelle pour nom accessible avec un element en leading', () => {
  renderOnDesktop(<SidebarItem title="Accueil" leading={<Text>MC</Text>} href="/x" />);

  expect(screen.getByRole('link', { name: 'Accueil' })).toBeTruthy();
});

test("l'emplacement d'un element est masque aux lecteurs d'ecran", () => {
  renderWeb(
    <Tag size="md" leading={<Text>MC</Text>}>
      Brouillon
    </Tag>,
  );

  // Cible l'emplacement par son contenu : Tamagui v3 pose aussi un `<span aria-hidden>` de
  // revision de config en tete de l'arbre, qu'un selecteur generique attraperait d'abord.
  expect(screen.getByText('MC').closest('[aria-hidden="true"]')).not.toBeNull();
});
