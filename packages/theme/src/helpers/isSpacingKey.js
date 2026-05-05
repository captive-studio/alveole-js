import { Spacings } from '../constants';
export const isSpacingKey = value => typeof value === 'string' && Object.keys(Spacings).includes(value);
