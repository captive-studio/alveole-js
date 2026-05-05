/**
 * Merge des surchage de theme
 */
export function deepMerge(base, patch) {
  if (!patch) return base;
  const out = Array.isArray(base) ? [...base] : { ...base };
  for (const k in patch) {
    const pv = patch[k];
    const bv = base[k];
    out[k] =
      pv && typeof pv === 'object' && !Array.isArray(pv) && bv && typeof bv === 'object'
        ? deepMerge(bv, pv)
        : (pv ?? bv);
  }
  return out;
}
