import type { Locator, Page } from '@playwright/test';

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

/**
 * Ce que vaut, calculée, une valeur du thème posée sur une propriété CSS : la variable se résout
 * sur une sonde, comme pour `tailleDeTexte`. Une variable que le thème ne définit pas lève une
 * erreur : sonde et élément mesuré retomberaient sur la même valeur par défaut.
 */
export const valeurCalculee = (
  page: Page,
  propriete:
    'color' | 'backgroundColor' | 'borderTop' | 'borderTopLeftRadius' | 'fontFamily' | 'fontSize' | 'fontWeight',
  valeur: string,
) =>
  page.evaluate(
    ([nom, css]) => {
      const racine = window.getComputedStyle(document.documentElement);
      const inconnue = [...css.matchAll(/var\((--[\w-]+)\)/g)]
        .map(([, variable]) => variable)
        .find(variable => !racine.getPropertyValue(variable));

      if (inconnue) throw new Error(`variable du thème inconnue : ${inconnue}`);

      const sonde = document.createElement('div');
      sonde.style[nom] = css;
      document.body.appendChild(sonde);
      const calculee = window.getComputedStyle(sonde)[nom];
      sonde.remove();

      return calculee;
    },
    [propriete, valeur] as const,
  );

/**
 * La hauteur d'un lien et la hauteur de ligne de son libellé : un lien qui garde la boîte de
 * ligne de la police héritée dépasse son libellé et le décale.
 */
export const hauteurEtLigneDuLibelle = async (lien: Locator) => ({
  hauteur: `${(await lien.boundingBox())?.height}px`,
  ligne: await lien.locator('typography').evaluate(libelle => window.getComputedStyle(libelle).lineHeight),
});
