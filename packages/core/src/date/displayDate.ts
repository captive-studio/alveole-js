import type { Locale } from 'date-fns';
import { format } from 'date-fns/format';
import { isValid } from 'date-fns/isValid';
import { enGB } from 'date-fns/locale/en-GB';
import { fr } from 'date-fns/locale/fr';
import { parseISO } from 'date-fns/parseISO';
import { DateFormats, type DateFormat } from './dateFormat';

type DisplayDateOptions = {
  fallback?: string;
  format?: DateFormat;
  capitalize?: boolean;
  locale?: Locale;
};

/**
 * Retourne la locale date-fns à partir du code langue (ex: 'en', 'fr').
 * Défaut: enGB.
 */
export function getDateFnsLocale(localeCode?: string): Locale {
  if (localeCode?.startsWith('fr')) return fr;
  return enGB;
}

/**
 * Normalise l'entrée en une date exploitable, ou `undefined` si elle est absente ou invalide.
 */
function toValidDate(date: string | Date | undefined): Date | undefined {
  const parsed = typeof date === 'string' ? parseISO(date) : date;
  if (!parsed || !isValid(parsed)) return undefined;
  return parsed;
}

function capitaliser(texte: string): string {
  return texte.charAt(0).toUpperCase() + texte.slice(1);
}

/**
 * Affiche une date au format demandé (ex: 22 juillet 2025).
 */
export function displayDate(date: string | Date | undefined, options: DisplayDateOptions = {}): string {
  const { fallback = '', format: dateFormat = DateFormats.Date, capitalize = false, locale = enGB } = options;

  const parsed = toValidDate(date);
  if (!parsed) return fallback;

  const formatted = format(parsed, dateFormat, { locale });

  return capitalize ? capitaliser(formatted) : formatted;
}

/**
 * Affiche une date avec son heure (ex: 22 juillet 2025 à 15:30).
 */
export function displayDatetime(date: string | Date, options?: { fallback?: string }): string {
  return displayDate(date, { fallback: options?.fallback, format: DateFormats.Datetime });
}
