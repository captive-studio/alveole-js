import { isSpacingKey, SpacingKey, Spacings } from '@alveole/theme';

type SpacingInput = number | SpacingKey | `${string}%` | 'auto' | undefined;
type SpacingOutput = number | `${string}%` | 'auto' | undefined;

export const resolveSpacing = (value: SpacingInput): SpacingOutput => (isSpacingKey(value) ? Spacings[value] : value);
