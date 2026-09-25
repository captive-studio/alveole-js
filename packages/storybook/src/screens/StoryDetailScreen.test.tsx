import type { StoryExample } from '@alveole/components';
import { fiche } from '../../__tests__/helpers/fiche';
import { renderScreen } from '../../__tests__/helpers/renderScreen';
import { StorybookMeta, StorybookModule } from '../types';
import { StoryDetailScreen } from './StoryDetailScreen';

// La mise en page de la fiche (tailles de texte, ecarts, cadres, rangees) se mesure dans le
// navigateur : apps/docs/e2e/ecrans.spec.ts. Ne restent ici que ses roles, ses noms et ce
// qu'elle montre ou non selon la fiche (ADR 0027).
describe('StoryDetailScreen, ce que la fiche annonce', () => {
  // Le bleu plein appelle l'action principale d'une page. Une fiche n'en a pas : elle a de la
  // lecture, et Figma en est une sortie laterale. Primer ecrit « View in Figma » en lien.
  it('ouvre Figma par un lien plutot que par un bouton', () => {
    const { getByRole, queryByRole } = renderScreen(<StoryDetailScreen story={fiche} />);

    expect({
      lien: getByRole('link', { name: 'Ouvrir Figma' }).getAttribute('href'),
      bouton: queryByRole('button', { name: 'Ouvrir Figma' }),
    }).toEqual({ lien: 'https://figma.com/fiche', bouton: null });
  });

  // Chez Primer, la rangee de badges et de liens (Ready to use, GitHub, Figma...) vit sous la
  // barre d'onglets, dans le contenu de l'onglet actif : elle documente ce qu'on regarde, pas
  // la fiche en general. Chez nous elle etait dans l'en-tete, au-dessus des onglets.
  it('pose les tags et le lien Figma sous la barre d onglets', () => {
    const { getByText, getByRole } = renderScreen(<StoryDetailScreen story={fiche} />);
    const tabpanel = getByRole('tabpanel');

    expect(tabpanel.contains(getByText('Composant'))).toBe(true);
    expect(tabpanel.contains(getByRole('link', { name: 'Ouvrir Figma' }))).toBe(true);
  });
});

describe('StoryDetailScreen, ce que la fiche montre', () => {
  // La colonne de lecture n'est etroite que parce qu'un sommaire occupe le reste de la zone :
  // sans lui, la fiche perdrait deux colonnes pour du vide.
  it('liste les exemples de la fiche dans son sommaire', () => {
    const { getByRole } = renderScreen(<StoryDetailScreen story={fiche} />);

    expect(getByRole('link', { name: 'Tailles' }).getAttribute('href')).toBe('#tailles');
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
});

/** La fiche par defaut, dotee de ce que le test veut lui donner. */
const ficheAvec = (
  meta: Partial<StorybookMeta>,
  exemples: Record<string, StoryExample | undefined> = {},
): StorybookModule => ({
  ...fiche,
  ...exemples,
  default: { ...fiche.default, ...meta },
});

describe('StoryDetailScreen, ce qu il montre de la fiche', () => {
  // L'URL peut nommer une fiche disparue : la page se charge quand meme et le dit, plutot que
  // de rendre un ecran vide.
  it('dit que la fiche est introuvable', () => {
    const { getByText } = renderScreen(<StoryDetailScreen story={null} notFoundMessage="Fiche disparue." />);

    expect(getByText('Fiche disparue.')).toBeTruthy();
  });

  it('nomme chaque exemple au-dessus de sa demonstration', () => {
    const { getAllByText } = renderScreen(<StoryDetailScreen story={fiche} />);

    expect(getAllByText('Tailles').length).toBeGreaterThan(1);
  });

  // Une fiche sans exemple n'a rien a sommaire : un sommaire vide prendrait deux colonnes
  // pour du vide.
  it('ne pose pas de sommaire sur une fiche sans exemple', () => {
    const { queryByText } = renderScreen(<StoryDetailScreen story={ficheAvec({}, { Tailles: undefined })} />);

    expect(queryByText('Sur cette page')).toBeNull();
  });

  // Un gabarit se montre seul, en pleine page : son nom d'export est un detail d'implantation,
  // pas un titre de section. Il reste dans le sommaire, qui enumere les exemples.
  it('ne titre pas l exemple d un gabarit', () => {
    const { queryAllByText } = renderScreen(<StoryDetailScreen story={ficheAvec({ tags: ['Template'] })} />);

    expect(queryAllByText('Tailles').filter(noeud => noeud.closest('a') === null)).toHaveLength(0);
  });

  it('n ouvre pas Figma quand la fiche ne le renseigne pas', () => {
    const { queryByText } = renderScreen(<StoryDetailScreen story={ficheAvec({ figmaURL: undefined })} />);

    expect(queryByText('Ouvrir Figma')).toBeNull();
  });

  // L'onglet des props n'a de contenu que si la fiche en declare : vide, il promet une
  // documentation qui n'existe pas.
  it('n ouvre pas d onglet de props sur une fiche qui n en declare pas', () => {
    const { queryByRole } = renderScreen(<StoryDetailScreen story={fiche} />);

    expect(queryByRole('tab', { name: 'Props' })).toBeNull();
  });

  it('ouvre un onglet de props des que la fiche en declare', () => {
    const { getByRole } = renderScreen(<StoryDetailScreen story={ficheAvec({ props: { title: 'string' } })} />);

    expect(getByRole('tab', { name: 'Props' })).toBeTruthy();
  });

  it('montre la description que la fiche donne a l exemple', () => {
    const story: StorybookModule = {
      ...fiche,
      Sources: { storyDescriptions: { Tailles: 'Trois tailles.' } },
    };
    const { getByText } = renderScreen(<StoryDetailScreen story={story} />);

    expect(getByText('Trois tailles.')).toBeTruthy();
  });

  // Le surlignage decoupe le code en un noeud par jeton : c'est le texte de la page entiere
  // qu'il faut lire pour retrouver la ligne.
  it('montre le code que la fiche donne a l exemple', () => {
    const story: StorybookModule = {
      ...fiche,
      Sources: { storySources: { Tailles: '<Bouton taille="sm" />' } },
    };
    const { container } = renderScreen(<StoryDetailScreen story={story} />);

    expect(container.textContent).toContain('<Bouton taille="sm" />');
  });
});
