import type { Locator, Page } from '@playwright/test';

// Une date figée, pour les fiches qui affichent « aujourd'hui » (Signature) : sans elle, le
// cliché changerait chaque jour. Figer l'horloge vaut mieux qu'un masque, qui cacherait aussi
// la mise en forme de la date.
export const FROZEN_TIME = new Date('2026-01-15T10:00:00Z');

// Un cliché par fiche, rangé comme sa route : `/components/Button` devient
// `components/Button.png`, lisible tel quel dans la revue d'une PR.
export function snapshotName(route: string): string[] {
  const segments = route.slice(1).split('/');
  const last = segments.pop();

  return [...segments, `${last}.png`];
}

// Les zones qu'aucun réglage ne fige, masquées une à une et fiche par fiche : une tolérance
// globale rendrait toutes les fiches aveugles à une petite régression (ADR 0011). Spinner
// s'anime en CSS, que Playwright fige seul. Lottie dessine en JavaScript dans un <canvas> ;
// Signature et le visionneur PDF en dessinent aussi, mais immobiles : le masque reste donc
// limité à la fiche Lottie.
const ANIMATED_ZONES: Record<string, string[]> = {
  '/components/Lottie': ['canvas'],
};

export function animatedZones(route: string): string[] {
  return ANIMATED_ZONES[route] ?? [];
}

// <main> défile dans un conteneur du gabarit, haut comme la fenêtre : le navigateur n'en peint
// que la partie visible, et la capture s'arrêtait au bas de la fenêtre, laissant blanc tout le
// reste de la fiche. La fenêtre est donc agrandie de ce que ce conteneur cache, sans toucher à
// sa largeur.
export async function revealWhole(page: Page, area: Locator): Promise<void> {
  const viewport = page.viewportSize();
  if (!viewport) return;

  const overflow = await area.evaluate(element => {
    let scroller = element.parentElement;
    while (scroller && !/auto|scroll/.test(getComputedStyle(scroller).overflowY)) scroller = scroller.parentElement;

    return scroller ? scroller.scrollHeight - scroller.clientHeight : 0;
  });
  if (overflow <= 0) return;

  await page.setViewportSize({ width: viewport.width, height: viewport.height + overflow });
}
