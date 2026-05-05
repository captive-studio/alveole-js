import { Href } from 'expo-router';
import React, { CSSProperties } from 'react';
export type CanAccessHref = (href: Href & string) => boolean;
/** Contexte optionnel pour fournir la logique d'accès aux liens (ex. droits métier). Non fourni = tous les liens sont cliquables. */
export declare const LinkAccessContext: React.Context<CanAccessHref | null>;
export type AProps = React.PropsWithChildren<{
  href: Href & string;
  /** default: "push" */
  direction?: 'push' | 'replace' | 'dismiss';
  style?: CSSProperties;
  hoverStyle?: CSSProperties;
  /** Override la logique d'accès (sinon utilise LinkAccessContext si fourni, sinon accès autorisé). */
  canAccessHref?: CanAccessHref;
}>;
export declare const A: (props: AProps) => import('react/jsx-runtime').JSX.Element;
//# sourceMappingURL=A.d.ts.map
