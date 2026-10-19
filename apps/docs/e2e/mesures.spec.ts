import { expect, test } from '@playwright/test';
import { blockThirdParties, openRoute } from './audit';
import { valeurCalculee } from './mesures';

// Une variable inconnue retombe sur la valeur par défaut, sur la sonde comme sur l'élément
// mesuré : la comparaison passerait sans rien prouver.
test('refuse de résoudre une variable que le thème ne définit pas', async ({ page }) => {
  await blockThirdParties(page);
  await openRoute(page, '/components/Button');

  await expect(valeurCalculee(page, 'color', 'var(--variable-inexistante)')).rejects.toThrow('--variable-inexistante');
});
