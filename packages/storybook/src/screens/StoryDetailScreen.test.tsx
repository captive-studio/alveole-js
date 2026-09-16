import { cadresAutourDe, fiche, rangeeDuBadge, separationEntre } from '../../__tests__/helpers/fiche';
import { renderScreen } from '../../__tests__/helpers/renderScreen';
import { StoryDetailScreen } from './StoryDetailScreen';

describe('ce que la fiche annonce', () => {
  // Ni Primer ni Atlassian n'encadrent le haut d'une fiche : la description y est du texte
  // courant. Un cadre gris autour d'elle la donne pour un aparte, alors qu'elle est la
  // premiere phrase de la page.
  it('laisse la description en texte courant, hors de tout cadre', () => {
    const { getByText } = renderScreen(<StoryDetailScreen story={fiche} />);

    expect(cadresAutourDe(getByText('Un bouton.'))).toEqual([]);
  });
  // Le catalogue est un site de documentation, pas une application : son titre de page se lit
  // dans un autre registre que celui de `PageHeader`, qui titre les ecrans des applications
  // clientes. Primer sert sa doc avec un paquet a part, Atlassian avec un style hors de son
  // echelle, Uber avec son echelle mais sans passer par un en-tete d'application.
  it('titre la fiche dans le registre du catalogue, pas dans celui des applications', () => {
    const { getByText } = renderScreen(<StoryDetailScreen story={fiche} />);

    expect(window.getComputedStyle(getByText('Bouton')).fontSize).toBe('var(--typography-titres-h1-xl-font-size)');
  });
  // La premiere phrase de la fiche presente le composant : elle n'est pas un paragraphe parmi
  // d'autres. Primer et Base la posent tous les deux a 18/27, un cran au-dessus de leur texte
  // courant. Chez nous elle se lisait exactement comme n'importe quel paragraphe.
  it('pose la premiere phrase un cran au-dessus du texte courant', () => {
    const { getByText } = renderScreen(<StoryDetailScreen story={fiche} />);

    expect(window.getComputedStyle(getByText('Un bouton.')).fontSize).toBe(
      'var(--typography-corps-de-texte-lg-regular-font-size)',
    );
  });
  // Le lien Figma partageait la ligne de la description : il lui prenait 99 px sur 690, et la
  // premiere phrase de la page n'allait jamais au bout de sa colonne. Chez Primer, titre et
  // description font tous les deux la largeur de la colonne de lecture.
  it('ne pose pas le lien Figma sur la ligne de la description', () => {
    const { getByText, getByRole } = renderScreen(<StoryDetailScreen story={fiche} />);
    const lien = getByRole('link', { name: 'Ouvrir Figma' });

    expect(separationEntre(getByText('Un bouton.'), lien).flexDirection).toBe('column');
  });
  // Le bleu plein appelle l'action principale d'une page. Une fiche n'en a pas : elle a de la
  // lecture, et Figma en est une sortie laterale. Primer ecrit « View in Figma » en lien.
  it('ouvre Figma par un lien plutot que par un bouton', () => {
    const { getByRole, queryByRole } = renderScreen(<StoryDetailScreen story={fiche} />);

    expect({
      lien: getByRole('link', { name: 'Ouvrir Figma' }).getAttribute('href'),
      bouton: queryByRole('button', { name: 'Ouvrir Figma' }),
    }).toEqual({ lien: 'https://figma.com/fiche', bouton: null });
  });
  // « Tags » et « Informations » posent deux niveaux de titraille sur deux rangees de badges
  // qui se lisent pareil. Primer aligne ses badges de statut sur une seule ligne.
  it('aligne tags et informations sur une seule rangee', () => {
    const { getByText } = renderScreen(<StoryDetailScreen story={fiche} />);

    expect(rangeeDuBadge(getByText('Composant'))).toBe(rangeeDuBadge(getByText('Figma')));
  });
  // Primer, Atlassian et Uber laissent 55 a 75 px entre ce que la page annonce et ce qu'elle
  // montre. A 20 px, le titre, la description, les badges et les onglets se touchent tous et
  // se lisent comme un seul paquet.
  it('detache les onglets de ce que la fiche annonce', () => {
    const { getByRole } = renderScreen(<StoryDetailScreen story={fiche} />);
    const titre = getByRole('heading', { level: 1 });
    const onglet = getByRole('tab', { name: 'Examples' });

    expect(separationEntre(titre, onglet).gap).toBe('48px');
  });
});
