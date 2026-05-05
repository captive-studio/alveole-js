import { format, isValid, parseISO } from 'date-fns';
import { enGB, fr } from 'date-fns/locale';
import { DateFormats } from './dateFormat';
/**
 * Retourne la locale date-fns à partir du code langue (ex: 'en', 'fr').
 * Défaut: enGB.
 */
export function getDateFnsLocale(localeCode) {
  if (localeCode?.startsWith('fr')) return fr;
  return enGB;
}
/**
 * Affiche une date au format français (ex: 22 juillet 2025).
 */
export function displayDate(date, options) {
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
export function displayDatetime(date, options) {
  const defaultFormat = DateFormats.Datetime;
  const d = typeof date === 'string' ? parseISO(date) : date;
  if (!isValid(d)) return options?.fallback ?? '';
  return format(d, defaultFormat, { locale: enGB });
}
