import type { Locator } from '@playwright/test';

/**
 * Les mesures de mise en page des écrans du catalogue, prises dans le navigateur : jsdom n'a
 * pas de moteur de rendu, et une marge, une bordure ou une taille de texte n'y valaient que
 * ce que le style déclaré disait (ADR 0027).
 */

/** Ce qui sépare deux éléments : le style calculé de leur premier ancêtre commun. */
export const separationEntre = async (premier: Locator, second: Locator) =>
  premier.evaluate(
    (element, autre) => {
      for (let courant = element.parentElement; courant; courant = courant.parentElement) {
        if (courant.contains(autre)) {
          const { gap, flexDirection } = window.getComputedStyle(courant);
          return { gap, flexDirection };
        }
      }

      throw new Error('aucun ancêtre commun');
    },
    await second.elementHandle(),
  );

/** Le nombre de cadres (ancêtres bordés) autour d'un élément. */
export const cadresAutourDe = (element: Locator) =>
  element.evaluate(noeud => {
    let cadres = 0;

    for (let courant = noeud.parentElement; courant; courant = courant.parentElement) {
      if (parseFloat(window.getComputedStyle(courant).borderTopWidth) > 0) cadres += 1;
    }

    return cadres;
  });

/**
 * La taille de texte d'un élément, et celle que vaut une variable de typographie du thème. La
 * variable se résout sur une sonde plutôt que par lecture de sa valeur brute, qui peut être
 * exprimée dans une autre unité que le pixel calculé.
 */
export const tailleDeTexte = (element: Locator, variable: string) =>
  element.evaluate((noeud, nom) => {
    const sonde = document.createElement('span');
    sonde.style.fontSize = `var(${nom})`;
    document.body.appendChild(sonde);
    const attendue = window.getComputedStyle(sonde).fontSize;
    sonde.remove();

    return { rendue: window.getComputedStyle(noeud).fontSize, attendue };
  }, variable);

/** Le haut et le bas d'un élément à l'écran. */
export const bords = async (element: Locator) => {
  const boite = await element.boundingBox();

  if (!boite) throw new Error('élément hors du rendu');

  return { haut: boite.y, bas: boite.y + boite.height };
};
