// Repos et survol sur la meme prop (ADR 0031, consequences).

/** Lien souligne au repos, qui perd son soulignement au survol. */
export const soulignementDuLien = { default: 'underline', hover: 'none' } as const;

/** Lien sans soulignement au repos, qui le gagne au survol. */
export const soulignementAuSurvol = { default: 'none', hover: 'underline' } as const;
