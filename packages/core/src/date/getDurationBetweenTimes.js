import { differenceInMinutes, parse } from 'date-fns';
const parseTime = time => parse(time, 'HH:mm', new Date(0));
/**
 * Déduit la durée d'une période en heures au format time
 * @param start Format time (ex : "00:00")
 * @param end Format time (ex : "00:00")
 * @returns Format time (ex : "00:00")
 */
export const getDurationBetweenTimes = (start, end, options) => {
  const { defaultValue, allowNull } = options || { allowNull: true };
  if (start == null || end == null) return allowNull ? (defaultValue ?? '00:00') : undefined;
  const minutes = differenceInMinutes(parseTime(end), parseTime(start));
  if (minutes <= 0) return defaultValue ?? '00:00';
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  const hoursStr = String(hours).padStart(2, '0');
  const minutesStr = String(remainingMinutes).padStart(2, '0');
  return `${hoursStr}:${minutesStr}`;
};
