import { renderOnDesktop, renderOnMobile, screen } from '@/__tests__/helpers/renderWeb';
import { SidebarGroup } from './SidebarGroup';

// Le gabarit du titre se tient au niveau 1 (Sidebar.styles.test.web.tsx) et se mesure au
// niveau 3 (apps/docs/e2e/sidebar.spec.ts) : ici, seul ce que le groupe montre (ADR 0027).
test('montre son titre au-dessus de ses items', () => {
  renderOnDesktop(
    <SidebarGroup title="core">
      <span>Button</span>
    </SidebarGroup>,
  );

  expect([screen.getByText('core'), screen.getByText('Button')]).toHaveLength(2);
});

test('montre aussi son titre dans le tiroir mobile', () => {
  renderOnMobile(
    <SidebarGroup title="core">
      <span>Button</span>
    </SidebarGroup>,
  );

  expect([screen.getByText('core'), screen.getByText('Button')]).toHaveLength(2);
});
