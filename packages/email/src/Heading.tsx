import { TitreParNiveau, type NiveauDeTitre } from '@alveole/theme';
import { Heading as TitreMail } from '@react-email/components';
import type { ReactNode } from 'react';
import { theme, typo } from './theme';

export type HeadingProps = {
  /** Balise rendue, qui fixe aussi la taille, comme le Heading d'Alveole. */
  as?: NiveauDeTitre;
  children: ReactNode;
};

export const Heading = ({ as = 'h2', children }: HeadingProps) => (
  <TitreMail
    as={as}
    style={{
      ...typo(theme.text.Titres[TitreParNiveau[as]]),
      color: theme.color.light.text['title-grey'],
      margin: `${theme.spacing('1W')}px 0 ${theme.spacing('3W')}px`,
    }}
  >
    {children}
  </TitreMail>
);
