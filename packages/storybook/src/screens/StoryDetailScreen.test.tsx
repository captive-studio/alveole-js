import { Typography } from '@alveole/components';
import { renderScreen } from '../../__tests__/helpers/renderScreen';
import { StorybookModule } from '../types';
import { StoryDetailScreen } from './StoryDetailScreen';

const fiche = {
  default: {
    title: 'Bouton',
    tags: ['Composant'],
    experimental: false,
    description: 'Un bouton.',
    figmaURL: 'https://figma.com/fiche',
    styleFn: () => ({}),
  },
  Tailles: () => <Typography>Trois tailles</Typography>,
} as unknown as StorybookModule;

const aUneBordure = (element: HTMLElement) => {
  const largeur = window.getComputedStyle(element).borderTopWidth;

  return largeur !== '' && largeur !== '0px' && largeur !== 'medium';
};

const cadresAutourDe = (element: HTMLElement | null) => {
  const cadres: HTMLElement[] = [];

  for (let courant = element?.parentElement ?? null; courant; courant = courant.parentElement) {
    if (aUneBordure(courant)) cadres.push(courant);
  }

  return cadres;
};

/** La rangee qui porte un badge : un `Tag` est une boite autour de son texte. */
const rangeeDuBadge = (badge: HTMLElement) => badge.parentElement!.parentElement!;

describe('StoryDetailScreen', () => {
  // La colonne de lecture n'est etroite que parce qu'un sommaire occupe le reste de la zone :
  // sans lui, la fiche perdrait deux colonnes pour du vide.
  it('liste les exemples de la fiche dans son sommaire', async () => {
    const { getByRole } = renderScreen(<StoryDetailScreen story={fiche} />);

    expect(getByRole('link', { name: 'Tailles' }).getAttribute('href')).toBe('#tailles');
  });

  // Le titre d'un exemple appartient au document, pas a la demonstration : il doit pouvoir
  // etre ancre et repris dans un sommaire. Seul ce qui est montre entre dans le cadre.
  it('laisse le titre de l exemple hors du cadre', async () => {
    const { getAllByText } = renderScreen(<StoryDetailScreen story={fiche} />);
    // Le nom de l'exemple parait deux fois : dans le sommaire, en lien, et en titre.
    const titre = getAllByText('Tailles').find(element => element.closest('a') == null);

    expect(cadresAutourDe(titre ?? null)).toEqual([]);
  });
  // Ni Primer ni Atlassian n'encadrent le haut d'une fiche : la description y est du texte
  // courant. Un cadre gris autour d'elle la donne pour un aparte, alors qu'elle est la
  // premiere phrase de la page.
  it('laisse la description en texte courant, hors de tout cadre', () => {
    const { getByText } = renderScreen(<StoryDetailScreen story={fiche} />);

    expect(cadresAutourDe(getByText('Un bouton.'))).toEqual([]);
  });
  // Les trois cartes « Exemples / Styles / Props » annoncent les trois onglets qui les
  // suivent immediatement, et deux portent une valeur vraie sur toutes les fiches. Ni Primer
  // ni Atlassian n'affichent de tableau de metadonnees avant les exemples.
  it('n annonce pas par des cartes les onglets qui suivent', () => {
    const { queryByText } = renderScreen(<StoryDetailScreen story={fiche} />);

    expect({ exemples: queryByText('Exemples'), styles: queryByText('Disponibles') }).toEqual({
      exemples: null,
      styles: null,
    });
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
  // Les onglets d'une fiche sont une navigation de page, pas un groupe de boutons : chez
  // Primer comme chez Atlassian, une rangee de libelles posee sur un filet, l'actif souligne.
  // Le design system publie deja ces onglets ; le catalogue les redessinait avec des boutons.
  it('monte les onglets du design system plutot que des boutons', () => {
    const { getByRole, queryByRole } = renderScreen(<StoryDetailScreen story={fiche} />);

    expect({
      onglet: getByRole('tab', { name: 'Examples' }).textContent,
      bouton: queryByRole('button', { name: 'Examples' }),
    }).toEqual({ onglet: 'Examples', bouton: null });
  });
});
