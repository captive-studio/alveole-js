import { Link } from 'expo-router';
import { createContext, useContext } from 'react';
import { Pressable } from 'react-native';
import { Fragment as _Fragment, jsx as _jsx } from 'react/jsx-runtime';
import { Box } from '../Box';
import { useStyles } from './A.styles';
/** Contexte optionnel pour fournir la logique d'accès aux liens (ex. droits métier). Non fourni = tous les liens sont cliquables. */
export const LinkAccessContext = createContext(null);
export const A = props => {
  const { children, href, direction = 'push', style, hoverStyle, canAccessHref: canAccessProp } = props;
  const styles = useStyles();
  const canAccessFromContext = useContext(LinkAccessContext);
  const canAccess = canAccessProp ?? canAccessFromContext ?? (() => true);
  const expoLink = _jsx(Link, {
    href: href,
    asChild: true,
    replace: direction === 'replace',
    push: direction === 'push',
    dismissTo: direction === 'dismiss',
    children: _jsx(Pressable, {
      children: _jsx(Box, {
        tag: 'a-pressable',
        style: { ...styles.pressable, ...style },
        hoverStyle: hoverStyle,
        children: children,
      }),
    }),
  });
  return canAccess(href) ? expoLink : _jsx(_Fragment, { children: children });
};
