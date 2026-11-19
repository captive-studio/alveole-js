import type { ReactElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

const STRUCTURE = /(<\/?(?:html|head|body|div|table|tbody|tr|td)\b[^>]*>)/;
const BLOC = /<(?:p|h\d|div|table)\b/;

/**
 * Indente la structure (tables, cellules) pour que le HTML genere se relise en revue, sans toucher au
 * texte : un paragraphe reste sur une ligne, et une cellule sans bloc (image, texte court) reste
 * collée à son contenu, faute de quoi certains clients laissent un écart sous une image.
 */
const indente = (html: string) => {
  const morceaux = html.split(STRUCTURE).filter(Boolean);
  const lignes: string[] = [];
  let profondeur = 0;
  for (let i = 0; i < morceaux.length; i++) {
    const morceau = morceaux[i];
    const marge = '  '.repeat(profondeur);
    if (!STRUCTURE.test(morceau)) {
      lignes.push(marge + morceau);
    } else if (morceau.startsWith('</')) {
      profondeur--;
      lignes.push('  '.repeat(profondeur) + morceau);
    } else if (morceaux[i + 2]?.startsWith('</') && !STRUCTURE.test(morceaux[i + 1]) && !BLOC.test(morceaux[i + 1])) {
      lignes.push(marge + morceau + morceaux[i + 1] + morceaux[i + 2]);
      i += 2;
    } else {
      lignes.push(marge + morceau);
      profondeur++;
    }
  }
  return lignes.join('\n');
};

const ENTITIES: Record<string, string> = { '&amp;': '&', '&quot;': '"', '&#x27;': "'", '&lt;': '<', '&gt;': '>' };

/** La version texte, tirée du même rendu que le HTML : un lien garde son adresse, un bloc devient un paragraphe. */
const plainText = (html: string) =>
  html
    // L'en-tete (polices) et l'apercu, que react-email marque a sauter, n'ont pas de version texte.
    .replace(/<head>[\s\S]*?<\/head>/, '')
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<div [^>]*data-skip-in-text="true"[^>]*>[\s\S]*?<\/div>/g, '')
    .replace(/<a [^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/g, (_, href, label) => `${label} : ${href}`)
    .replace(/<\/(p|h\d|td)>/g, '\n\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&[#\w]+;/g, entity => ENTITIES[entity] ?? entity)
    .replace(/\n{3,}/g, '\n\n')
    .trim();

// React 19 ajoute un <link rel="preload"> par image : inutile dans un mail.
const markup = (element: ReactElement) => renderToStaticMarkup(element).replace(/<link rel="preload"[^>]*>/g, '');

const doctype = (html: string) => (html.startsWith('<html') ? `<!DOCTYPE html>\n${html}` : html);

/** Le HTML du mail, styles inline, indente pour se relire. */
export const renderEmail = (element: ReactElement) => doctype(indente(markup(element)));

/** La version texte du meme mail : un lien garde son adresse, un bloc devient un paragraphe. */
export const renderEmailText = (element: ReactElement) => `${plainText(markup(element))}\n`;
