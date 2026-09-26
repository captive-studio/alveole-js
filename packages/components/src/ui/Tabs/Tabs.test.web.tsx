import { fireEvent, renderWeb, screen, waitFor } from '@/__tests__/helpers/renderWeb';
import { FOCUS_ATTRIBUTE } from '@alveole/theme';
import { Tabs } from './Tabs';

// jsdom n'implemente pas `ResizeObserver`, dont @tamagui/tabs a besoin des le montage. Meme
// faux que DocumentViewerPDF.test.web.tsx : un constructeur conforme, sans observation reelle.
class ResizeObserverDeTest implements ResizeObserver {
  constructor(private readonly callback: ResizeObserverCallback) {}
  observe(_element: Element) {}
  unobserve(_element: Element) {}
  disconnect() {}
}
globalThis.ResizeObserver = ResizeObserverDeTest;

// L'onglet ne peint plus sa bague : il la demande au CSS du theme, pose sur `:focus-visible`.
// L'ancien state React, adopte parce que jsdom ne resout pas les pseudo-selecteurs, affichait
// aussi la bague au clic a la souris (constate en navigateur sur les onglets du catalogue).
test('demande la bague de focus au theme plutot que de la peindre lui-meme', () => {
  renderWeb(
    <Tabs
      defaultValue="a"
      tabs={[
        { label: 'Onglet 1', value: 'a', content: <></> },
        { label: 'Onglet 2', value: 'b', content: <></> },
      ]}
    />,
  );

  expect(screen.getAllByRole('tab')[1].getAttribute(FOCUS_ATTRIBUTE)).toBe('ring');
});

// Tamagui donne `tabIndex=-1` a tous les onglets et fait de la liste le point d'entree au
// clavier. Elle prenait donc un arret au Tab sans afficher quoi que ce soit : un arret
// invisible, ou l'on ne sait plus ou l'on est. La sortir de l'ordre de tabulation a ete
// essaye et rend le composant inatteignable (zero onglet atteint sur 160 Tab, mesure en
// navigateur) : c'est bien la bague qui lui manquait, pas l'arret qui etait de trop.
test('montre la bague sur la liste d onglets, point d entree au clavier', () => {
  renderWeb(
    <Tabs
      defaultValue="a"
      tabs={[
        { label: 'Onglet 1', value: 'a', content: <></> },
        { label: 'Onglet 2', value: 'b', content: <></> },
      ]}
    />,
  );

  expect(screen.getByRole('tablist').getAttribute(FOCUS_ATTRIBUTE)).toBe('ring');
});

// Le panneau de contenu est focalisable (motif ARIA : on doit pouvoir atteindre le contenu de
// l'onglet au clavier), mais il n'affichait rien non plus. Deuxieme arret invisible du meme
// composant, apres la liste.
test('montre la bague sur le panneau de contenu, lui aussi focalisable', () => {
  renderWeb(
    <Tabs
      defaultValue="a"
      tabs={[
        { label: 'Onglet 1', value: 'a', content: <></> },
        { label: 'Onglet 2', value: 'b', content: <></> },
      ]}
    />,
  );

  expect(screen.getByRole('tabpanel').getAttribute(FOCUS_ATTRIBUTE)).toBe('ring');
});

// L'Anchor Sync (ADR 0022) ecrit et relit un fragment `#{urlAnchorPrefix}-{ancre}`, le meme
// format que `AnchorHeading`, pour que le rechargement de la page rouvre le bon onglet.
const DEUX_ONGLETS = [
  { label: 'Onglet 1', value: 'a', content: <></> },
  { label: 'Onglet 2', value: 'b', content: <></> },
];

describe('Anchor Sync', () => {
  afterEach(() => {
    window.location.hash = '';
  });

  test('ecrit l ancre du label clique dans le hash, prefixee par urlAnchorPrefix', () => {
    renderWeb(<Tabs defaultValue="a" urlAnchorPrefix="story" tabs={DEUX_ONGLETS} />);

    fireEvent.click(screen.getAllByRole('tab')[1]);

    expect(window.location.hash).toBe('#story-onglet-2');
  });

  test('ne touche pas au hash sans urlAnchorPrefix', () => {
    renderWeb(<Tabs defaultValue="a" tabs={DEUX_ONGLETS} />);

    fireEvent.click(screen.getAllByRole('tab')[1]);

    expect(window.location.hash).toBe('');
  });

  test('ouvre au montage l onglet dont l ancre correspond au hash, avant meme defaultValue', async () => {
    window.location.hash = '#story-onglet-2';

    renderWeb(<Tabs defaultValue="a" urlAnchorPrefix="story" tabs={DEUX_ONGLETS} />);

    await waitFor(() => expect(screen.getAllByRole('tab')[1].getAttribute('aria-selected')).toBe('true'));
  });

  // La restauration ne joue qu'une fois par montage : sans cette garde, l'ecriture du hash par
  // le clic relancerait la restauration, qui rouvrirait l'onglet d'origine et rendrait la barre
  // inutilisable. Le test tient la garde par le comportement, pas par la liste de dependances.
  test('ne restaure plus apres le premier passage, meme quand le hash change ensuite', async () => {
    window.location.hash = '#story-onglet-2';

    renderWeb(<Tabs urlAnchorPrefix="story" tabs={DEUX_ONGLETS} />);

    await waitFor(() => expect(screen.getAllByRole('tab')[1].getAttribute('aria-selected')).toBe('true'));

    fireEvent.click(screen.getAllByRole('tab')[0]);

    expect(window.location.hash).toBe('#story-onglet-1');
    await waitFor(() => expect(screen.getAllByRole('tab')[0].getAttribute('aria-selected')).toBe('true'));
  });

  test('retombe sur le premier onglet si le hash ne correspond a aucune ancre', async () => {
    window.location.hash = '#story-onglet-inconnu';

    renderWeb(<Tabs urlAnchorPrefix="story" tabs={DEUX_ONGLETS} />);

    await waitFor(() => expect(screen.getAllByRole('tab')[0].getAttribute('aria-selected')).toBe('true'));
  });
});
