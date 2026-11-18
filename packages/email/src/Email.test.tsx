import { CustomPalette, RadiusList, TaillesAvatar } from '@alveole/theme';
import type { ReactElement } from 'react';
import {
  A,
  Avatar,
  Button,
  Card,
  Column,
  Divider,
  EmailLayout,
  Heading,
  renderEmail,
  renderEmailText,
  renderSample,
  Row,
  Typography,
  v,
  when,
} from '.';

const { background, border, text } = CustomPalette.light;

const Commentaire = () => (
  <EmailLayout
    preview={`${v('auteur')} a commenté`}
    logo={{ src: '/logo.png', alt: 'Captive' }}
    footer={
      <Typography ton="discret" textAlign="center">
        Captive
      </Typography>
    }
  >
    <Heading as="h1">{v('auteur')} a laissé un commentaire</Heading>
    <Card media={<img src="/capture.png" alt="" width={240} />}>
      <Row>
        <Column>{when('avatar', <Avatar size="md" src={v('avatar')} fallbackText="Dave" />)}</Column>
        <Column>
          <Typography ton="fort">{v('auteur')}</Typography>
          <Typography>
            Voir sur <A href="https://github.com">GitHub</A>
          </Typography>
        </Column>
      </Row>
      <Button variant="secondary" fullWidth title="Voir dans le dashboard" href={v('url')} />
    </Card>
    <Divider />
  </EmailLayout>
);

describe('un mail complet', () => {
  const html = renderEmail(<Commentaire />);

  it('est un document HTML en tables, styles inline', () => {
    expect(html.startsWith('<!DOCTYPE html>\n<html dir="ltr" lang="fr">')).toBe(true);
    expect(html).toContain('role="presentation"');
    expect(html).not.toContain('class=');
    expect(html).not.toContain('var(--');
  });

  it('pose variables et conditions en ERB', () => {
    expect(html).toContain('<%= @auteur %> a laissé un commentaire</h1>');
    expect(html).toMatch(/<% if @avatar %><img alt="Dave" height="32" src="<%= @avatar %>"[^>]*\/><% else %><% end %>/);
  });

  it('cache l’aperçu dans le corps', () => {
    expect(html).toMatch(/<div style="display:none[^"]*" data-skip-in-text="true">\s*<%= @auteur %> a commenté/);
  });

  it('indente la structure sans couper le texte', () => {
    expect(html).toContain('\n      <tbody>\n        <tr>\n');
    expect(html).toMatch(/<p style="[^"]*">Voir sur <a href="https:\/\/github.com"[^>]*>GitHub<\/a><\/p>/);
  });

  it('produit une version texte, sans aperçu ni commentaires Outlook', () => {
    const texte = renderEmailText(<Commentaire />);
    expect(texte).toContain('Voir sur GitHub : https://github.com');
    expect(texte).toContain('Voir dans le dashboard : <%= @url %>');
    expect(texte).not.toContain('a commenté');
    expect(texte).not.toMatch(/<(?!%)|&#/);
  });

  it('se remplit avec des données d’exemple', () => {
    const exemple = renderSample(<Commentaire />, { auteur: 'A & B', avatar: null, url: 'https://exemple.test' });
    expect(exemple).toContain('A &amp; B a laissé un commentaire');
    expect(exemple).toContain('href="https://exemple.test"');
    expect(exemple).not.toContain('<img alt="Dave"');
    expect(exemple).not.toContain('{{');
  });
});

describe('Button', () => {
  const style = (element: ReactElement) => renderEmail(element).match(/<a [^>]*style="([^"]*)"/)?.[1] ?? '';

  it.each([
    {
      variant: 'primary',
      fond: background['action-high-primary'],
      couleur: text['inverted-primary'],
      bordure: 'transparent',
    },
    {
      variant: 'secondary',
      fond: background['default-grey'],
      couleur: text['action-high-grey'],
      bordure: border['default-grey'],
    },
    {
      variant: 'danger',
      fond: background['action-high-error'],
      couleur: text['inverted-grey'],
      bordure: border['plain-error'],
    },
  ] as const)('prend les jetons de la variante $variant', ({ variant, fond, couleur, bordure }) => {
    const s = style(<Button variant={variant} title="Ok" href="#" />);
    expect(s).toContain(`background-color:${fond}`);
    expect(s).toContain(`color:${couleur}`);
    expect(s).toContain(`border:1px solid ${bordure}`);
  });

  it('laisse la variante tertiary sans fond', () => {
    expect(style(<Button variant="tertiary" title="Ok" href="#" />)).not.toContain('background-color');
  });

  it('rend la hauteur de chaque taille par le padding', () => {
    // md : contrôle de 32 px, ligne de 20 px, bordure de 1 px, padding horizontal de 12 px.
    expect(style(<Button variant="primary" title="Ok" href="#" />)).toContain('padding:5px 12px');
    expect(style(<Button variant="primary" size="sm" title="Ok" href="#" />)).toContain(
      `border-radius:${RadiusList.sm}px`,
    );
    expect(style(<Button variant="primary" size="lg" title="Ok" href="#" />)).toContain('font-size:16px');
  });

  it('occupe toute la largeur avec fullWidth', () => {
    expect(style(<Button variant="primary" title="Ok" href="#" />)).toContain('display:inline-block');
    expect(style(<Button variant="primary" fullWidth title="Ok" href="#" />)).toContain('display:block');
  });
});

describe('les autres composants', () => {
  it('Heading vaut h2 par défaut, au cran du thème', () => {
    expect(renderEmail(<Heading>Titre</Heading>)).toMatch(/^<h2 style="[^"]*font-weight:600[^"]*">Titre<\/h2>$/);
  });

  it('Typography a trois tons', () => {
    expect(renderEmail(<Typography>a</Typography>)).toContain('font-weight:400');
    expect(renderEmail(<Typography ton="fort">a</Typography>)).toContain('font-weight:500');
    expect(renderEmail(<Typography ton="discret">a</Typography>)).toContain(`color:${text['mention-grey']}`);
  });

  it('Avatar suit les tailles d’Avatar, rond sauf carré', () => {
    expect(renderEmail(<Avatar size="xl" src="/a.png" />)).toContain(`width="${TaillesAvatar.xl}"`);
    expect(renderEmail(<Avatar size="sm" carre src="/a.png" />)).toContain(`border-radius:${RadiusList.md}px`);
  });

  it('Card porte la bordure et le rayon du thème, et son média seulement s’il est donné', () => {
    const carte = renderEmail(<Card>x</Card>);
    expect(carte).toContain(`border:1px solid ${border['default-grey']};border-radius:${RadiusList.lg}px`);
    expect(carte).not.toContain(background['alt-grey']);
  });

  it('Divider et EmailLayout minimal', () => {
    expect(renderEmail(<Divider />)).toContain(`border-color:${border['default-grey']}`);
    const nu = renderEmail(<EmailLayout>x</EmailLayout>);
    expect(nu).not.toContain('<img');
    expect(nu).not.toContain('data-skip-in-text');
  });
});
