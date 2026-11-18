import { theme } from './theme';

const { spacing } = theme;

/**
 * La seule regle hors inline : l'ecran etroit, qu'un style inline ne peut pas porter. Elle cible
 * les classes `al-*` que posent les composants, et l'emporte sur l'inline par `!important`.
 */
export const stylesDesMedias = `@media (max-width: 600px) {
  .al-conteneur { padding: ${spacing('3W')}px ${spacing('1W')}px !important; }
  .al-carte-contenu, .al-carte-media { padding: ${spacing('2W')}px !important; }
}`;
