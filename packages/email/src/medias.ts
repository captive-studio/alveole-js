import { Colors } from '@alveole/theme';
import { theme } from './theme';

const { spacing } = theme;
// Alveole n'a pas de palette sombre (`dark` est depreciee et claire) : le mode sombre puise dans
// les echelles, a valider avec le design.
const { BleuCaptive, Neutre } = Colors;

/**
 * Les seules regles hors inline : celles qu'un style inline ne peut pas porter, le mode sombre
 * et l'ecran etroit. Elles ciblent les classes `al-*` que posent les composants, et l'emportent
 * sur l'inline par `!important`. Un client qui les ignore garde le rendu clair, toujours lisible.
 */
export const stylesDesMedias = `@media (max-width: 600px) {
  .al-conteneur { padding: ${spacing('3W')}px ${spacing('1W')}px !important; }
  .al-carte-contenu, .al-carte-media { padding: ${spacing('2W')}px !important; }
}
@media (prefers-color-scheme: dark) {
  .al-corps, .al-conteneur { background-color: ${Neutre['50']} !important; }
  .al-carte { background-color: ${Neutre['100']} !important; border-color: ${Neutre['175']} !important; }
  .al-carte-media { background-color: ${Neutre['75']} !important; }
  .al-titre, .al-texte { color: ${Neutre['950']} !important; }
  .al-btn-primary { background-color: ${BleuCaptive['850']} !important; border-color: ${BleuCaptive['850']} !important; color: ${BleuCaptive['125']} !important; }
  .al-btn-secondary, .al-btn-tertiary { color: ${Neutre['950']} !important; }
  .al-btn-secondary { background-color: ${Neutre['125']} !important; }
  .al-lien { color: ${BleuCaptive['850']} !important; }
  .al-separateur { border-color: ${Neutre['175']} !important; }
}`;
