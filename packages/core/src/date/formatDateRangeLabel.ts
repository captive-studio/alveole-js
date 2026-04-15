import { format, isValid } from 'date-fns';
import { getDateFnsLocale } from './displayDate';

export function formatDateRangeLabel(params: {
  startDate: Date;
  endDate: Date;
  localeCode: string;
  fromLabel: string;
  toLabel: string;
}): string {
  const { startDate, endDate, localeCode, fromLabel, toLabel } = params;

  if (!isValid(startDate) || !isValid(endDate)) return '';

  const sameMonthYear =
    startDate.getMonth() === endDate.getMonth() && startDate.getFullYear() === endDate.getFullYear();
  const sameYear = startDate.getFullYear() === endDate.getFullYear();

  const dateFnsLocale = getDateFnsLocale(localeCode);

  if (sameMonthYear) {
    return `${fromLabel} ${format(startDate, 'dd', { locale: dateFnsLocale })} ${toLabel} ${format(endDate, 'dd', {
      locale: dateFnsLocale,
    })} ${format(startDate, 'MMMM', { locale: dateFnsLocale })} ${format(startDate, 'yyyy', {
      locale: dateFnsLocale,
    })}`;
  }

  if (sameYear) {
    return `${fromLabel} ${format(startDate, 'dd MMM', { locale: dateFnsLocale })} ${toLabel} ${format(
      endDate,
      'dd MMM',
      { locale: dateFnsLocale },
    )} ${format(startDate, 'yyyy', { locale: dateFnsLocale })}`;
  }

  return `${fromLabel} ${format(startDate, 'dd MMM yyyy', { locale: dateFnsLocale })} ${toLabel} ${format(
    endDate,
    'dd MMM yyyy',
    { locale: dateFnsLocale },
  )}`;
}
