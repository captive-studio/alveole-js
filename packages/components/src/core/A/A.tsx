import { focusRingProps } from '@alveole/theme';
import { Href, Link } from 'expo-router';
import React, { CSSProperties, createContext, useContext } from 'react';
import { Pressable } from 'react-native';
import { Box } from '../Box';
import { useStyles } from './A.styles';

export type CanAccessHref = (href: Href & string) => boolean;

/** Contexte optionnel pour fournir la logique d'accès aux liens (ex. droits métier). Non fourni = tous les liens sont cliquables. */
export const LinkAccessContext = createContext<CanAccessHref | null>(null);

export type AProps = React.PropsWithChildren<{
  href: Href & string;
  /** default: "push" */
  direction?: 'push' | 'replace' | 'dismiss';
  style?: CSSProperties;
  hoverStyle?: CSSProperties;
  /** Override la logique d'accès (sinon utilise LinkAccessContext si fourni, sinon accès autorisé). */
  canAccessHref?: CanAccessHref;
  /** Marque le lien comme représentant l'emplacement courant. "page" pour la page affichée. */
  ariaCurrent?: 'page' | 'step' | 'location' | 'date' | 'time';
}>;

export const A = (props: AProps) => {
  const { children, href, direction = 'push', style, hoverStyle, ariaCurrent, canAccessHref: canAccessProp } = props;

  const styles = useStyles();
  const canAccessFromContext = useContext(LinkAccessContext);
  const canAccess = canAccessProp ?? canAccessFromContext ?? (() => true);

  const expoLink = (
    <Link
      href={href}
      asChild
      replace={direction === 'replace'}
      push={direction === 'push'}
      dismissTo={direction === 'dismiss'}
    >
      <Pressable accessibilityRole="link" aria-current={ariaCurrent} style={styles.link as any} {...focusRingProps()}>
        <Box tag="a-pressable" style={{ ...styles.pressable, ...style }} hoverStyle={hoverStyle}>
          {children}
        </Box>
      </Pressable>
    </Link>
  );

  return canAccess(href) ? expoLink : <>{children}</>;
};
