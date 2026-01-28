import { DeepPartial } from '../constants';

/**
 * Merge des surchage de theme
 */
export function deepMerge<T extends object>(base: T, patch?: DeepPartial<T>): T {
  if (!patch) return base;
  const out: any = Array.isArray(base) ? [...base] : { ...base };
  for (const k in patch) {
    const pv = (patch as any)[k];
    const bv = (base as any)[k];
    out[k] =
      pv && typeof pv === 'object' && !Array.isArray(pv) && bv && typeof bv === 'object'
        ? deepMerge(bv, pv)
        : (pv ?? bv);
  }
  return out;
}
