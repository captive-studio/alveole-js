import { fireEvent, renderWeb, screen } from '@/__tests__/helpers/renderWeb';
import { Tabs as TamaguiTabs } from 'tamagui';
import { TabsTab } from './TabsTab';

// jsdom n'implemente pas `ResizeObserver`, dont @tamagui/tabs a besoin des le montage.
class ResizeObserverDeTest implements ResizeObserver {
  observe(_element: Element) {}
  unobserve(_element: Element) {}
  disconnect() {}
}
globalThis.ResizeObserver = ResizeObserverDeTest;

const ongletSurvolable = (onHover: (value: string | null) => void) =>
  renderWeb(
    <TamaguiTabs defaultValue="a">
      <TamaguiTabs.List>
        <TabsTab
          value="b"
          label="Onglet"
          etat={{ actif: false, survole: false }}
          disabled={false}
          onHover={onHover}
          onInteraction={() => {}}
        />
      </TamaguiTabs.List>
    </TamaguiTabs>,
  );

// Le survol ne se voit qu'au navigateur (apps/docs/e2e/tabs.spec.ts) ; l'onglet, lui, doit le
// signaler a Tabs, qui en tient l'etat.
test('signale le survol de l onglet', () => {
  const onHover = jest.fn();
  ongletSurvolable(onHover);

  fireEvent.mouseEnter(screen.getByRole('tab'));

  expect(onHover).toHaveBeenLastCalledWith('b');
});

test('signale la fin du survol de l onglet', () => {
  const onHover = jest.fn();
  ongletSurvolable(onHover);

  fireEvent.mouseEnter(screen.getByRole('tab'));
  fireEvent.mouseLeave(screen.getByRole('tab'));

  expect(onHover).toHaveBeenLastCalledWith(null);
});
