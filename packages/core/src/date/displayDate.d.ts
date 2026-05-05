import { Locale } from 'date-fns';
import { type DateFormat } from './dateFormat';
/**
 * Retourne la locale date-fns à partir du code langue (ex: 'en', 'fr').
 * Défaut: enGB.
 */
export declare function getDateFnsLocale(localeCode?: string): Locale;
/**
 * Affiche une date au format français (ex: 22 juillet 2025).
 */
export declare function displayDate(
  date: string | Date | undefined,
  options?: {
    fallback?: string;
    format?: DateFormat;
    capitalize?: boolean;
    locale?: Locale;
  },
): string;
/**
 * Affiche une date au format français (ex: 22 juillet 2025).
 */
export declare function displayDatetime(
  date: string | Date,
  options?: {
    fallback?: string;
  },
): string;
//# sourceMappingURL=displayDate.d.ts.map
