import { A, Box, Divider, Sidebar, SidebarGroup, SidebarItem } from '@alveole/components';
import { makeStyles, useTheme } from '@alveole/theme';
import React from 'react';

const useStyles = makeStyles(({ spacingValue }) => ({
  // Le filet est encadré plutôt que marginé : `Divider` se pose en `width: 100%`, et une marge
  // droite serait ignorée. Le retrait passe donc par le padding de la boîte qui le porte, ce
  // qui le garde à égale distance des deux bords.
  //
  // Il ne touche pas les bords de la colonne : pleine largeur, il se lit comme une frontière de
  // panneau plutôt que comme une césure de liste. Le groupe porte l'écart sous le filet, cette
  // marge porte celui du dessus, et les deux s'équilibrent.
  dividerRow: {
    paddingLeft: spacingValue('150'),
    paddingRight: spacingValue('150'),
    marginTop: spacingValue('100'),
  },
}));

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
  const styles = useStyles();

  // Sous 992px la colonne se replie dans le menu de la barre, qui reste le seul contrôle.
  // Primer et Atlassian replient la leur dès 900px.
  if (!isVariant('desktop')) return null;

  // Une rubrique d'une seule page n'a pas de niveau 2 : le contenu reprend la pleine largeur
  // plutôt que de longer une colonne vide.
  if (groups.length === 0) return null;

  return (
    <Sidebar>
      {groups.map((group, rang) => (
        <React.Fragment key={group.title}>
          {/* Filet entre deux blocs, comme chez GitHub : le blanc seul ne suffit pas à détacher
              un groupe d'une page, qui sans lui se lit comme la suite du groupe précédent.
              Jamais avant le premier, qui n'a rien au-dessus de quoi se détacher. */}
          {rang > 0 && (
            <Box style={styles.dividerRow}>
              <Divider />
            </Box>
          )}
          <SidebarGroup title={group.title}>
            {group.items.map(item => (
              <SidebarItem key={item.key} title={item.title} href={item.href} />
            ))}
          </SidebarGroup>
        </React.Fragment>
      ))}
    </Sidebar>
  );
};
