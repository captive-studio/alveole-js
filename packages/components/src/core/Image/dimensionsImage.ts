const DEFAULT_ASPECT_RATIO = 3 / 4;

type ContraintesDimensions = {
  fixedWidth?: number;
  fixedHeight?: number;
  maxWidthNumber?: number;
  maxHeightNumber?: number;
  dimensions: { width: number; height: number } | null;
};

type DimensionsResultat = {
  width?: number;
  height?: number;
  maxWidth?: number;
  maxHeight?: number;
};

const dimensionsAvantChargement = (contraintes: ContraintesDimensions): DimensionsResultat => {
  const { fixedWidth, fixedHeight, maxWidthNumber, maxHeightNumber } = contraintes;

  const width = fixedWidth ?? maxWidthNumber ?? (fixedHeight != null ? fixedHeight / DEFAULT_ASPECT_RATIO : undefined);
  const height =
    fixedHeight ??
    maxHeightNumber ??
    (fixedWidth != null || maxWidthNumber != null ? (fixedWidth ?? maxWidthNumber)! * DEFAULT_ASPECT_RATIO : undefined);

  return { width, height, maxWidth: maxWidthNumber, maxHeight: maxHeightNumber };
};

const dimensionsApresChargement = (
  contraintes: ContraintesDimensions & { dimensions: { width: number; height: number } },
): DimensionsResultat => {
  const { dimensions, fixedWidth, fixedHeight, maxWidthNumber, maxHeightNumber } = contraintes;

  let width = dimensions.width;
  let height = dimensions.height;

  if (maxWidthNumber != null && width > maxWidthNumber) {
    width = maxWidthNumber;
    if (fixedHeight == null) {
      height = width * (dimensions.height / dimensions.width);
    }
  }

  if (maxHeightNumber != null && height > maxHeightNumber) {
    height = maxHeightNumber;
    if (fixedWidth == null) {
      width = height * (dimensions.width / dimensions.height);
    }
  }

  return { width, height, maxWidth: maxWidthNumber, maxHeight: maxHeightNumber };
};

/**
 * Calcule les dimensions finales de l'image : mise a l'echelle proportionnelle sous contrainte
 * de maxWidth/maxHeight une fois les dimensions reelles connues, ou repli sur les valeurs fixes
 * (ou un ratio par defaut) avant chargement.
 */
export const dimensionsImage = (contraintes: ContraintesDimensions): DimensionsResultat => {
  const { dimensions } = contraintes;
  return dimensions
    ? dimensionsApresChargement({ ...contraintes, dimensions })
    : dimensionsAvantChargement(contraintes);
};
