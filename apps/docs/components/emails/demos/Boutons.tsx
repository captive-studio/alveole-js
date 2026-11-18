import { Button, Column, EmailLayout, Heading, Row, Section, Typography } from '@alveole/email';

export const exemple = {};

const VARIANTES = ['primary', 'secondary', 'tertiary', 'danger'] as const;
const TAILLES = ['sm', 'md', 'lg'] as const;

export const Boutons = () => (
  <EmailLayout preview="Le bouton dans toutes ses variantes et tailles">
    <Heading as="h1">Boutons</Heading>
    {VARIANTES.map(variant => (
      <Section key={variant}>
        <Typography ton="fort">{variant}</Typography>
        <Row>
          {TAILLES.map(size => (
            <Column key={size}>
              <Button variant={variant} size={size} title={size} href="https://exemple.test" />
            </Column>
          ))}
        </Row>
      </Section>
    ))}
    <Typography ton="fort">fullWidth</Typography>
    <Button variant="primary" fullWidth title="Pleine largeur" href="https://exemple.test" />
  </EmailLayout>
);
