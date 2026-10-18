import { test, type Page } from '@playwright/test';

const BANC = `file://${__dirname}/dist/index.html`;

// Ce que le navigateur peint, et les règles `:focus-visible` qui touchent au contour de
// l'élément focalisé : c'est là que la v2 cachait sa bague en `!important`.
const relever = (page: Page, id: string) =>
  page.evaluate(id => {
    const element = document.getElementById(id)!;
    const style = getComputedStyle(element);
    const regles: string[] = [];
    for (const feuille of Array.from(document.styleSheets))
      for (const regle of Array.from(feuille.cssRules))
        if (
          regle instanceof CSSStyleRule &&
          regle.selectorText.includes('focus') &&
          regle.style.cssText.includes('outline') &&
          element.matches(regle.selectorText)
        )
          regles.push(regle.cssText);
    return {
      actif: document.activeElement === element,
      outline: `${style.outlineStyle} ${style.outlineWidth} ${style.outlineColor} offset ${style.outlineOffset}`,
      ombre: style.boxShadow,
      inline: element.getAttribute('style'),
      regles,
    };
  }, id);

const CAS = [
  'switch-nu',
  'switch-clause',
  'checkbox-nu',
  'checkbox-clause',
  'radio-nu',
  'radio-clause',
  'switch-marque',
  'checkbox-marque',
  'radio-marque',
];

for (const id of CAS) {
  test(id, async ({ page }) => {
    page.on('pageerror', erreur => console.log(`pageerror ${erreur.message}`));
    await page.goto(BANC);
    const element = page.locator(`#${id}`);
    await element.waitFor();
    const repos = await relever(page, id);
    // Au clavier, pour déclencher `:focus-visible` : désigné, quitté, rejoint.
    await element.focus();
    await page.keyboard.press('Shift+Tab');
    await page.keyboard.press('Tab');
    const clavier = await relever(page, id);
    await page.locator('body').click({ position: { x: 1, y: 1 } });
    await element.click();
    const souris = await relever(page, id);
    console.log(JSON.stringify({ id, repos, clavier, souris }, null, 1));
  });
}
