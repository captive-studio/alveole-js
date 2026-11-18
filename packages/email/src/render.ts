import type { ReactElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

const ERB: [RegExp, string][] = [
  [/\{\{v:(\w+)\}\}/g, '<%= @$1 %>'],
  [/\{\{if:(\w+)\}\}/g, '<% if @$1 %>'],
  [/\{\{else\}\}/g, '<% else %>'],
  [/\{\{end\}\}/g, '<% end %>'],
];

const toErb = (markup: string) => ERB.reduce((out, [marker, erb]) => out.replace(marker, erb), markup);

const STRUCTURE = /(<\/?(?:html|head|body|div|table|tbody|tr|td)\b[^>]*>)/;
const BLOC = /<(?:p|h\d|div|table)\b/;

/**
 * Indente la structure (tables, cellules) pour que l'.erb se relise en revue, sans toucher au
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
    .replace(/\{\{if:\w+\}\}\s*\{\{else\}\}\s*\{\{end\}\}/g, '')
    .replace(/&[#\w]+;/g, entity => ENTITIES[entity] ?? entity)
    .replace(/\n{3,}/g, '\n\n')
    .trim();

// React 19 ajoute un <link rel="preload"> par image : inutile dans un mail.
const markup = (element: ReactElement) => renderToStaticMarkup(element).replace(/<link rel="preload"[^>]*>/g, '');

const doctype = (html: string) => (html.startsWith('<html') ? `<!DOCTYPE html>\n${html}` : html);

/** Le HTML du mail, styles inline, avec ses variables et conditions en ERB. */
export const renderEmail = (element: ReactElement) => doctype(toErb(indente(markup(element))));

/** La version texte du meme mail. */
export const renderEmailText = (element: ReactElement) => `${toErb(plainText(markup(element)))}\n`;

type Exemple = Record<string, string | null>;

const echappe = (value: string) =>
  value.replace(/[&<>"]/g, c => `&${{ '&': 'amp', '<': 'lt', '>': 'gt', '"': 'quot' }[c]};`);

/** Le mail rempli avec des donnees d'exemple, conditions resolues : pour le previsualiser sans Rails. */
export const renderSample = (mail: ReactElement, exemple: Exemple) =>
  doctype(
    markup(mail)
      .replace(/\{\{if:(\w+)\}\}([\s\S]*?)\{\{else\}\}([\s\S]*?)\{\{end\}\}/g, (...[, nom, oui, non]: string[]) =>
        exemple[nom] ? oui : non,
      )
      .replace(/\{\{v:(\w+)\}\}/g, (_: string, nom: string) => echappe(exemple[nom] ?? '')),
  );
