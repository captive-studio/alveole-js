import { Column, Row, Section, Typography } from '@alveole/email';

export const Exemple = () => (
  <Section>
    <Row>
      <Column align="center">
        <Typography>Première colonne</Typography>
      </Column>
      <Column align="center">
        <Typography>Seconde colonne</Typography>
      </Column>
    </Row>
  </Section>
);
