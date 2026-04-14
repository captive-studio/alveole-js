export function formatSec(sec: number) {
  const minutes = Math.floor(sec / 60);
  const seconds = sec % 60;

  return `${String(minutes).padStart(2, '0')}:${String(Math.round(seconds)).padStart(2, '0')}`;
}
