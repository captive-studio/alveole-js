import { renderNative, RenderResult } from '@/__tests__/helpers/renderNative';
import { Button } from './Button';

// getByRole('button') renvoie la vue du Pressable, qui ne porte que les rayons.
// Les styles de variant (fond, paddings, bordures) vivent sur le Box qu'il enveloppe.
const conteneur = (view: RenderResult) => view.root?.queryAll(i => i.type === 'View')[0];

describe('Button', () => {
  it('expose un etat accessible desactive pendant le chargement', async () => {
    const { getByRole } = await renderNative(<Button variant="primary" title="Enregistrer" isLoading />);

    expect(getByRole('button').props.accessibilityState).toEqual(expect.objectContaining({ disabled: true }));
  });

  it('expose l etat deplie quand le bouton ouvre un menu', async () => {
    const { getByRole } = await renderNative(<Button variant="tertiary" title="Filtres" expanded />);

    expect(getByRole('button').props.accessibilityState).toEqual(expect.objectContaining({ expanded: true }));
  });

  // La taille est choisie par une chaine de ternaires imbriques sur `size`, dont aucune
  // branche n'etait observee : la couverture de branches de ce fichier etait a 46 %.
  // `md` est la taille par defaut et la seule dont le rembourrage soit une valeur litterale
  // dans les styles, ce qui en fait l'ancre : elle distingue une table juste d'une table
  // permutee, ce qu'une simple comparaison entre tailles ne ferait pas.
  it('applique le rembourrage de la taille md par defaut', async () => {
    const view = await renderNative(<Button variant="primary" title="Enregistrer" />);

    expect(conteneur(view)?.props.style.paddingTop).toBe(10);
  });

  it('applique le rembourrage de la taille sm', async () => {
    const view = await renderNative(<Button variant="primary" title="Enregistrer" size="sm" />);

    expect(conteneur(view)?.props.style.paddingTop).toBe(6); // spacing('1,5V')
  });

  it('applique le rembourrage de la taille lg', async () => {
    const view = await renderNative(<Button variant="primary" title="Enregistrer" size="lg" />);

    expect(conteneur(view)?.props.style.paddingTop).toBe(12); // spacing('3V')
  });

  // Sans `title`, le bouton passe en mode icone seule : la chaine de ternaires sur `size`
  // bascule sur une seconde famille de styles, qui pose un `padding` uniforme la ou le mode
  // avec libelle pose des rembourrages asymetriques.
  it('applique le rembourrage uniforme du mode icone seule', async () => {
    const view = await renderNative(<Button variant="primary" startIcon="Check" />);

    expect(conteneur(view)?.props.style.padding).toBe(8); // spacing('1W')
  });

  // Le design prevoyait qu'une icone resserre le rembourrage de son cote, 16 -> 12 en md.
  // Ca n'a jamais fonctionne : les styles d'icone etaient poses en tete de l'objet puis
  // ecrases par le style de taille, qui definit paddingLeft et paddingRight pour les quatre
  // tailles. Le code qui les choisissait a donc ete supprime plutot que recopie a
  // l'identique dans une table. Ce test fige l'apparence reelle, pas l'intention : la
  // corriger changerait tous les boutons a icone de toutes les applications, et releve du
  // design, pas du refactoring.
  it('garde le rembourrage de la taille quand une icone precede le libelle', async () => {
    const view = await renderNative(<Button variant="primary" title="Enregistrer" startIcon="Check" />);

    expect(conteneur(view)?.props.style.paddingLeft).toBe(16); // spacing('2W'), celui de mdContainer
  });

  it('applique le style d appui quand le menu est deplie', async () => {
    const repos = await renderNative(<Button variant="primary" title="Filtres" />);
    const deplie = await renderNative(<Button variant="primary" title="Filtres" expanded />);

    expect(conteneur(deplie)?.props.style.backgroundColor).not.toBe(conteneur(repos)?.props.style.backgroundColor);
  });

  // Les deux etats peuvent etre vrais ensemble, et `cleDEtat` tranche en faveur du desactive.
  // Sans ce test, inverser cette priorite ne casse rien : aucun autre test ne les combine, et
  // un bouton desactive prendrait alors l'apparence d'un bouton appuye, donc actionnable.
  it('garde l apparence desactivee quand un menu deplie est aussi desactive', async () => {
    const desactive = await renderNative(<Button variant="primary" title="Filtres" disabled />);
    const lesDeux = await renderNative(<Button variant="primary" title="Filtres" disabled expanded />);

    expect(conteneur(lesDeux)?.props.style.backgroundColor).toBe(conteneur(desactive)?.props.style.backgroundColor);
  });
});
