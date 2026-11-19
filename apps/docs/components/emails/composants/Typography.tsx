import { Typography } from '@alveole/email';

export const Exemple = () => (
  <>
    <Typography>Texte normal, le corps du mail.</Typography>
    <Typography ton="fort">Texte fort, mis en avant.</Typography>
    <Typography ton="discret">Texte discret, secondaire.</Typography>
    <Typography textAlign="center">Texte centré.</Typography>
  </>
);
