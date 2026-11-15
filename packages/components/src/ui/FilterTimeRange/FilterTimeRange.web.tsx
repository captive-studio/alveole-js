import { useTheme } from '@alveole/theme';
import React from 'react';
import { BottomSheet } from '../BottomSheet';
import { Popover } from '../Popover';
import { FilterTimeRangeProps, useFilterTimeRange } from './FilterTimeRange.shared';
export type { FilterTimeRangeProps } from './FilterTimeRange.shared';

/**
 * Filtre sur une plage de temps : plages relatives prédéfinies ou saisies, ou plage absolue au calendrier.
 * Sur un écran mobile, le choix s'ouvre en BottomSheet : un Popover y déborde de l'écran sans défiler.
 */
export const FilterTimeRange = (props: FilterTimeRangeProps) => {
  const { open, changerOuverture, declencheur, contenu } = useFilterTimeRange(props);
  const { isVariant } = useTheme();

  if (isVariant('mobile')) {
    return (
      <React.Fragment>
        {declencheur}
        <BottomSheet fitContent title={props.title} open={open} setOpen={changerOuverture}>
          {contenu()}
        </BottomSheet>
      </React.Fragment>
    );
  }

  return (
    <Popover
      placement="bottom-start"
      scrollable={false}
      open={open}
      setOpen={changerOuverture}
      renderTrigger={() => declencheur}
    >
      {contenu(props.title)}
    </Popover>
  );
};
