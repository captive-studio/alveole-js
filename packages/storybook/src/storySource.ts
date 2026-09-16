export type SourceDecoupee = {
  /** Ce qui est affiché tant que la source est repliée. */
  visible: string;
  tronque: boolean;
};

export const decouperSource = (source: string, lignes: number): SourceDecoupee => {
  const toutes = source.split('\n');

  return {
    visible: toutes.slice(0, lignes).join('\n'),
    tronque: toutes.length > lignes,
  };
};
