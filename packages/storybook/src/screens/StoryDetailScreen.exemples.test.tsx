import { cadresAutourDe, fiche } from '../../__tests__/helpers/fiche';
import { renderScreen } from '../../__tests__/helpers/renderScreen';
import { StoryDetailScreen } from './StoryDetailScreen';

describe('ce que la fiche montre', () => {
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
  // Le trait des onglets et le premier titre d'exemple se touchent a 6 px : le titre se lit
  // comme le libelle de l'onglet actif, pas comme le premier exemple. Primer laisse 71 px
  // entre son intertitre « React examples » et « Default ». Le premier exemple se detache
  // de la barre comme les exemples se detachent entre eux.
  it('detache le premier exemple de la barre d onglets', () => {
    const { getByRole } = renderScreen(<StoryDetailScreen story={fiche} />);
    const exemples = getByRole('tabpanel').firstElementChild as HTMLElement;

    expect(window.getComputedStyle(exemples).marginTop).toBe('40px');
  });
});
