import { Link } from '@react-email/components';
import type { ReactNode } from 'react';
import { theme } from './theme';

/** Un lien dans le texte : il prend la typographie de son paragraphe. */
export const A = ({ href, children }: { href: string; children: ReactNode }) => (
  <Link href={href} style={{ color: theme.color.light.text['action-high-primary'], textDecoration: 'underline' }}>
    {children}
  </Link>
);
