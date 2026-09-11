export type CheckboxSize = 'sm' | 'md';

/** @deprecated use `size` ('sm' | 'md') instead */
export type CheckboxVariant = 'small' | 'medium';

export const resolveCheckboxSize = (size?: CheckboxSize, variant?: CheckboxVariant): CheckboxSize => {
  if (size) return size;
  if (variant === 'small') return 'sm';
  return 'md';
};
