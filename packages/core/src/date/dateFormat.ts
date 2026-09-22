export const DateFormats = {
  DatetimeFull: 'iiii d MMMM yyyy à HH:mm',
  Datetime: 'd MMMM yyyy à HH:mm',
  DatetimeShort: 'd MMMM à HH:mm',
  Date: 'd MMMM yyyy',
  DaySlashShort: 'eeee dd/MM/yy',
  DateSlash: 'dd/MM/yyyy',
  DateString: 'yyyy-MM-dd',
  DateFull: 'iiii d MMMM yyyy',
  DateFullAlt: 'iii d MMM yyyy',
  DateTimeString: "yyyy-MM-dd'T'HH:mm",
  Time: 'HH:mm',
  MonthString: 'yyyy-MM',
  MonthAndYear: 'MMMM yy',
  MonthAndYearFull: 'MMMM yyyy',
  Month: 'MMMM',
  DateTimeFR: 'd MMMM yyyy à HH:mm',
  DateTimeEN: 'd MMMM yyyy at HH:mm',
} as const;

export type DateFormat = (typeof DateFormats)[keyof typeof DateFormats];

// `includes` refuse un `unknown` parce qu'il attend un element du tableau : c'est le tableau
// qu'on elargit, pas la valeur qu'on ment. `as any` eteignait la verification des deux cotes,
// et aurait laisse passer un appel sur un tout autre catalogue.
const FORMATS: readonly unknown[] = Object.values(DateFormats);

export const isDateFormat = (value: unknown): value is DateFormat => value != null && FORMATS.includes(value);
