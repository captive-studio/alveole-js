import { StyleValue, themeBrut } from '@alveole/theme';
import { STYLE_PAR_NIVEAU } from '../core/Heading/Heading';
import { stylesTexte } from '../core/Typography/Typography.styles';
import { commun, dangereuse, primaire, secondaire, tailles, tertiaire } from '../ui/Button/Button.styles';
import {
  ButtonTaille,
  ButtonVariant,
  CONTENEUR_PAR_TAILLE,
  CONTENEUR_PAR_VARIANT,
  HAUTEUR_PAR_TAILLE,
  TEXTE_PAR_VARIANT,
  TITRE_PAR_TAILLE,
} from '../ui/Button/buttonVariants';
import { stylesCarte } from '../ui/Card/Card.styles';

const theme = themeBrut();
const { color, spacing, radius, text } = theme;
const corps = text['Corps de texte'];

type Declarations = Record<string, string | number | undefined>;

// Les nombres du theme sont des pixels, sauf ces proprietes sans unite.
const SANS_UNITE = new Set(['fontWeight', 'opacity', 'zIndex']);

const rule = (selector: string, declarations: Declarations) => {
  const lines = Object.entries(declarations)
    .filter(([, value]) => value !== undefined)
    .map(([key, value]) => {
      const property = key.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`);
      return `  ${property}: ${typeof value === 'number' && !SANS_UNITE.has(key) ? `${value}px` : value};`;
    });
  return `${selector} {\n${lines.join('\n')}\n}`;
};

/** Ne garde d'un style de composant que ce qu'un client mail sait appliquer. */
const pick = (style: StyleValue, keys: (keyof StyleValue)[]): Declarations =>
  Object.fromEntries(
    keys.flatMap(key => {
      const value = style[key];
      return typeof value === 'string' || typeof value === 'number' ? [[key, value]] : [];
    }),
  );

const TYPO: (keyof StyleValue)[] = ['fontFamily', 'fontWeight', 'fontSize', 'lineHeight', 'textTransform'];
const typo = (style: StyleValue) => pick(style, TYPO);

const BORDURE: (keyof StyleValue)[] = ['borderStyle', 'borderWidth', 'borderColor', 'backgroundColor'];

const carte = stylesCarte(theme);
const texte = stylesTexte(theme).text;
const bouton: Record<string, StyleValue> = {
  ...commun(theme),
  ...tailles(theme),
  ...primaire(theme),
  ...secondaire(theme),
  ...tertiaire(theme),
  ...dangereuse(theme),
};

const VARIANTES: ButtonVariant[] = ['primary', 'secondary', 'tertiary', 'danger'];
const TAILLES: ButtonTaille[] = ['sm', 'md', 'lg'];

const boutons = [
  ...VARIANTES.flatMap(variant => [
    rule(`.btn-cell-${variant}`, {
      ...pick(bouton.container, BORDURE),
      ...pick(bouton[CONTENEUR_PAR_VARIANT[variant].repos], BORDURE),
    }),
    rule(`.btn-${variant}`, pick(bouton[TEXTE_PAR_VARIANT[variant].repos], ['color'])),
  ]),
  ...TAILLES.flatMap(taille => {
    const conteneur = { ...bouton.container, ...bouton[CONTENEUR_PAR_TAILLE[taille]] };
    const titre = bouton[TITRE_PAR_TAILLE[taille]];
    const bordure = Number(conteneur.borderWidth ?? 0);
    // La hauteur du controle, rendue par le padding : un client mail ignore `height` sur un lien.
    const vertical = (Number(bouton[HAUTEUR_PAR_TAILLE[taille]].height) - Number(titre.lineHeight)) / 2 - bordure;
    return [
      rule(`.btn-cell-${taille}`, { borderRadius: conteneur.borderTopLeftRadius }),
      rule(`.btn-${taille}`, {
        ...typo(titre),
        padding: `${vertical}px ${conteneur.paddingLeft}px`,
        borderRadius: conteneur.borderTopLeftRadius,
      }),
    ];
  }),
];

const sombre = color.dark;

/** L'unique feuille de style des mails, tiree du theme Alveole, a inliner a l'envoi (premailer). */
export const emailCss = [
  rule('body.email', { margin: 0, padding: 0, backgroundColor: color.light.background['alt-grey'] }),
  rule('.wrapper', { backgroundColor: color.light.background['alt-grey'], padding: `${spacing('4W')}px 0` }),
  // Conventions des clients mail, pas des jetons : la largeur usuelle d'un mail, et un apercu
  // reduit a rien pour n'apparaitre que dans la boite de reception.
  `.container {\n  width: 600px;\n  max-width: 600px;\n}`,
  `.preview {\n  display: none;\n  max-height: 0;\n  overflow: hidden;\n  font-size: 1px;\n  line-height: 1px;\n}`,
  rule('.header', { padding: `0 0 ${spacing('2W')}px` }),
  rule('.logo', { display: 'block', border: 0 }),
  rule('.card', pick(carte.card, [...BORDURE, 'borderRadius'])),
  rule('.card-cell', { padding: carte.content.padding }),
  ...Object.entries(STYLE_PAR_NIVEAU).map(([niveau, cran]) =>
    rule(`.heading-${niveau.slice(1)}`, {
      ...typo(text.Titres[cran]),
      color: color.light.text['title-grey'],
      margin: 0,
    }),
  ),
  rule('.text', { ...typo(corps.MD.Regular), color: texte.color, margin: 0 }),
  rule('.text-mention', { ...typo(corps.SM.Regular), color: color.light.text['mention-grey'] }),
  rule('.link', { color: color.light.text['action-high-primary'], textDecoration: 'underline' }),
  rule('.avatar', { display: 'block', border: 0, borderRadius: radius('md') }),
  rule('.avatar-rond', { borderRadius: '50%' }),
  rule('.btn', { display: 'inline-block', textDecoration: 'none', textAlign: 'center' }),
  ...boutons,
  rule('.btn-full', { display: 'block' }),
  rule('.footer', {
    ...typo(corps.XS.Regular),
    color: color.light.text['mention-grey'],
    padding: `${spacing('2W')}px 0 0`,
    textAlign: 'center',
  }),
  `@media (max-width: 600px) {\n  .container { width: 100% !important; }\n  .card-cell { padding: ${spacing('2W')}px !important; }\n}`,
  // Les clients qui respectent le mode sombre : fond sombre, texte clair, bouton principal eclairci.
  `@media (prefers-color-scheme: dark) {
  body.email, .wrapper { background-color: ${sombre.background['alt-primary']} !important; }
  .card { background-color: ${sombre.background['contrast-grey']} !important; border-color: ${sombre.background['contrast-grey']} !important; }
  .heading-1, .heading-2, .heading-3, .heading-4, .heading-5, .heading-6, .text, .footer, .text-mention { color: ${sombre.text['default-grey']} !important; }
  .btn-cell-primary { background-color: ${color._constants.BleuCaptive['850']} !important; }
  .btn-primary, .link { color: ${color._constants.BleuCaptive['125']} !important; }
}`,
].join('\n\n');
