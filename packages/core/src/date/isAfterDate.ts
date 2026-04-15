import { isAfter, toDate } from 'date-fns';

/**
 * Vérifie si une date est après une date de référence.
 */
export function isAfterDate(value: string, referenceValue: string): boolean {
  return isAfter(toDate(value), toDate(referenceValue));
}
