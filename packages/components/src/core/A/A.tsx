import { focusRingProps } from '@alveole/theme';
import { Href, Link } from 'expo-router';
import { openBrowserAsync } from 'expo-web-browser';
import React, { CSSProperties, createContext, useContext } from 'react';
import { Platform, Pressable, TextStyle } from 'react-native';
import { Box } from '../Box';
import { GridColumnContext } from '../Grid';
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
  /** Cible du lien. "_blank" ouvre un nouvel onglet sur le web ; en natif, une URL externe s'ouvre dans le navigateur intégré. */
  target?: '_self' | '_blank' | '_parent' | '_top';
}>;

export const A = (props: AProps) => {
  const {
    children,
    href,
    direction = 'push',
    style,
    hoverStyle,
    ariaCurrent,
    target,
    canAccessHref: canAccessProp,
  } = props;

  const styles = useStyles();
  // Sur le web, ce Pressable rend le `<a>` lui-meme : il porte donc une couleur de texte, que
  // `ViewStyle` ne connait pas. `TextStyle` l'etend et la decrit.
  const styleDuLien: TextStyle = styles.link;
  const canAccess = useCanAccessHref(canAccessProp);
  const fill = useContext(GridColumnContext) ? styles.fill : undefined;

  // En natif il n'y a pas d'onglet : une URL externe en `_blank` s'ouvre dans le navigateur
  // integre, une route interne garde la navigation de l'app.
  const ouvreNavigateurIntegre = Platform.OS !== 'web' && target === '_blank' && /^https?:\/\//.test(href);

  // react-native-web pose `target` et `rel` sur le `<a>` rendu ; `hrefAttrs` n'est pas type par RN.
  const attributsWeb: Record<string, unknown> = {
    hrefAttrs: target ? { target, rel: target === '_blank' ? 'noopener noreferrer' : undefined } : undefined,
  };

  const contenu = (
    <Box tag="a-pressable" style={{ ...styles.pressable, ...fill, ...style }} hoverStyle={hoverStyle}>
      {children}
    </Box>
  );

  const navigateurIntegre = (
    <Pressable
      accessibilityRole="link"
      aria-current={ariaCurrent}
      style={{ ...styleDuLien, ...fill }}
      onPress={() => openBrowserAsync(href)}
      {...focusRingProps()}
    >
      {contenu}
    </Pressable>
  );

  const expoLink = (
    <Link
      href={href}
      asChild
      replace={direction === 'replace'}
      push={direction === 'push'}
      dismissTo={direction === 'dismiss'}
    >
      <Pressable
        accessibilityRole="link"
        aria-current={ariaCurrent}
        {...attributsWeb}
        style={{ ...styleDuLien, ...fill }}
        {...focusRingProps()}
      >
        {contenu}
      </Pressable>
    </Link>
  );

  if (!canAccess(href)) return <>{children}</>;
  return ouvreNavigateurIntegre ? navigateurIntegre : expoLink;
};
