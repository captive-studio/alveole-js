import type { Locale } from 'date-fns';
import { format } from 'date-fns/format';
import { isValid } from 'date-fns/isValid';
import { enGB } from 'date-fns/locale/en-GB';
import { fr } from 'date-fns/locale/fr';
import { parseISO } from 'date-fns/parseISO';
import { DateFormats, type DateFormat } from './dateFormat';

/**
 * Retourne la locale date-fns à partir du code langue (ex: 'en', 'fr').
 * Défaut: enGB.
 */
export function getDateFnsLocale(localeCode?: string): Locale {
  if (localeCode?.startsWith('fr')) return fr;
  return enGB;
}

/**
 * Affiche une date au format français (ex: 22 juillet 2025).
 */
export function displayDate(
  date: string | Date | undefined,
  options?: { fallback?: string; format?: DateFormat; capitalize?: boolean; locale?: Locale },
): string {
  const defaultFormat = DateFormats.Date;
  const defaultLocale = enGB;
  const locale = options?.locale ?? defaultLocale;

  const d = typeof date === 'string' ? parseISO(date) : date;
  if (!d || !isValid(d)) return options?.fallback ?? '';

  let response = format(d, options?.format ?? defaultFormat, { locale: locale });

  if (options?.capitalize) response = response.charAt(0).toUpperCase() + response.slice(1);

  return response;
}

/**
 * Affiche une date au format français (ex: 22 juillet 2025).
 */
export function displayDatetime(date: string | Date, options?: { fallback?: string }): string {
  const defaultFormat = DateFormats.Datetime;

  const d = typeof date === 'string' ? parseISO(date) : date;
  if (!isValid(d)) return options?.fallback ?? '';

  return format(d, defaultFormat, { locale: enGB });
}
