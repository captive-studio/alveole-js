import type { CSSObjectWithLabel } from 'react-select';
import { selectStylesConfig } from './selectStylesConfig';

type Styles = Parameters<typeof selectStylesConfig>;

// Cale sur la largeur du champ, le panneau coupait « Option A » en deux lignes des qu'un champ
// etait etroit. Comme chez Primer et Atlassian, il garde au moins la largeur du champ et s'elargit
// jusqu'au libelle le plus long.
test('elargit le panneau jusqu au libelle le plus long sans descendre sous le champ', () => {
  const config = selectStylesConfig({} as Styles[0], { panel: {} } as Styles[1], {});
  const base = { width: '100%' } as CSSObjectWithLabel;

  const panneau = config.menu?.(base, {} as never);

  expect({ width: panneau?.width, minWidth: panneau?.minWidth }).toEqual({ width: 'max-content', minWidth: '100%' });
});
