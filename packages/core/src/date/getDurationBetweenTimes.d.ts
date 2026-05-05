/**
 * Déduit la durée d'une période en heures au format time
 * @param start Format time (ex : "00:00")
 * @param end Format time (ex : "00:00")
 * @returns Format time (ex : "00:00")
 */
export declare const getDurationBetweenTimes: (
  start?: string | null,
  end?: string | null,
  options?: {
    defaultValue?: string;
    allowNull?: boolean;
  },
) => string | undefined;
//# sourceMappingURL=getDurationBetweenTimes.d.ts.map
