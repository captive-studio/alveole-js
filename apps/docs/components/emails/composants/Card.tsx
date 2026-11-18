import { Card, Typography } from '@alveole/email';

export const Exemple = () => (
  <Card media={<img src="https://picsum.photos/seed/alveole/480/300" width={240} alt="" />}>
    <Typography ton="fort">Une carte</Typography>
    <Typography>Son média, facultatif, s’affiche au-dessus du contenu, sur fond alterné.</Typography>
  </Card>
);
