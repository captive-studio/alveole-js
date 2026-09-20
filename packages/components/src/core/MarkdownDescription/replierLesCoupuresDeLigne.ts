type NoeudMarkdown = { type: string; value?: string; children?: NoeudMarkdown[] };

const replier = (noeud: NoeudMarkdown): void => {
  if (noeud.type === 'text' && noeud.value) noeud.value = noeud.value.replace(/\n/g, ' ');
  noeud.children?.forEach(replier);
};

/**
 * Rend aux coupures de ligne le sens qu'elles ont en Markdown : une phrase coupee sur deux
 * lignes source reste une seule phrase.
 *
 * Sur le web, le texte d'une description finit dans un `Text` de react-native-web, qui preserve
 * `\n` la ou HTML l'aurait replie. Une description ecrite dans un JSDoc - donc coupee a la
 * largeur du fichier - s'affichait coupee aux memes endroits a l'ecran, dans toutes les fiches
 * du catalogue.
 *
 * Seuls les noeuds `text` sont touches : le contenu d'un bloc de code vit dans un noeud `code`
 * ou `inlineCode`, hors d'atteinte par construction, et une vraie coupure demandee par l'auteur
 * (deux espaces en fin de ligne) devient un noeud `break`, qui n'est pas du texte non plus.
 */
export const replierLesCoupuresDeLigne = () => replier;
