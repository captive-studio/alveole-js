import { TaillesAvatar, type TailleAvatar } from '@alveole/theme';
import { Img } from '@react-email/components';
import { theme } from './theme';

export type AvatarProps = {
  size: TailleAvatar;
  src: string;
  /** Le nom de la personne ; sinon l'image est decorative. */
  fallbackText?: string;
  carre?: boolean;
};

/** Une image aux tailles d'Avatar, ronde sauf `carre`. Sans repli : un mail n'a pas d'initiales. */
export const Avatar = ({ size, src, fallbackText = '', carre = false }: AvatarProps) => (
  <Img
    src={src}
    alt={fallbackText}
    width={TaillesAvatar[size]}
    height={TaillesAvatar[size]}
    style={{ borderRadius: carre ? theme.radius('md') : '50%' }}
  />
);
