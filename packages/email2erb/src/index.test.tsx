import { Avatar, Button, EmailLayout, Heading, Typography } from '@alveole/email';
import { renderErb, renderErbText, v, versErb, when } from '.';

const Invitation = () => (
  <EmailLayout preview={`Rejoignez ${v('organisation')}`}>
    <Heading as="h1">Rejoignez {v('organisation')}</Heading>
    <Typography>
      {when(
        'invite_par',
        <>
          <strong>{v('invite_par')}</strong> vous invite
        </>,
        'Vous êtes invité·e',
      )}
    </Typography>
    {when('avatar', <Avatar size="md" src={v('avatar')} />)}
    <Button variant="primary" title="Rejoindre" href={v('url')} />
  </EmailLayout>
);

describe('le rendu ERB', () => {
  const html = renderErb(<Invitation />);

  it('pose les variables en ERB, y compris dans les attributs', () => {
    expect(html).toContain('Rejoignez <%= @organisation %></h1>');
    expect(html).toMatch(/<a href="<%= @url %>"/);
    expect(html).toMatch(/<% if @avatar %><img alt="" height="32" src="<%= @avatar %>"[^>]*\/><% else %><% end %>/);
  });

  it('pose les conditions en ERB', () => {
    expect(html).toContain(
      '<% if @invite_par %><strong><%= @invite_par %></strong> vous invite<% else %>Vous êtes invité·e<% end %>',
    );
  });

  it('ne laisse aucun marqueur', () => {
    expect(html).not.toContain('{{');
  });

  it('produit la vue texte, sans condition vide', () => {
    const texte = renderErbText(<Invitation />);
    expect(texte).toContain('Rejoindre : <%= @url %>');
    expect(texte).toContain('<% if @invite_par %><%= @invite_par %> vous invite<% else %>Vous êtes invité·e<% end %>');
    expect(texte).not.toContain('@avatar');
  });

  it('convertit une sortie quelconque', () => {
    expect(versErb('{{v:nom}} {{if:a}}x{{else}}y{{end}}')).toBe('<%= @nom %> <% if @a %>x<% else %>y<% end %>');
  });
});
