export declare const DateFormats: {
  readonly DatetimeFull: 'iiii d MMMM yyyy à HH:mm';
  readonly Datetime: 'd MMMM yyyy à HH:mm';
  readonly DatetimeShort: 'd MMMM à HH:mm';
  readonly Date: 'd MMMM yyyy';
  readonly DaySlashShort: 'eeee dd/MM/yy';
  readonly DateSlash: 'dd/MM/yyyy';
  readonly DateString: 'yyyy-MM-dd';
  readonly DateFull: 'iiii d MMMM yyyy';
  readonly DateFullAlt: 'iii d MMM yyyy';
  readonly DateTimeString: "yyyy-MM-dd'T'HH:mm";
  readonly Time: 'HH:mm';
  readonly MonthString: 'yyyy-MM';
  readonly MonthAndYear: 'MMMM yy';
  readonly MonthAndYearFull: 'MMMM yyyy';
  readonly Month: 'MMMM';
  readonly DateTimeFR: 'd MMMM yyyy à HH:mm';
  readonly DateTimeEN: 'd MMMM yyyy at HH:mm';
};
export type DateFormat = (typeof DateFormats)[keyof typeof DateFormats];
export declare const isDateFormat: (value: unknown) => value is DateFormat;
//# sourceMappingURL=dateFormat.d.ts.map
