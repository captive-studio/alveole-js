import { elementDuType } from './elementDuType';

// Un cast `as HTMLInputElement` laisse passer un `null` ou un autre element : le test echoue
// alors plus loin, sur une propriete absente, sans dire ce qui manquait.
it('echoue en nommant le type attendu quand l element n est pas du bon type', () => {
  expect(() => elementDuType(document.createElement('div'), HTMLInputElement)).toThrow('HTMLInputElement');
});
