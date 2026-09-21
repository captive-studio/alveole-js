import { renderHookOnDesktop } from '@/__tests__/helpers/renderWeb';
import { useStyles } from './DataTable.styles';

// `position: sticky` n'a pas d'équivalent RN (`position` n'y accepte que absolute/relative) :
// un test natif planterait sur cette assertion, d'où le fichier `.web` dédié plutôt qu'un ajout
// à `DataTable.test.web.tsx`, qui couvre le rendu plutôt que les styles.
test('épingle l’en-tête en haut de son ascendant scrollable sur web', () => {
  const { result } = renderHookOnDesktop(() => useStyles());

  expect(result.current.headerRowSticky).toMatchObject({ position: 'sticky', top: 0 });
});
