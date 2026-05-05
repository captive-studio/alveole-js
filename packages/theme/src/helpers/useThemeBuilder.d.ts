import { DeepPartial, Palette } from '../constants';
import type { Theme } from '../type';
export type CustomBuilder = {
  color?: DeepPartial<Palette>;
};
export declare function useThemeBuilder(params: CustomBuilder): Theme & {
  isReady: boolean;
};
//# sourceMappingURL=useThemeBuilder.d.ts.map
