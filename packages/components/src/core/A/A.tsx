import { focusRingProps } from '@alveole/theme';
import { Href, Link } from 'expo-router';
import React, { CSSProperties, createContext, useContext } from 'react';
import { Pressable, TextStyle } from 'react-native';
import { Box } from '../Box';
import { useStyles } from './A.styles';

export type CanAccessHref = (href: Href & string) => boolean;

/** Contexte optionnel pour fournir la logique d'accès aux liens (ex. droits métier). Non fourni = tous les liens sont cliquables. */
export const LinkAccessContext = createContext<CanAccessHref | null>(null);

/** Règle d'accès effective : celle passée en prop, sinon celle du contexte, sinon tout est accessible. */
export const useCanAccessHref = (canAccessProp?: CanAccessHref): CanAccessHref => {
  const canAccessFromContext = useContext(LinkAccessContext);
  return canAccessProp ?? canAccessFromContext ?? (() => true);
};

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
  // Sur le web, ce Pressable rend le `<a>` lui-meme : il porte donc une couleur de texte, que
  // `ViewStyle` ne connait pas. `TextStyle` l'etend et la decrit.
  const styleDuLien: TextStyle = styles.link;
  const canAccess = useCanAccessHref(canAccessProp);

  const expoLink = (
    <Link
      href={href}
      asChild
      replace={direction === 'replace'}
      push={direction === 'push'}
      dismissTo={direction === 'dismiss'}
    >
      <Pressable accessibilityRole="link" aria-current={ariaCurrent} style={styleDuLien} {...focusRingProps()}>
        <Box tag="a-pressable" style={{ ...styles.pressable, ...style }} hoverStyle={hoverStyle}>
          {children}
        </Box>
      </Pressable>
    </Link>
  );

  return canAccess(href) ? expoLink : <>{children}</>;
};
