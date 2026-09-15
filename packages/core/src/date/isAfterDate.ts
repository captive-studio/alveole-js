import { isAfter } from 'date-fns/isAfter';
import { toDate } from 'date-fns/toDate';

/**
 * Vérifie si une date est après une date de référence.
 */
export function isAfterDate(value: string, referenceValue: string): boolean {
  return isAfter(toDate(value), toDate(referenceValue));
}
