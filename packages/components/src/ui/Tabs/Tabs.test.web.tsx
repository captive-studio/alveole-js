import { fireEvent, renderHookOnDesktop, renderWeb, screen, waitFor } from '@/__tests__/helpers/renderWeb';
import { FOCUS_ATTRIBUTE } from '@alveole/theme';
import { Tabs } from './Tabs';
import { useStyles } from './Tabs.styles';

// jsdom n'implemente pas `ResizeObserver`, dont @tamagui/tabs a besoin des le montage. Meme
// faux que DocumentViewerPDF.test.web.tsx : un constructeur conforme, sans observation reelle.
class ResizeObserverDeTest implements ResizeObserver {
  constructor(private readonly callback: ResizeObserverCallback) {}
  observe(_element: Element) {}
  unobserve(_element: Element) {}
  disconnect() {}
}
globalThis.ResizeObserver = ResizeObserverDeTest;

// La bague est desormais posee par le CSS du theme, et `outline` epouse le `border-radius`
// de l'element qu'il entoure. Le rayon doit donc vivre sur l'onglet au repos, sinon la bague
// est un rectangle sec autour d'une pastille arrondie.
//
// Les coins hauts seulement : le souligne de l'onglet actif est le `border-bottom` de ce meme
// element. Arrondi, il cesse d'etre le trait droit pleine largeur de Primer et se recourbe en
// moignon aux extremites - constate a l'ecran avant d'etre corrige ici.
test('arrondit les coins hauts de l onglet, jamais ceux qui portent le souligne', () => {
  const { result } = renderHookOnDesktop(() => useStyles());

  expect({
    haut: result.current.tabsTab.borderTopLeftRadius,
    clefsDeRayon: Object.keys(result.current.tabsTab)
      .filter(clef => clef.includes('Radius'))
      .sort(),
  }).toEqual({
    haut: 'var(--radius-md)',
    clefsDeRayon: ['borderTopLeftRadius', 'borderTopRightRadius'],
  });
});

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

// L'Anchor Sync (ADR 0021) ecrit et relit un fragment `#{urlAnchorPrefix}-{ancre}`, le meme
// format que `AnchorHeading`, pour que le rechargement de la page rouvre le bon onglet.
describe('Anchor Sync', () => {
  afterEach(() => {
    window.location.hash = '';
  });

  test('ecrit l ancre du label clique dans le hash, prefixee par urlAnchorPrefix', () => {
    renderWeb(
      <Tabs
        defaultValue="a"
        urlAnchorPrefix="story"
        tabs={[
          { label: 'Onglet 1', value: 'a', content: <></> },
          { label: 'Onglet 2', value: 'b', content: <></> },
        ]}
      />,
    );

    fireEvent.click(screen.getAllByRole('tab')[1]);

    expect(window.location.hash).toBe('#story-onglet-2');
  });

  test('ne touche pas au hash sans urlAnchorPrefix', () => {
    renderWeb(
      <Tabs
        defaultValue="a"
        tabs={[
          { label: 'Onglet 1', value: 'a', content: <></> },
          { label: 'Onglet 2', value: 'b', content: <></> },
        ]}
      />,
    );

    fireEvent.click(screen.getAllByRole('tab')[1]);

    expect(window.location.hash).toBe('');
  });

  test('ouvre au montage l onglet dont l ancre correspond au hash, avant meme defaultValue', async () => {
    window.location.hash = '#story-onglet-2';

    renderWeb(
      <Tabs
        defaultValue="a"
        urlAnchorPrefix="story"
        tabs={[
          { label: 'Onglet 1', value: 'a', content: <></> },
          { label: 'Onglet 2', value: 'b', content: <></> },
        ]}
      />,
    );

    await waitFor(() => expect(screen.getAllByRole('tab')[1].getAttribute('aria-selected')).toBe('true'));
  });

  test('retombe sur le premier onglet si le hash ne correspond a aucune ancre', async () => {
    window.location.hash = '#story-onglet-inconnu';

    renderWeb(
      <Tabs
        urlAnchorPrefix="story"
        tabs={[
          { label: 'Onglet 1', value: 'a', content: <></> },
          { label: 'Onglet 2', value: 'b', content: <></> },
        ]}
      />,
    );

    await waitFor(() => expect(screen.getAllByRole('tab')[0].getAttribute('aria-selected')).toBe('true'));
  });
});
