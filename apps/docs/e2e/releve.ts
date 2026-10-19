import type { Page } from '@playwright/test';
import { openRoute } from './audit';

/**
 * Le relevé d'un exemple d'axe (ADR 0030) : ouvre la fiche et rend, calculées par le
 * navigateur, les propriétés qu'on compare au nœud Figma.
 *
 * Un composant les répartit sur plusieurs nœuds : la racine porte la hauteur, le rayon et la
 * bordure, le premier nœud rembourré les marges intérieures, le premier nœud opaque le fond, et
 * le nœud du libellé la police, la graisse et la couleur du texte.
 */
export const releverExemple = async (page: Page, fiche: string, exemple: string) => {
  await openRoute(page, `/components/${fiche}`);

  return page
    .getByRole('main')
    .getByRole('button', { name: exemple, exact: true })
    .evaluate(racine => {
      const elements = [racine, ...racine.querySelectorAll('*')];
      const style = (element: Element) => window.getComputedStyle(element);
      // Le premier nœud, de la racine vers les feuilles, où la propriété quitte sa valeur neutre.
      const porteur = (propriete: 'padding' | 'backgroundColor', neutre: string) =>
        style(elements.find(element => style(element)[propriete] !== neutre) ?? racine)[propriete];
      const libelle = style(
        elements.find(element => element.childElementCount === 0 && element.textContent?.trim()) ?? racine,
      );
      const cadre = style(racine);

      return {
        hauteur: cadre.height,
        margesInterieures: porteur('padding', '0px'),
        police: { famille: libelle.fontFamily, taille: libelle.fontSize },
        graisse: libelle.fontWeight,
        couleur: {
          texte: libelle.color,
          fond: porteur('backgroundColor', 'rgba(0, 0, 0, 0)'),
        },
        rayon: cadre.borderTopLeftRadius,
        bordure: cadre.borderTop,
      };
    });
};
