export type TextInputArrayValue = { value: string; _original: string | null };

// Une ligne porte en plus un identifiant propre : deux lignes peuvent avoir la meme valeur, et
// sans cet identifiant React perdrait le champ en cours de saisie a chaque reordonnancement.
export type Item = TextInputArrayValue & { id: string };

export type OptionsDeSortie = { trim?: boolean; removeEmpty?: boolean; dedupe?: boolean };

// Une ligne vierge n'a pas de valeur d'origine : elle ne vient pas de la donnee chargee, donc
// rien ne peut en interdire la suppression.
const ligneVierge = (creeId: () => string): Item => ({ id: creeId(), value: '', _original: null });

export const insereUnElement = (items: Item[], creeId: () => string, apresLIndex?: number): Item[] => {
  const position =
    typeof apresLIndex === 'number' ? Math.max(0, Math.min(apresLIndex + 1, items.length)) : items.length;
  const suivants = [...items];
  suivants.splice(position, 0, ligneVierge(creeId));

  return suivants;
};

export const retireUnElement = (items: Item[], id: string, creeId: () => string): Item[] => {
  const restants = items.filter(item => item.id !== id);

  return restants.length ? restants : [ligneVierge(creeId)];
};

export const metAJourUnElement = (items: Item[], id: string, value: string): Item[] =>
  items.map(item => (item.id === id ? { ...item, value } : item));

/** Les valeurs dans leur ordre d'arrivee, la premiere occurrence de chacune seulement. */
const sansDoublons = (valeurs: TextInputArrayValue[]): TextInputArrayValue[] => {
  const vues = new Set<TextInputArrayValue['value']>();

  return valeurs.filter(({ value }) => {
    if (vues.has(value)) return false;

    vues.add(value);
    return true;
  });
};

// Ce que voit l'appelant n'est pas ce qu'affiche le champ : les identifiants internes tombent,
// et les lignes vides, les espaces de bord et les doublons se nettoient a la sortie.
export function normalizeOut(
  items: Item[],
  { trim = true, removeEmpty = true, dedupe = false }: OptionsDeSortie,
): TextInputArrayValue[] {
  let out: TextInputArrayValue[] = items.map(i => ({ value: trim ? i.value.trim() : i.value, _original: i._original }));

  if (removeEmpty) out = out.filter(v => v.value.trim().length > 0);

  if (dedupe) out = sansDoublons(out);

  return out;
}
