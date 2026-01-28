import { SpacingKey, Spacings } from '../constants';

export const isSpacingKey = (value: unknown): value is SpacingKey =>
  typeof value === 'string' && Object.keys(Spacings).includes(value);
