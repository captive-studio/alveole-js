// Repère principal de la page : sans lui, tout le contenu des fiches est hors repère et
// un lecteur d'écran ne peut pas sauter directement au contenu. `tag` n'a pas d'effet sur
// natif. Une <section> sans nom accessible n'est pas un repère, d'où le choix de <main>.
export const screenContent = {
  tag: 'main',
  display: 'flex',
  gap: 24,
  pt: '150',
  pb: '150',
} as const;
