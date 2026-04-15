export const dateFormats = {
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
export type dateFormat = (typeof dateFormats)[keyof typeof dateFormats];

export const isDateFormat = (value: unknown): value is dateFormat =>
  value != null && Object.values(dateFormats).includes(value as any);
