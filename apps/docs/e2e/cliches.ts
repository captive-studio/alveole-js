import type { Locator, Page } from '@playwright/test';
import { existsSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';

// Une date figée, pour les fiches qui affichent « aujourd'hui » (Signature) : sans elle, le
// cliché changerait chaque jour. Figer l'horloge vaut mieux qu'un masque, qui cacherait aussi
// la mise en forme de la date.
export const FROZEN_TIME = new Date('2026-01-15T10:00:00Z');

// Un cliché rangé comme sa route : `/components/Button` devient `components/Button.png`, et la
// démonstration `Variants` de `/components/Badge` devient `components/Badge/Variants.png`,
// lisibles tels quels dans la revue d'une PR.
export function snapshotName(route: string, exemple?: string): string[] {
  const segments = [...route.slice(1).split('/'), ...(exemple ? [exemple] : [])];
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

// Toute fiche est capturée démonstration par démonstration plutôt qu'en entier : la
// documentation reste hors du cadre (ADR 0036). Font exception les fiches dont une couche
// ouverte déborde de sa démonstration et y serait coupée ; elles gardent leur cliché de fiche
// en attendant d'être traitées au cas par cas.
const OPEN_LAYERS = ['/components/ActionMenu', '/components/Button', '/components/DataTable', '/components/Spinner'];

export function byDemonstration(route: string): boolean {
  return route.startsWith('/components/') && !OPEN_LAYERS.includes(route);
}

// Les pages de texte n'ont pas de cliché : leur image ne prouverait rien que l'audit ne vérifie
// déjà. Les pages du thème qui rendent ses valeurs gardent le leur (ADR 0036).
const TEXT_PAGES = ['/components', '/theme/css-variables'];

export function withoutSnapshot(route: string): boolean {
  return TEXT_PAGES.includes(route);
}

// Le repère que `@alveole/storybook` pose sur chaque démonstration, suivi du nom de l'exemple.
export const DEMONSTRATION_PREFIX = 'demonstration-';

// Les pages restées sans cliché après une régénération : un run interrompu en laisse, et le
// workflow refuse alors de pousser. Une fiche capturée par démonstration a son dossier, qui doit
// contenir au moins une image ; les pages de texte n'en attendent aucune ; les autres ont leur
// image.
function hasSnapshot(chemin: string): boolean {
  if (existsSync(`${chemin}.png`)) return true;

  return existsSync(chemin) && readdirSync(chemin).some(file => file.endsWith('.png'));
}

export function missingSnapshots(routes: string[], dir: string): string[] {
  return routes.filter(route => !withoutSnapshot(route) && !hasSnapshot(resolve(dir, route.slice(1))));
}
