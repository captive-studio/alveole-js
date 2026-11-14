import React from 'react';
import { BottomSheet } from '../BottomSheet';
import { FilterTimeRangeProps, useFilterTimeRange } from './FilterTimeRange.shared';

export type { FilterTimeRangeProps } from './FilterTimeRange.shared';

/** Sur mobile, le choix s'ouvre en BottomSheet plutôt qu'en Popover, comme Select et FilterDate. */
export const FilterTimeRange = (props: FilterTimeRangeProps) => {
  const { open, changerOuverture, declencheur, contenu } = useFilterTimeRange(props);

  return (
    <React.Fragment>
      {declencheur}
      <BottomSheet fitContent title={props.title} open={open} setOpen={changerOuverture}>
        {contenu()}
      </BottomSheet>
    </React.Fragment>
  );
};
