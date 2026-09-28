import { largeurDuPanneau } from './selectStylesConfig';

// Cale sur la largeur du champ, le panneau coupait « Option A » en deux lignes des qu'un champ
// etait etroit. Comme chez Primer et Atlassian, il garde au moins la largeur du champ et s'elargit
// jusqu'au libelle le plus long.
test('elargit le panneau jusqu au libelle le plus long sans descendre sous le champ', () => {
  expect(largeurDuPanneau).toEqual({ width: 'max-content', minWidth: '100%' });
});
