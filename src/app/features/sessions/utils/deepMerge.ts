// src/features/sessions/utils/deepMerge.ts
export function deepMerge<T>(target: T, ...sources: any[]): T {
  for (const src of sources) {
    if (!src) continue;
    for (const key of Object.keys(src)) {
      const v = (src as any)[key];
      if (v && typeof v === 'object' && !Array.isArray(v)) {
        (target as any)[key] = deepMerge((target as any)[key] ?? {}, v);
      } else {
        (target as any)[key] = v;
      }
    }
  }
  return target;
}
