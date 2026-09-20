import { useTheme } from '@alveole/theme';
import { usePathname } from 'expo-router';
import React from 'react';
import { A, AProps } from '../../core/A';
import { Box } from '../../core/Box';
import { Typography } from '../../core/Typography';
import { LucideIcon, LucideIconProps } from '../LucideIcon';
import { useStyles } from './Sidebar.styles';

export type SidebarItemNavigable = {
  pressable?: undefined;
  title: string;
  icon?: LucideIconProps['name'];
  href: AProps['href'];
  direction?: AProps['direction'];
  routeName?: string;
};

export type SidebarItemPressable = {
  pressable: true;
  title: string;
  icon?: LucideIconProps['name'];
  onPress: () => void;
};

export type SidebarItemProps = SidebarItemNavigable | SidebarItemPressable;

// Un item mène quelque part ou déclenche quelque chose : dans un cas c'est un lien, dans
// l'autre un bouton. Ce choix ne dépend pas de la mise en page, et les variantes desktop et
// mobile le refaisaient chacune de leur côté, avec le même code.
const SidebarItemEnveloppe = ({
  item,
  isCurrentPage,
  children,
}: React.PropsWithChildren<{ item: SidebarItemProps; isCurrentPage: boolean }>) =>
  item.pressable ? (
    <Box onPress={item.onPress}>{children}</Box>
  ) : (
    // L'état courant se signalait par le fond, la graisse et le filet bleu : trois indices
    // visuels et aucun sémantique. Sans `aria-current`, un lecteur d'écran annonce la page
    // affichée comme un lien de navigation ordinaire.
    <A href={item.href} direction={item.direction} ariaCurrent={isCurrentPage ? 'page' : undefined}>
      {children}
    </A>
  );

const SidebarItemDesktop = (props: SidebarItemProps) => {
  const { title, icon } = props;

  const pathname = usePathname();
  const styles = useStyles();

  const isCurrentPage = !props.pressable && pathname === props.href;

  const itemStyleSelected = isCurrentPage ? styles.sidebarItemSelectedDesktop : {};
  const titleStyleSelected = isCurrentPage ? styles.sidebarItemTitleSelectedDesktop : {};

  const sidebarItemTitleDesktop = isCurrentPage ? styles.sidebarItemTitleCurrentHoverDesktop : {};

  return (
    <SidebarItemEnveloppe item={props} isCurrentPage={isCurrentPage}>
      <Box style={styles.sidebarItemContainerDesktop}>
        {isCurrentPage && (
          <Box tag="sidebar-item-indicator" style={styles.sidebarItemSelectedIndicator}>
            <Box style={styles.sidebarItemSelectedIndicatorContent} />
          </Box>
        )}
        <Box
          tag="sidebar-item"
          style={{ ...styles.sidebarItemDesktop, ...itemStyleSelected }}
          // La ligne courante se survole comme ses voisines : elle est un lien au même titre, et
          // lui réserver une teinte propre n'ajoutait qu'un cas particulier. Son fond de repos
          // étant plus sombre, le survol commun l'éclaircit - la direction que prend Primer.
          hoverStyle={{ ...styles.sidebarItemHover }}
        >
          {/* 16px et non 24 : c'est l'icône qui fixerait la hauteur de la ligne, et une icône de
            24 rendrait l'item à 36px là où la maquette le veut à 32. */}
          {icon && <LucideIcon size="sm" name={icon} />}
          <Typography
            style={{ ...styles.sidebarItemTitleDesktop, ...titleStyleSelected }}
            hoverStyle={{ ...sidebarItemTitleDesktop }}
          >
            {title}
          </Typography>
        </Box>
      </Box>
    </SidebarItemEnveloppe>
  );
};

const SidebarItemMobile = (props: SidebarItemProps) => {
  const { title, icon } = props;

  const pathname = usePathname();
  const styles = useStyles();

  const isCurrentPage = !props.pressable && pathname === props.href;

  const itemStyleSelected = isCurrentPage ? styles.sidebarItemSelectedMobile : {};
  const titleStyleSelected = isCurrentPage ? styles.sidebarItemTitleSelectedMobile : {};

  const sidebarItemTitleMobile = isCurrentPage ? styles.sidebarItemTitleCurrentHoverMobile : {};

  return (
    <SidebarItemEnveloppe item={props} isCurrentPage={isCurrentPage}>
      <Box>
        {isCurrentPage && (
          <Box tag="sidebar-item-indicator" style={styles.sidebarItemSelectedIndicator}>
            <Box style={styles.sidebarItemSelectedIndicatorContent} />
          </Box>
        )}
        <Box
          tag="sidebar-item"
          style={{ ...styles.sidebarItemMobile, ...itemStyleSelected }}
          hoverStyle={{ ...styles.sidebarItemHover }}
        >
          {icon && (
            <LucideIcon
              size="md"
              name={icon}
              color={
                isCurrentPage
                  ? styles.sidebarItemTitleSelectedMobile.color
                  : styles.sidebarItemTitleSelectedMobile.stroke
              }
            />
          )}
          <Typography
            style={{ ...styles.sidebarItemTitleMobile, ...titleStyleSelected }}
            hoverStyle={{ ...sidebarItemTitleMobile }}
          >
            {title}
          </Typography>
        </Box>
      </Box>
    </SidebarItemEnveloppe>
  );
};

export const SidebarItem = (props: SidebarItemProps) => {
  const { isVariant } = useTheme();
  const mobileOrTablet = React.useMemo(() => isVariant('mobile') || isVariant('tablet'), [isVariant]);
  return mobileOrTablet ? <SidebarItemMobile {...props} /> : <SidebarItemDesktop {...props} />;
};
