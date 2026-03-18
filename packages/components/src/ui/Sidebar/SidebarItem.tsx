import { useTheme } from '@alveole/theme';
import { useRoute } from '@react-navigation/native';
import React from 'react';
import { A, AProps, Box, Typography } from '../../core';
import { LucideIcon, LucideIconProps } from '../LucideIcon';
import { useStyles } from './Sidebar.styles';

export type SidebarItemNavigable = {
  pressable?: undefined;
  title: string;
  icon?: LucideIconProps['name'];
  href: AProps['href'];
  direction?: AProps['direction'];
  routeName: string;
};

export type SidebarItemPressable = {
  pressable: true;
  title: string;
  icon?: LucideIconProps['name'];
  onPress: () => void;
};

export type SidebarItemProps = SidebarItemNavigable | SidebarItemPressable;

const SidebarItemDesktop = (props: SidebarItemProps) => {
  const { title, icon } = props;

  const route = useRoute();
  const styles = useStyles();

  const currentRouteName = route.name;
  const isCurrentPage = !props.pressable && currentRouteName === props.routeName;

  const itemStyleSelected = isCurrentPage ? styles.sidebarItemSelectedDesktop : {};
  const titleStyleSelected = isCurrentPage ? styles.sidebarItemTitleSelectedDesktop : {};

  const sidebarItemHover = isCurrentPage ? styles.sidebarItemCurrentHover : styles.sidebarItemHover;
  const sidebarItemTitleDesktop = isCurrentPage ? styles.sidebarItemTitleCurrentHoverDesktop : {};

  const renderItem = (content: React.ReactNode) => {
    if (props.pressable) return <Box onPress={props.onPress}>{content}</Box>;
    else
      return (
        <A href={props.href} direction={props.direction}>
          {content}
        </A>
      );
  };

  return renderItem(
    <Box style={styles.sidebarItemContainerDesktop}>
      {isCurrentPage && (
        <Box tag="sidebar-item-indicator" style={styles.sidebarItemSelectedIndicator}>
          <Box style={styles.sidebarItemSelectedIndicatorContent} />
        </Box>
      )}
      <Box
        tag="sidebar-item"
        style={{ ...styles.sidebarItemDesktop, ...itemStyleSelected }}
        hoverStyle={{ ...sidebarItemHover }}
      >
        {icon && <LucideIcon size="md" name={icon} />}
        <Typography
          style={{ ...styles.sidebarItemTitleDesktop, ...titleStyleSelected }}
          hoverStyle={{ ...sidebarItemTitleDesktop }}
        >
          {title}
        </Typography>
      </Box>
    </Box>,
  );
};

const SidebarItemMobile = (props: SidebarItemProps) => {
  const { title, icon } = props;

  const route = useRoute();
  const styles = useStyles();

  const currentRouteName = route.name;
  const isCurrentPage = !props.pressable && currentRouteName === props.routeName;

  const itemStyleSelected = isCurrentPage ? styles.sidebarItemSelectedMobile : {};
  const titleStyleSelected = isCurrentPage ? styles.sidebarItemTitleSelectedMobile : {};

  const sidebarItemHover = isCurrentPage ? styles.sidebarItemCurrentHover : styles.sidebarItemHover;
  const sidebarItemTitleMobile = isCurrentPage ? styles.sidebarItemTitleCurrentHoverMobile : {};

  const renderItem = (content: React.ReactNode) => {
    if (props.pressable) return <Box onPress={props.onPress}>{content}</Box>;
    else
      return (
        <A href={props.href} direction={props.direction}>
          {content}
        </A>
      );
  };

  return renderItem(
    <Box>
      {isCurrentPage && (
        <Box tag="sidebar-item-indicator" style={styles.sidebarItemSelectedIndicator}>
          <Box style={styles.sidebarItemSelectedIndicatorContent} />
        </Box>
      )}
      <Box
        tag="sidebar-item"
        style={{ ...styles.sidebarItemMobile, ...itemStyleSelected }}
        hoverStyle={{ ...sidebarItemHover }}
      >
        {icon && (
          <LucideIcon
            size="md"
            name={icon}
            color={isCurrentPage ? styles.sidebarItemIconSelectedMobile.color : undefined}
          />
        )}
        <Typography
          style={{ ...styles.sidebarItemTitleMobile, ...titleStyleSelected }}
          hoverStyle={{ ...sidebarItemTitleMobile }}
        >
          {title}
        </Typography>
      </Box>
    </Box>,
  );
};

export const SidebarItem = (props: SidebarItemProps) => {
  const { isVariant } = useTheme();
  const mobileOrTablet = React.useMemo(() => isVariant('mobile') || isVariant('tablet'), [isVariant]);
  return mobileOrTablet ? <SidebarItemMobile {...props} /> : <SidebarItemDesktop {...props} />;
};
