import React from 'react';
import { BoxProps } from '../../core/Box';
import { AvatarProps } from '../Avatar';
import { IconProps } from '../LucideIcon';

/**
 * La navigation va par trois : le geste, son icone et son nom. Les separer laissait passer une
 * fleche muette. Le type les lie donc, et `navigationLabel` devient exigible des qu'il y a un
 * geste : la meme fleche sert a revenir, a replier ou a ouvrir, et seul l'appelant sait
 * laquelle des trois.
 */
export type Navigation =
  | { onNavigate?: undefined; navigationIcon?: undefined; navigationLabel?: undefined }
  | { onNavigate: () => void; navigationIcon?: IconProps['name']; navigationLabel: string };

/**
 * Les trois variantes alignent la navigation et le titre sur une ligne. `large` et
 * `compactLarge` grossissent le titre ; `compactLarge` ajoute des retraits autour du contenu.
 */
export type ToolbarTopVariant = 'default' | 'large' | 'compactLarge';

export type ToolbarTopProps = BoxProps &
  Navigation & {
    variant?: ToolbarTopVariant;
    title: string;
    AvatarProps?: Omit<AvatarProps, 'size'>;
    withBorder?: boolean;
    sousTitre?: string;
    actions?: React.ReactNode;
    typographyStyle?: React.CSSProperties;
  };

/** Ce qui identifie le dossier courant : l'avatar, le titre et son sous-titre. */
export type InformationDeLaBarre = Pick<ToolbarTopProps, 'title' | 'sousTitre' | 'AvatarProps' | 'typographyStyle'> & {
  grandTitre: boolean;
  compact: boolean;
};
