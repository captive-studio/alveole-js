import { Section } from '@react-email/components';
import type { ReactNode } from 'react';
import { theme } from './theme';

const { color, radius, spacing } = theme;

export type CardProps = {
  /** Une image ou une illustration, sur fond alterne au-dessus du contenu. */
  media?: ReactNode;
  children: ReactNode;
};

export const Card = ({ media, children }: CardProps) => (
  <Section
    style={{
      backgroundColor: color.light.background['default-grey'],
      border: `1px solid ${color.light.border['default-grey']}`,
      borderRadius: radius('lg'),
      overflow: 'hidden',
    }}
  >
    {media && (
      <Section
        className="alv-carte-media"
        style={{ backgroundColor: color.light.background['alt-grey'], padding: spacing('3W'), textAlign: 'center' }}
      >
        {media}
      </Section>
    )}
    <Section className="alv-carte-contenu" style={{ padding: spacing('3W') }}>
      {children}
    </Section>
  </Section>
);
