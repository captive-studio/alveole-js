import type { ReactElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

const ERB: [RegExp, string][] = [
  [/\{\{v:(\w+)\}\}/g, '<%= @$1 %>'],
  [/\{\{if:(\w+)\}\}/g, '<% if @$1 %>'],
  [/\{\{else\}\}/g, '<% else %>'],
  [/\{\{end\}\}/g, '<% end %>'],
  [/\{\{yield\}\}/g, '<%= yield %>'],
  [/\{\{yield:(\w+)\}\}/g, '<%= yield :$1 %>'],
  [/\{\{preview\}\}/g, '<% content_for :preview do %>'],
  [/\{\{\/preview\}\}/g, '<% end %>'],
  [/\{\{stylesheet\}\}/g, '<%= stylesheet_link_tag "email", media: "all" %>'],
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
    .replace(/\{\{preview\}\}[\s\S]*?\{\{\/preview\}\}/g, '')
    .replace(/<a [^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/g, (_, href, label) => `${label} : ${href}`)
    .replace(/<\/(p|h\d|td)>/g, '\n\n')
    .replace(/<[^>]+>/g, '')
    .replace(/\{\{if:\w+\}\}\s*\{\{else\}\}\s*\{\{end\}\}/g, '')
    .replace(/&[#\w]+;/g, entity => ENTITIES[entity] ?? entity)
    .replace(/\n{3,}/g, '\n\n')
    .trim();

// React 19 ajoute un <link rel="preload"> par image : inutile dans un mail.
const markup = (element: ReactElement) => renderToStaticMarkup(element).replace(/<link rel="preload"[^>]*>/g, '');

export const renderEmail = (element: ReactElement) => toErb(indente(markup(element)));

export const renderEmailText = (element: ReactElement) => `${toErb(plainText(markup(element)))}\n`;

type Exemple = Record<string, string | null>;

const echappe = (value: string) =>
  value.replace(/[&<>"]/g, c => `&${{ '&': 'amp', '<': 'lt', '>': 'gt', '"': 'quot' }[c]};`);

/** Le mail tel que Rails l'enverrait, rempli avec des données d'exemple : pour emails:dev, sans Rails. */
export const renderSample = ({
  layout,
  mail,
  exemple,
  css,
}: {
  layout: ReactElement;
  mail: ReactElement;
  exemple: Exemple;
  css: string;
}) => {
  let preview = '';
  const rempli = (html: string) =>
    html
      .replace(/\{\{if:(\w+)\}\}([\s\S]*?)\{\{else\}\}([\s\S]*?)\{\{end\}\}/g, (...[, nom, oui, non]: string[]) =>
        exemple[nom] ? oui : non,
      )
      .replace(/\{\{v:(\w+)\}\}/g, (_, nom) => echappe(exemple[nom] ?? ''));
  const corps = rempli(markup(mail)).replace(/\{\{preview\}\}([\s\S]*?)\{\{\/preview\}\}/, (_, texte) => {
    preview = texte;
    return '';
  });
  return `<!DOCTYPE html>\n${rempli(markup(layout))
    .replace('{{stylesheet}}', `<style>${css}</style>`)
    .replace('{{yield:preview}}', preview)
    .replace('{{yield}}', corps)}`;
};
