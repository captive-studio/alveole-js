import { linkProps } from '@alveole/theme';
import { Link as ExpoLink } from 'expo-router';
import { AProps, ouvertureDuLien, useCanAccessHref } from '../../core/A';
import { Typography } from '../../core/Typography';
import { LucideIcon } from '../LucideIcon';
import { useStyles } from './Link.styles';

export type LinkProps = Pick<AProps, 'href' | 'target'> & { children: string };

export const Link = ({ href, target, children }: LinkProps) => {
  const styles = useStyles();
  const canAccess = useCanAccessHref();
  const { navigateurIntegre, nouvelOnglet, propsDuPressable, annonce } = ouvertureDuLien(href, target);

  if (!canAccess(href)) return <>{children}</>;

  const lien = (
    <Typography
      tag="a"
      accessibilityRole="link"
      style={styles.link}
      hoverStyle={styles.linkHover}
      {...propsDuPressable}
      {...linkProps()}
    >
      {children}
      {nouvelOnglet && (
        <>
          {' '}
          <LucideIcon name="ExternalLink" size="xs" color={styles.link.color} style={styles.icone} />
        </>
      )}
      {annonce}
    </Typography>
  );

  if (navigateurIntegre) return lien;

  return (
    <ExpoLink href={href} asChild>
      {lien}
    </ExpoLink>
  );
};
