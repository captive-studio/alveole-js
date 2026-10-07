import { Href } from 'expo-router';
import { openBrowserAsync } from 'expo-web-browser';
import { Platform, Text } from 'react-native';

export type CibleDuLien = '_self' | '_blank' | '_parent' | '_top';

/**
 * Comment un lien s'ouvre selon sa cible et la plateforme. Partagé par `A` et `Link`.
 * - `navigateurIntegre` : en natif il n'y a pas d'onglet, une URL externe en `_blank` s'ouvre
 *   dans le navigateur intégré ; une route interne garde la navigation de l'app.
 * - `propsDuPressable` : à étaler sur le `Pressable`/élément qui rend le lien.
 * - `annonce` : texte à placer dans le lien pour signaler le nouvel onglet (web uniquement).
 */
export const ouvertureDuLien = (href: Href & string, target?: CibleDuLien) => {
  const nouvelOnglet = target === '_blank';
  const navigateurIntegre = Platform.OS !== 'web' && nouvelOnglet && /^https?:\/\//.test(href);

  // `undefined` explicite écraserait le `onPress` qu'`expo-router` injecte via `asChild`.
  // Sur le web, `hrefAttrs` (non typé par RN) pose `target` et `rel` sur le `<a>` rendu.
  const propsDuPressable: Record<string, unknown> = navigateurIntegre
    ? { accessibilityHint: 'Ouvre dans le navigateur', onPress: () => openBrowserAsync(href) }
    : { hrefAttrs: target ? { target, rel: nouvelOnglet ? 'noopener noreferrer' : undefined } : undefined };

  const annonce =
    nouvelOnglet && Platform.OS === 'web' ? <TexteMasque>{" (s'ouvre dans un nouvel onglet)"}</TexteMasque> : null;

  return { navigateurIntegre, nouvelOnglet, propsDuPressable, annonce };
};

// Lu par les lecteurs d'écran, invisible à l'écran.
const TexteMasque = ({ children }: { children: string }) => (
  <Text
    style={{
      position: 'absolute',
      width: 1,
      height: 1,
      margin: -1,
      padding: 0,
      overflow: 'hidden',
      borderWidth: 0,
    }}
  >
    {children}
  </Text>
);
