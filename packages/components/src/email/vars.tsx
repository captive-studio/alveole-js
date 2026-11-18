import type { ReactNode } from 'react';

// Marqueurs posés dans le rendu React (qui échapperait de l'ERB), convertis en ERB par render.ts.

/** Une variable fournie par le mailer Rails : v('nom') devient <%= @nom %>. */
export const v = (name: string) => `{{v:${name}}}`;

/** La seule logique permise dans un mail : when('nom', a, b) devient <% if @nom %>a<% else %>b<% end %>. */
export const when = (name: string, then: ReactNode, otherwise: ReactNode = null) => (
  <>
    {`{{if:${name}}}`}
    {then}
    {'{{else}}'}
    {otherwise}
    {'{{end}}'}
  </>
);
