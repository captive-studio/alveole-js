import { renderEmail, renderEmailText } from '@alveole/email';
import type { ReactElement, ReactNode } from 'react';

// React echapperait de l'ERB ecrit dans un composant : on pose des marqueurs, convertis apres rendu.

/** Une variable fournie par le mailer Rails : v('nom') devient <%= @nom %>. */
export const v = (nom: string) => `{{v:${nom}}}`;

/** La seule logique permise dans un mail : when('nom', a, b) devient <% if @nom %>a<% else %>b<% end %>. */
export const when = (nom: string, alors: ReactNode, sinon: ReactNode = null) => (
  <>
    {`{{if:${nom}}}`}
    {alors}
    {'{{else}}'}
    {sinon}
    {'{{end}}'}
  </>
);

const ERB: [RegExp, string][] = [
  [/\{\{v:(\w+)\}\}/g, '<%= @$1 %>'],
  [/\{\{if:(\w+)\}\}/g, '<% if @$1 %>'],
  [/\{\{else\}\}/g, '<% else %>'],
  [/\{\{end\}\}/g, '<% end %>'],
];

/** Convertit les marqueurs de v() et when() en ERB. */
export const versErb = (sortie: string) =>
  ERB.reduce((erb, [marqueur, remplacement]) => erb.replace(marqueur, remplacement), sortie);

/** La vue `.html.erb` d'un mail. */
export const renderErb = (mail: ReactElement) => versErb(renderEmail(mail));

/** La vue `.text.erb` d'un mail : une condition sans texte d'un cote ni de l'autre disparait. */
export const renderErbText = (mail: ReactElement) =>
  versErb(renderEmailText(mail).replace(/\{\{if:\w+\}\}\s*\{\{else\}\}\s*\{\{end\}\}/g, ''));
