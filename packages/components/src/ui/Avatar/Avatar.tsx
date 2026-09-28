import { useTheme } from '@alveole/theme';
import { CSSProperties } from 'react';
import { AvatarImageProps, Avatar as TamaguiAvatar } from 'tamagui';
import { Typography } from '../../core/Typography';
import { useStyles } from './Avatar.styles';

export type AvatarProps = {
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  fallbackText?: string;
  style?: CSSProperties;
  src?: AvatarImageProps['src'];
  carre?: boolean;
};

const getInitials = (name: string) => {
  const words = name.trim().split(/\s+/);
  if (words.length === 0) return '';
  if (words.length === 1) return words[0][0]?.toUpperCase() ?? '';
  return (words[0][0] + words[1][0]).toUpperCase();
};

export const Avatar = (props: AvatarProps) => {
  const { style, fallbackText, src, size, carre, ...avatarProps } = props;

  const initials = getInitials(fallbackText ?? '');

  const { spacingValue } = useTheme();
  const styles = useStyles();

  const avatarSize: Record<typeof size, number> = {
    xs: 20,
    sm: spacingValue('3W'),
    md: spacingValue('4W'),
    lg: spacingValue('5W'),
    xl: spacingValue('8W'),
  };

  // Pas de prop `size` : Tamagui y lit une valeur qui est aussi une clé de jeton de taille
  // ($0 à $20) comme ce jeton. `xs` (20) donnait $20, soit 284 px, et la photo débordait du
  // cercle. Largeur et hauteur en pixels n'ont pas cette ambiguïté.
  const px = avatarSize[size];

  return (
    <TamaguiAvatar
      style={{
        width: px,
        height: px,
        minWidth: px,
        maxWidth: px,
        minHeight: px,
        maxHeight: px,
        ...(carre ? styles.carre : {}),
        ...style,
      }}
      circular={!carre}
      {...avatarProps}
    >
      <TamaguiAvatar.Image src={src} width={px} height={px} />
      <TamaguiAvatar.Fallback style={styles.fallback}>
        <Typography style={styles.fallbackText}>{initials}</Typography>
      </TamaguiAvatar.Fallback>
    </TamaguiAvatar>
  );
};
