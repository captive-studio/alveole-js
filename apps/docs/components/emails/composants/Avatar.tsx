import { Avatar, Column, Row } from '@alveole/email';

const TAILLES = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

export const Exemple = () => (
  <Row>
    {TAILLES.map(size => (
      <Column key={size}>
        <Avatar size={size} src="https://i.pravatar.cc/192?img=5" fallbackText="Camille Martin" />
      </Column>
    ))}
    <Column>
      <Avatar size="xl" carre src="https://i.pravatar.cc/192?img=5" fallbackText="Camille Martin" />
    </Column>
  </Row>
);
