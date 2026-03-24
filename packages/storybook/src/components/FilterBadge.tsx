import { Badge, Box } from '@alveole/components';
import { Pressable } from 'react-native';

export type FilterBadgeProps = {
  active: boolean;
  label: string;
  onPress: () => void;
};

export const FilterBadge = ({ active, label, onPress }: FilterBadgeProps) => (
  <Pressable onPress={onPress}>
    <Box>
      <Badge variant={active ? 'new' : 'default'} size="sm">
        {label}
      </Badge>
    </Box>
  </Pressable>
);
