import { Text } from '@react-email/components';
import type { ReactNode } from 'react';
import { theme, typo } from './theme';

const { color, spacing, text } = theme;
const corps = text['Corps de texte'];

const TONS = {
  normal: { ...typo(corps.MD.Regular), color: color.light.text['default-grey'] },
  discret: { ...typo(corps.SM.Regular), color: color.light.text['mention-grey'] },
  fort: { ...typo(corps.MD.Medium), color: color.light.text['default-grey'] },
};

export type TypographyProps = {
  /** `discret` : texte secondaire, plus petit ; `fort` : mis en avant. */
  ton?: keyof typeof TONS;
  textAlign?: 'left' | 'center' | 'right';
  children: ReactNode;
};

export const Typography = ({ ton = 'normal', textAlign, children }: TypographyProps) => (
  <Text style={{ ...TONS[ton], textAlign, margin: `${spacing('1W')}px 0` }}>{children}</Text>
);
