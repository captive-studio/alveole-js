import { act, renderWeb, screen } from '@/__tests__/helpers/renderWeb';
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

const focaliser = (element: HTMLElement) => act(() => element.focus());

// Aucune prop `focusStyle` n existait sur `TamaguiTabs.Tab` : au clavier, rien ne distinguait
// un onglet focalise d un onglet au repos.
test('affiche un anneau de focus qui epouse la pastille arrondie de l onglet', () => {
  renderWeb(
    <Tabs
      defaultValue="a"
      tabs={[
        { label: 'Onglet 1', value: 'a', content: <></> },
        { label: 'Onglet 2', value: 'b', content: <></> },
      ]}
    />,
  );

  focaliser(screen.getAllByRole('tab')[1]);

  const style = window.getComputedStyle(screen.getAllByRole('tab')[1]);
  expect({
    largeur: style.outlineWidth,
    style_: style.outlineStyle,
    couleur: style.outlineColor,
    rayon: style.borderRadius,
  }).toEqual({
    largeur: '2px',
    style_: 'solid',
    couleur: 'rgb(3, 121, 239)',
    // `radius()` rend une variable CSS sur le web (comme `spacing()`), jamais un nombre litteral
    // (seul `control()` en rend un) : c'est la meme valeur que celle deja posee sur `wrapper`.
    rayon: 'var(--radius-md)',
  });
});
