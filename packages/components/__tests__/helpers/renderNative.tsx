import { render, RenderOptions } from '@testing-library/react-native';
import { ReactElement } from 'react';
import { TamaguiTestProvider } from './TamaguiTestProvider';

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: TamaguiTestProvider, ...options });

export * from '@testing-library/react-native';
export { customRender as renderNative };
