import { Typography } from '@alveole/components';
import { useTheme } from '@alveole/theme';
import { CSSProperties } from 'react';
import { AvatarImageProps, Avatar as TamaguiAvatar } from 'tamagui';
import { useStyles } from '././Avatar.styles';

export type AvatarProps = {
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  fallbackText?: string;
  style?: CSSProperties;
  src?: AvatarImageProps['src'];
};

const getInitials = (name: string) => {
  const words = name.trim().split(/\s+/);
  if (words.length === 0) return '';
  if (words.length === 1) return words[0][0]?.toUpperCase() ?? '';
  return (words[0][0] + words[1][0]).toUpperCase();
};

export const Avatar = (props: AvatarProps) => {
  const { style, fallbackText, src, size, ...avatarProps } = props;

  const initials = getInitials(fallbackText ?? '');

  const { spacing } = useTheme();
  const styles = useStyles();

  const avatarSize: Record<typeof size, number> = {
    xs: 20,
    sm: spacing('3W'),
    md: spacing('4W'),
    lg: spacing('5W'),
    xl: spacing('8W'),
  };

  return (
    <TamaguiAvatar style={{ ...styles.avatar, ...style }} circular size={avatarSize[size]} {...avatarProps}>
      <TamaguiAvatar.Image src={src} />
      <Typography style={styles.fallbackText}>{initials}</Typography>
    </TamaguiAvatar>
  );
};
