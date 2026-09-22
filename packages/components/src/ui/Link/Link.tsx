import { linkProps } from '@alveole/theme';
import { Link as ExpoLink } from 'expo-router';
import { AProps, useCanAccessHref } from '../../core/A';
import { Typography } from '../../core/Typography';
import { useStyles } from './Link.styles';

export type LinkProps = Pick<AProps, 'href'> & { children: string };

export const Link = ({ href, children }: LinkProps) => {
  const styles = useStyles();
  const canAccess = useCanAccessHref();

  if (!canAccess(href)) return <>{children}</>;

  return (
    <ExpoLink href={href} asChild>
      <Typography tag="a" style={styles.link} hoverStyle={styles.linkHover} {...linkProps()}>
        {children}
      </Typography>
    </ExpoLink>
  );
};
