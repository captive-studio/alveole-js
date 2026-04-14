import { isValid, parseISO } from 'date-fns';

/**
 * Vérifie si une valeur est une date valide (string ISO ou Date).
 */
export function isValidDate(value: unknown): value is string | Date {
  if (typeof value === 'string') {
    const trimmedValue = value.trim();
    if (!trimmedValue) return false; // Vérifie les chaînes vides

    // Vérification avec regex pour le format ISO 8601
    const isoFormat = /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}(?:\.\d{1,3})?([+-]\d{2}:\d{2}|Z)?)?$/; // Format ISO complet
    const partialIsoFormat = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/; // Format ISO partiel
    const standardDateFormat = /^\d{4}-\d{2}-\d{2}$/; // Format YYYY-MM-DD

    // Validation pour un format ISO complet
    if (isoFormat.test(trimmedValue)) {
      const parsedIsoDate = parseISO(trimmedValue);
      return isValid(parsedIsoDate); // Vérifie si la date est valide après parsing
    }

    // Validation pour format ISO partiel
    if (partialIsoFormat.test(trimmedValue)) {
      const parsedPartialDate = new Date(trimmedValue);
      return isValid(parsedPartialDate); // Vérifie si le format partiel est une date valide
    }

    // Validation pour format YYYY-MM-DD
    if (standardDateFormat.test(trimmedValue)) {
      const parsedStandardDate = new Date(trimmedValue);
      return isValid(parsedStandardDate); // Vérifie si le format YYYY-MM-DD est une date valide
    }

    return false; // La chaîne n'est pas un format valide
  }

  if (value instanceof Date) {
    return isValid(value); // Vérifie si l'objet Date est valide
  }

  return false; // Cadre de type non valide
}
