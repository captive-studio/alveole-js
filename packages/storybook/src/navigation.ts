export type RubriqueRoute = {
  key: string;
  href: string;
};

export const findCurrentRubriqueKey = (rubriques: RubriqueRoute[], pathname: string) =>
  rubriques
    .filter(rubrique => pathname.startsWith(rubrique.href))
    .sort((left, right) => right.href.length - left.href.length)[0]?.key;
