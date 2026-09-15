import { Box, Header, LucideIcon, Typography } from '@alveole/components';
import { makeStyles, useTheme } from '@alveole/theme';
import React from 'react';
import { Pressable, PressableStateCallbackType } from 'react-native';

export type UIKitTopBarItem = {
  key: string;
  label: string;
  onPress: () => void;
};

export type UIKitTopBarProps = {
  activeKey: string;
  items: UIKitTopBarItem[];
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

type NavItemState = PressableStateCallbackType & { hovered?: boolean };

type NavItemProps = {
  label: string;
  current: boolean;
  block?: boolean;
  onPress: () => void;
};

const useNavItemStyles = makeStyles(({ color, radius, spacingValue, text }) => ({
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
    ...text['Corps de texte'].MD.Medium,
    color: color.light.text['mention-grey'],
  },
  labelCurrent: {
    ...text['Corps de texte'].MD.Bold,
    color: color.light.text['title-grey'],
  },
  // Copie invisible du libellé en gras : elle réserve la largeur que prendra l'item
  // une fois courant, sinon toute la barre se décale au changement de page. Repris de
  // UnderlineTabbedInterface, chez Primer.
  labelGhost: {
    ...text['Corps de texte'].MD.Bold,
    height: 0,
    overflow: 'hidden',
  },
}));

/**
 * Item de navigation de la barre : aucun remplissage à l'état courant, qui se signale
 * par le contraste et la graisse seuls. Le fond neutre est réservé au survol.
 */
const NavItem = ({ label, current, block = false, onPress }: NavItemProps) => {
  const styles = useNavItemStyles();

  return (
    <Pressable
      accessibilityRole="link"
      aria-current={current ? 'page' : undefined}
      onPress={onPress}
      style={({ hovered }: NavItemState) => ({
        ...styles.container,
        alignItems: block ? 'flex-start' : 'center',
        ...(hovered ? styles.containerHover : {}),
      })}
    >
      <Typography style={current ? styles.labelCurrent : styles.label}>{label}</Typography>
      <Box aria-hidden>
        <Typography style={styles.labelGhost}>{label}</Typography>
      </Box>
    </Pressable>
  );
};

export const UIKitTopBar = ({ activeKey, items }: UIKitTopBarProps) => {
  const { color, isVariant, spacing } = useTheme();
  const [menuOpen, setMenuOpen] = React.useState(false);

  if (isVariant('mobile')) {
    return (
      <>
        <Header
          logo={<AlveoleLogo />}
          right={
            <Pressable accessibilityRole="button" onPress={() => setMenuOpen(v => !v)} style={{ padding: 8 }}>
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
            {items.map(item => (
              <NavItem
                key={item.key}
                label={item.label}
                current={activeKey === item.key}
                block
                onPress={() => {
                  item.onPress();
                  setMenuOpen(false);
                }}
              />
            ))}
          </Box>
        )}
      </>
    );
  }

  const right = (
    <Box display="flex" flexDirection="row" flexWrap="wrap" gap={8}>
      {items.map(item => (
        <NavItem key={item.key} label={item.label} current={activeKey === item.key} onPress={item.onPress} />
      ))}
    </Box>
  );

  return <Header logo={<AlveoleLogo />} title="Alveole UI Kit" right={right} />;
};
