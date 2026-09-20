const pluralise = (nombre: number, unite: string) => `${nombre} ${unite}${nombre > 1 ? 's' : ''}`;

export function formatMinutes(min: number, fallback?: string) {
  const heures = Math.floor(min / 60);
  const minutes = min % 60;

  const segments: string[] = [];
  if (heures > 0) segments.push(pluralise(heures, 'heure'));
  if (minutes > 0) segments.push(pluralise(minutes, 'minute'));

  if (segments.length === 0) return fallback ?? 'Vide';

  return segments.join(' et ');
}
