import { Popover } from '../Popover';
import { FilterTimeRangeProps, useFilterTimeRange } from './FilterTimeRange.shared';
export type { FilterTimeRangeProps } from './FilterTimeRange.shared';

/** Filtre sur une plage de temps : plages relatives prédéfinies ou saisies, ou plage absolue au calendrier. */
export const FilterTimeRange = (props: FilterTimeRangeProps) => {
  const { open, changerOuverture, declencheur, contenu } = useFilterTimeRange(props);

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
