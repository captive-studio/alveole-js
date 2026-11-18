import { CustomPalette, RadiusList } from '@alveole/theme';
import {
  A,
  Avatar,
  Button,
  Card,
  emailCss,
  EmailLayout,
  Heading,
  Preview,
  renderEmail,
  renderEmailText,
  renderSample,
  Typography,
  v,
  when,
} from '.';

const Invitation = () => (
  <>
    <Preview>Rejoignez {v('organization_name')}</Preview>
    <Card>
      <Heading as="h1">Bienvenue</Heading>
      <Typography>
        {when(
          'inviter_name',
          <>
            <strong>{v('inviter_name')}</strong> vous invite
          </>,
          'Vous êtes invité·e',
        )}
      </Typography>
      <Typography mention>
        Profil : <A href={`https://github.com/${v('login')}`}>@{v('login')}</A>
      </Typography>
      {when('avatar_url', <Avatar size="md" src={v('avatar_url')} fallbackText="Dave" />)}
      <Button variant="primary" title={`Rejoindre ${v('organization_name')}`} href={v('url')} />
    </Card>
  </>
);

describe('les variantes mail', () => {
  const html = renderEmail(<Invitation />);

  it('met en page avec des tables et des classes, sans style inline', () => {
    expect(html).toContain('<table class="card" role="presentation"');
    expect(html).not.toContain('style=');
  });

  it('rend le bouton en lien dans une cellule qui porte le fond', () => {
    expect(html).toContain('<td class="btn-cell btn-cell-primary btn-cell-md" align="center">');
    expect(html).toContain(
      '<a class="btn btn-primary btn-md" href="<%= @url %>">Rejoindre <%= @organization_name %></a>',
    );
  });

  it.each(['secondary', 'tertiary', 'danger'] as const)('rend la variante %s et ses tailles', variant => {
    const bouton = renderEmail(<Button variant={variant} size="lg" fullWidth title="Ok" href="#" />);
    expect(bouton).toContain('<table role="presentation" cellPadding="0" cellSpacing="0" width="100%">');
    expect(bouton).toContain(`<a class="btn btn-${variant} btn-lg btn-full" href="#">Ok</a>`);
  });

  it('rend Heading au niveau demande, h2 par defaut', () => {
    expect(html).toContain('<h1 class="heading-1">Bienvenue</h1>');
    expect(renderEmail(<Heading>Titre</Heading>)).toBe('<h2 class="heading-2">Titre</h2>');
  });

  it('pose les conditions en ERB', () => {
    expect(html).toContain('<% if @inviter_name %><strong><%= @inviter_name %></strong> vous invite<% else %>');
    expect(html).toMatch(
      /<% if @avatar_url %><img class="avatar avatar-rond" src="<%= @avatar_url %>" alt="Dave" width="32" height="32"\/>/,
    );
  });

  it('produit une version texte avec les liens', () => {
    const text = renderEmailText(<Invitation />);
    expect(text).toContain('Rejoindre <%= @organization_name %> : <%= @url %>');
    expect(text).not.toContain('Rejoignez');
    expect(text).not.toMatch(/<(?!%)/);
  });

  it('indente la structure des tables sans couper le texte', () => {
    expect(html).toContain('\n  <tbody>\n    <tr>\n      <td class="card-cell">\n');
    expect(html).toContain('<p class="text text-mention">Profil : <a class="link"');
  });
});

describe('le gabarit', () => {
  const layout = renderEmail(
    <EmailLayout logo={{ src: '/logo.png', alt: 'Captive' }} footer="Captive">
      {'{{yield}}'}
    </EmailLayout>,
  );

  it('pose la feuille de style, l’aperçu et le contenu en ERB', () => {
    expect(layout).toContain('<%= stylesheet_link_tag "email", media: "all" %>');
    expect(layout).toContain('<%= yield :preview %>');
    expect(layout).toContain('<%= yield %>');
  });

  it('colle le logo à sa cellule', () => {
    expect(layout).toMatch(/<td class="header"><img class="logo" src="\/logo.png" alt="Captive" .*?\/><\/td>/);
  });

  it('omet en-tête et pied sans logo ni footer', () => {
    const nu = renderEmail(<EmailLayout>x</EmailLayout>);
    expect(nu).not.toContain('class="header"');
    expect(nu).not.toContain('class="footer"');
  });
});

describe('la prévisualisation avec des données d’exemple', () => {
  const html = renderSample({
    layout: <EmailLayout>{'{{yield}}'}</EmailLayout>,
    mail: <Invitation />,
    exemple: {
      url: 'https://exemple.test',
      organization_name: 'Acme & Co',
      inviter_name: null,
      login: 'dave',
      avatar_url: null,
    },
    css: '.btn{}',
  });

  it('remplit les variables, résout les conditions et embarque le CSS', () => {
    expect(html).toContain('href="https://exemple.test">Rejoindre Acme &amp; Co</a>');
    expect(html).toContain('Vous êtes invité·e');
    expect(html).toContain('<style>.btn{}</style>');
    expect(html).not.toContain('{{');
  });
});

describe('emailCss', () => {
  const regle = (selecteur: string) =>
    emailCss.match(new RegExp(`^${selecteur.replace('.', '\\.')} \\{[^}]*\\}`, 'm'))?.[0];
  const { background, border, text } = CustomPalette.light;

  it('ne contient que des valeurs, jamais de variable CSS', () => {
    expect(emailCss).not.toContain('var(--');
  });

  it('tire les couleurs de chaque variante des styles du Button', () => {
    expect(regle('.btn-cell-primary')).toContain(`background-color: ${background['action-high-primary']};`);
    expect(regle('.btn-primary')).toContain(`color: ${text['inverted-primary']};`);
    expect(regle('.btn-cell-secondary')).toContain(`border-color: ${border['default-grey']};`);
    expect(regle('.btn-cell-tertiary')).toContain('border-color: transparent;');
    expect(regle('.btn-cell-danger')).toContain(`background-color: ${background['action-high-error']};`);
    expect(regle('.btn-danger')).toContain(`color: ${text['inverted-grey']};`);
  });

  it('rend la hauteur de chaque taille par le padding', () => {
    // md : controle de 32 px, ligne de 20 px, bordure de 1 px, padding horizontal de 12 px.
    expect(regle('.btn-md')).toContain('padding: 5px 12px;');
    expect(regle('.btn-md')).toContain('font-weight: 500;');
    expect(regle('.btn-cell-sm')).toContain(`border-radius: ${RadiusList.sm}px;`);
  });

  it('reprend la carte et le texte du thème', () => {
    expect(regle('.card')).toContain(`border-radius: ${RadiusList.md}px;`);
    expect(regle('.text')).toMatch(/font-family: Geist, .*sans-serif;/);
    expect(regle('.text')).toContain('line-height: 24px;');
  });
});
