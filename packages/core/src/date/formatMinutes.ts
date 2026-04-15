export function formatMinutes(min: number, fallback?: string) {
  const heures = Math.floor(min / 60);
  const minutes = min % 60;
  if (minutes <= 0 && heures <= 0) return fallback ?? `Vide`;

  const heuresText = heures > 0 ? `${heures} heure${heures > 1 ? 's' : ''}` : undefined;
  const minutesText = minutes > 0 ? `${minutes} minute${minutes > 1 ? 's' : ''}` : undefined;
  const fullText = `${heuresText ?? ''}${minutesText && heuresText ? ' et ' : ''}${minutesText ?? ''}`;
  return `${fullText}`;
}
