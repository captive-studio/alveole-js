import { Typography, v, when } from '@alveole/email';

export const exemple = { prenom: 'Camille', invite_par: null };

export const Exemple = () => (
  <Typography>
    Bonjour {v('prenom')}, {when('invite_par', <>{v('invite_par')} vous invite.</>, 'vous êtes invité·e.')}
  </Typography>
);
