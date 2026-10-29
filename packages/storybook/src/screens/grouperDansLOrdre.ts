/** Les elements ranges par cle, les groupes dans l'ordre ou leur premier element apparait. */
export function grouperDansLOrdre<T>(elements: T[], cleDe: (element: T) => string): [string, T[]][] {
  const groupes = new Map<string, T[]>();
  for (const element of elements) groupes.set(cleDe(element), [...(groupes.get(cleDe(element)) ?? []), element]);
  return [...groupes];
}
