import { isBefore, toDate } from 'date-fns';

/**
 * Vérifie si une date est avant une date de référence.
 */
export function isBeforeDate(value: string, referenceValue: string): boolean {
  return isBefore(toDate(value), toDate(referenceValue));
}
