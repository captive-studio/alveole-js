import { A, Sidebar, SidebarGroup, SidebarItem } from '@alveole/components';
import { useTheme } from '@alveole/theme';
import React from 'react';

export type UIKitColumnItem = {
  key: string;
  title: string;
  /** Typé depuis `A` pour ne pas dépendre d'expo-router ici. */
  href: React.ComponentProps<typeof A>['href'];
};

export type UIKitColumnGroup = {
  title: string;
  items: UIKitColumnItem[];
};

export type UIKitColumnProps = {
  groups: UIKitColumnGroup[];
};

/**
 * Navigation verticale du catalogue, sous la barre : elle liste le contenu de la rubrique
 * courante. Voir docs/adr/0007.
 *
 * Elle monte le `Sidebar` publié tel quel, sans logo - il est déjà dans la barre. Primer et
 * Atlassian font de même : ils réutilisent le composant de liste de leur design system et ne
 * fabriquent à la main que le conteneur.
 */
export const UIKitColumn = ({ groups }: UIKitColumnProps) => {
  const { isVariant } = useTheme();

  // Sous 992px la colonne se replie dans le menu de la barre, qui reste le seul contrôle.
  // Primer et Atlassian replient la leur dès 900px.
  if (!isVariant('desktop')) return null;

  // Une rubrique d'une seule page n'a pas de niveau 2 : le contenu reprend la pleine largeur
  // plutôt que de longer une colonne vide.
  if (groups.length === 0) return null;

  return (
    <Sidebar>
      {groups.map(group => (
        <SidebarGroup key={group.title} title={group.title}>
          {group.items.map(item => (
            <SidebarItem key={item.key} title={item.title} href={item.href} />
          ))}
        </SidebarGroup>
      ))}
    </Sidebar>
  );
};
