import type { Locator, Page } from '@playwright/test';

/**
 * Le point de convergence de l'ADR 0016, amendée par l'ADR 0017, rendu dans le navigateur :
 * jsdom ne résout ni la règle CSS marquée qui pose l'anneau ni la bordure calculée, et un
 * test vert y valait ce que le style déclaré disait (ADR 0027).
 *
 * Chaque famille a son cadre et sa façon de prendre le focus : un `input` sous un `Box`,
 * un `control` composé par react-select, des cellules empilées par la bibliothèque OTP.
 * D'où la table. Ce qu'on en attend, lui, est identique.
 */
export type Cadre = 'parent' | 'grandParent' | 'reactSelect' | 'otp';

export type Controle = {
  /** Ce que la plateforme focalise : le premier modifiable de la fiche. */
  champ: string;
  /** Comment remonter du champ au cadre qui porte la bordure. */
  cadre: Cadre;
  /** Le champ de prix n'a qu'un trait sous le montant en guise de cadre. */
  cote?: 'Top' | 'Bottom';
  /**
   * L'anneau encastré attendu, lu tel que rendu : son écart, ou `aucun` pour le champ de
   * prix, dont `containerFocused` ne reprend de `focusBorder()` que l'épaisseur et la
   * couleur, pour les poser sur son trait du bas.
   */
  anneau: string;
};

const MODIFIABLE = ':not([readonly]):not([disabled])';
// L'écart de `FocusRingMetrics.insetOffset` : l'anneau se dessine à l'intérieur du cadre.
// Un anneau repassé au dehors redonnerait le double cadre.
const ENCASTRE = '-2px';
const saisie = (balise: string): Controle => ({ champ: `${balise}${MODIFIABLE}`, cadre: 'parent', anneau: ENCASTRE });
const selecteur: Controle = { champ: `[role="combobox"]${MODIFIABLE}`, cadre: 'reactSelect', anneau: ENCASTRE };

export const CONTROLES: Record<string, Controle> = {
  FormControl: saisie('input'),
  TextInput: saisie('input'),
  TextareaInput: saisie('textarea'),
  DurationInput: saisie('input'),
  DateInput: saisie('input'),
  TimeInput: saisie('input'),
  NumberInput: saisie('input'),
  PriceInput: {
    champ: `.alveole-price-input${MODIFIABLE}`,
    cadre: 'grandParent',
    cote: 'Bottom',
    anneau: 'aucun',
  },
  Select: selecteur,
  OtpField: { champ: `[data-testid="otp-input-hidden"]${MODIFIABLE}`, cadre: 'otp', anneau: ENCASTRE },
};

// Le bleu de `Colors.Focus[525]` et l'épaisseur de `focusBorder()` : le thème vérifie ses
// propres valeurs (packages/theme/src/constants/Focus.web.test.ts), ce test vérifie qu'elles
// arrivent jusqu'au rendu.
export const BORDURE_DE_FOCUS = { couleur: 'rgb(10, 118, 246)', epaisseur: '1px' };

export type Bordure = { couleur: string; epaisseur: string };
export type Mesure = { repos: Bordure; focus: Bordure; apresBlur: Bordure; anneau: string; ombre: string };

type Cible = Pick<Controle, 'champ' | 'cadre' | 'cote'>;

// react-select anime sa bordure : mesurée aussitôt après le focus, elle rendait une couleur
// de transition, ni celle du repos ni celle du focus. On mesure l'état stable.
const finDesTransitions = (page: Page) =>
  page.waitForFunction(() => document.getAnimations().every(animation => animation.playState !== 'running'));

const dansLaFiche = (champ: string) => `main ${champ}`;

// Le cadre se retrouve depuis le champ, dans le document, pour que la mesure porte sur le
// contrôle focalisé et non sur un autre exemple de la même fiche.
const mesurerDansLaPage = async (page: Page, cible: Cible) => {
  await finDesTransitions(page);
  // Le décodage de `Cadre` vit dans la page : une fonction ne traverse pas la sérialisation
  // de Playwright, seul le nom de la remontée le peut.
  return page.evaluate(
    ({ selecteur, cadre, cote = 'Top' }) => {
      const element = document.querySelector(selecteur);
      if (!(element instanceof HTMLElement)) throw new Error(`Aucun element pour ${selecteur}`);
      const remonter: Record<string, () => Element | null> = {
        parent: () => element.parentElement,
        grandParent: () => element.parentElement?.parentElement ?? null,
        reactSelect: () => element.closest('div[class*="control"]'),
        otp: () => {
          let ancetre = element.parentElement;
          while (ancetre && !ancetre.querySelector('[data-testid="otp-input"]')) ancetre = ancetre.parentElement;
          return ancetre?.querySelector('[data-testid="otp-input"]') ?? null;
        },
      };
      const style = window.getComputedStyle(remonter[cadre]()!);
      return {
        bordure: {
          couleur: style.getPropertyValue(`border-${cote.toLowerCase()}-color`),
          epaisseur: style.getPropertyValue(`border-${cote.toLowerCase()}-width`),
        },
        anneau: style.outlineStyle === 'none' ? 'aucun' : style.outlineOffset,
        ombre: style.boxShadow || 'none',
        actif: document.activeElement === element,
      };
    },
    { selecteur: dansLaFiche(cible.champ), cadre: cible.cadre, cote: cible.cote },
  );
};

// Focalisé au clavier, pas par `focus()` : c'est ce qui déclenche `:focus-visible`, dont
// dépend l'anneau. Le champ est d'abord désigné, puis quitté et rejoint à la tabulation.
const focaliserAuClavier = async (page: Page, champ: Locator) => {
  await champ.focus();
  await page.keyboard.press('Shift+Tab');
  await page.keyboard.press('Tab');
};

export async function mesurer(page: Page, cible: Cible): Promise<Mesure> {
  const champ = page.locator(dansLaFiche(cible.champ)).first();
  const repos = await mesurerDansLaPage(page, cible);

  await focaliserAuClavier(page, champ);
  const focus = await mesurerDansLaPage(page, cible);
  if (!focus.actif) throw new Error(`La tabulation n'a pas ramené le focus sur ${cible.champ}.`);

  await champ.blur();
  const apresBlur = await mesurerDansLaPage(page, cible);

  return {
    repos: repos.bordure,
    focus: focus.bordure,
    apresBlur: apresBlur.bordure,
    anneau: focus.anneau,
    ombre: focus.ombre,
  };
}
