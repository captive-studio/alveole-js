/** Vrai pour un objet indexable par chaine (ni `null`, ni primitive, ni tableau ecarte a l'usage). */
export const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;
