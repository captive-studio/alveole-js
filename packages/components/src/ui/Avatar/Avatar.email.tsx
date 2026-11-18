import { themeBrut } from '@alveole/theme';
import { tailleAvatar, type AvatarProps } from './Avatar';

const TAILLES = tailleAvatar(themeBrut().spacingValue);

/** Variante mail d'Avatar : une image aux tailles d'Avatar, ronde sauf `carre`. */
export const Avatar = ({
  size,
  src,
  fallbackText = '',
  carre = false,
}: Pick<AvatarProps, 'size' | 'fallbackText' | 'carre'> & { src: string }) => (
  <img
    className={carre ? 'avatar' : 'avatar avatar-rond'}
    src={src}
    alt={fallbackText}
    width={TAILLES[size]}
    height={TAILLES[size]}
  />
);
