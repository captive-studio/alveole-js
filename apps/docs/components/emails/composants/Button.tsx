import { Button, Column, Row, Section } from '@alveole/email';

const VARIANTES = ['primary', 'secondary', 'tertiary', 'danger'] as const;
const TAILLES = ['sm', 'md', 'lg'] as const;

export const Exemple = () => (
  <>
    {VARIANTES.map(variant => (
      <Row key={variant}>
        {TAILLES.map(size => (
          <Column key={size}>
            <Button variant={variant} size={size} title={`${variant} ${size}`} href="https://exemple.test" />
          </Column>
        ))}
      </Row>
    ))}
    <Section>
      <Button variant="primary" fullWidth title="Pleine largeur" href="https://exemple.test" />
    </Section>
  </>
);
