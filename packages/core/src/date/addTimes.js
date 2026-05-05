/**
 * Additionne deux durées au format time
 * @param a Format time (ex : "01:30")
 * @param b Format time (ex : "02:45")
 * @returns Format time (ex : "04:15")
 */
export const addTimes = (a, b, options) => {
  const { defaultValue } = options || {};
  if (a == null && b != null) return b;
  if (b == null && a != null) return a;
  if (a == null || b == null) return defaultValue ?? '00:00';
  const toMinutes = timeStr => {
    const [h, m] = timeStr.split(':').map(Number);
    return h * 60 + m;
  };
  const totalMinutes = toMinutes(a) + toMinutes(b);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  const hoursStr = String(hours).padStart(2, '0');
  const minutesStr = String(minutes).padStart(2, '0');
  return `${hoursStr}:${minutesStr}`;
};
