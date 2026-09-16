import React from 'react';
import { BoxProps } from '../../core/Box';
import { AvatarProps } from '../Avatar';
import { IconProps } from '../LucideIcon';
import { RadioInputProps } from '../RadioGroup';

/** Le choix que porte la ligne : un bouton radio, ou une case a cocher si `multiple`. */
export type ChoixDeLaLigne = Pick<RadioInputProps, 'checked' | 'onChange' | 'value'> & { multiple?: boolean };

export type ListItemProps = BoxProps & {
  title: string;
  description?: string;
  IconProps?: Pick<IconProps, 'color' | 'name'>;
  AvatarProps?: Pick<AvatarProps, 'fallbackText' | 'src'>;
  RadioProps?: ChoixDeLaLigne;
  preview_url?: string;
  trailing?: () => React.ReactNode;
  loading?: boolean;
  showSeparateur?: boolean;
};

/**
 * Ce qui precede le titre : soit une vignette, soit la rangee choix / icone / avatar. Les deux
 * sont exclusifs, et `ListItemVisuel` est seul a trancher entre eux.
 */
export type VisuelDeLaLigne = Pick<ListItemProps, 'title' | 'preview_url' | 'IconProps' | 'AvatarProps'> & {
  RadioProps?: ChoixDeLaLigne;
};
