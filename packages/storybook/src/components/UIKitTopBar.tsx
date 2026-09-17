import { A, Box, Divider, Header, LucideIcon, SidebarGroup, SidebarItem, Typography } from '@alveole/components';
import { makeStyles, useTheme } from '@alveole/theme';
import React from 'react';
import { Pressable } from 'react-native';
import type { UIKitColumnGroup } from './UIKitColumn';

export type UIKitTopBarItem = {
  key: string;
  label: string;
  /** Typé depuis `A` pour ne pas dépendre d'expo-router ici. */
  href: React.ComponentProps<typeof A>['href'];
};

export type UIKitTopBarProps = {
  activeKey: string;
  items: UIKitTopBarItem[];
  /**
   * Niveau 2 de la rubrique courante. Sur desktop il est rendu par la colonne ; sous 992px
   * la colonne se replie et son contenu descend ici, pour que le menu de la barre reste la
   * seule commande de navigation. Voir docs/adr/0007.
   */
  columnGroups?: UIKitColumnGroup[];
};

const AlveoleLogo = () => {
  const { color, radius, text } = useTheme();
  return (
    <Box
      style={{
        width: 32,
        height: 32,
        borderRadius: radius('md'),
        backgroundColor: color.light.background['action-high-primary'],
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Typography style={{ ...text['Corps de texte'].XS.Bold, color: '#fff' }}>A</Typography>
    </Box>
  );
};

type NavItemProps = Omit<UIKitTopBarItem, 'key'> & {
  current: boolean;
  block?: boolean;
};

const useNavItemStyles = makeStyles(({ color, radius, spacingValue, text }) => {
  const activeLabelTypography = text['Corps de texte'].MD.Medium;

  return {
    container: {
      height: 32,
      paddingLeft: spacingValue('3V'),
      paddingRight: spacingValue('3V'),
      borderRadius: radius('md'),
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      transitionProperty: 'background-color',
      transitionDuration: '0.12s',
      transitionTimingFunction: 'ease-out',
    },
    containerHover: {
      backgroundColor: color.light.background['transparent-hover'],
    },
    label: {
      ...text['Corps de texte'].MD.Regular,
      color: color.light.text['mention-grey'],
    },
    labelCurrent: {
      ...activeLabelTypography,
      color: color.light.text['title-grey'],
    },
    // Copie invisible du libellé actif : elle réserve la largeur que prendra l'item
    // une fois courant, sinon toute la barre se décale au changement de page. Repris de
    // UnderlineTabbedInterface, chez Primer.
    labelGhost: {
      ...activeLabelTypography,
      height: 0,
      overflow: 'hidden',
    },
  };
});

/**
 * Item de navigation de la barre : aucun remplissage à l'état courant, qui se signale
 * par le contraste et la graisse seuls. Le fond neutre est réservé au survol.
 *
 * Bâti sur `A` pour obtenir une vraie ancre : clic milieu, ouverture en nouvel onglet et
 * aperçu de la cible dans la barre d'état ne s'obtiennent pas avec un `Pressable` seul.
 */
const NavItem = ({ label, href, current, block = false }: NavItemProps) => {
  const styles = useNavItemStyles();

  return (
    <A
      href={href}
      direction="replace"
      ariaCurrent={current ? 'page' : undefined}
      style={{ ...styles.container, alignItems: block ? 'flex-start' : 'center' }}
      hoverStyle={styles.containerHover}
    >
      <Typography style={current ? styles.labelCurrent : styles.label}>{label}</Typography>
      <Box aria-hidden>
        <Typography style={styles.labelGhost}>{label}</Typography>
      </Box>
    </A>
  );
};

export const UIKitTopBar = ({ activeKey, items, columnGroups = [] }: UIKitTopBarProps) => {
  const { color, isVariant, spacing } = useTheme();
  // Les items sont des ancres : la navigation ne passe plus par un callback qui pourrait
  // refermer le menu au clic. On retient donc la page pour laquelle le menu a été ouvert,
  // et il se referme de lui-même dès qu'on arrive ailleurs, sans effet de synchronisation.
  const [openedFor, setOpenedFor] = React.useState<string | null>(null);
  const menuOpen = openedFor === activeKey;
  const toggleMenu = () => setOpenedFor(menuOpen ? null : activeKey);

  if (isVariant('mobile')) {
    return (
      <>
        <Header
          logo={<AlveoleLogo />}
          right={
            <Pressable accessibilityRole="button" onPress={toggleMenu} style={{ padding: 8 }}>
              <LucideIcon name={menuOpen ? 'X' : 'Menu'} size="md" color={color.light.text['title-grey']} />
            </Pressable>
          }
        />
        {menuOpen && (
          <Box
            style={{
              position: 'sticky',
              top: 64,
              left: 0,
              right: 0,
              zIndex: 99,
              backgroundColor: color.light.background['default-grey'],
              borderBottomWidth: 1,
              borderBottomColor: color.light.border['default-grey'],
              paddingTop: spacing('2W'),
              paddingBottom: spacing('2W'),
              paddingLeft: spacing('2W'),
              paddingRight: spacing('2W'),
              display: 'flex',
              flexDirection: 'column',
              gap: spacing('050'),
            }}
          >
            {items.map(({ key, ...item }) => (
              <NavItem key={key} {...item} current={activeKey === key} block />
            ))}

            {columnGroups.length > 0 && <Divider />}

            {columnGroups.map(group => (
              <SidebarGroup key={group.title} title={group.title}>
                {group.items.map(item => (
                  <SidebarItem key={item.key} title={item.title} href={item.href} />
                ))}
              </SidebarGroup>
            ))}
          </Box>
        )}
      </>
    );
  }

  const right = (
    <Box display="flex" flexDirection="row" flexWrap="wrap" gap={8}>
      {items.map(({ key, ...item }) => (
        <NavItem key={key} {...item} current={activeKey === key} />
      ))}
    </Box>
  );

  return <Header logo={<AlveoleLogo />} title="Alveole UI Kit" right={right} />;
};
