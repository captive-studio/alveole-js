import { config } from '@tamagui/config/v3';
import { render, RenderOptions } from '@testing-library/react-native';
import { PropsWithChildren, ReactElement } from 'react';
import { createTamagui, TamaguiProvider } from 'tamagui';

const tamaguiConfig = createTamagui(config);

const TestProvider = ({ children }: PropsWithChildren) => {
  return <TamaguiProvider config={tamaguiConfig}>{children}</TamaguiProvider>;
};

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: TestProvider, ...options });

export * from '@testing-library/react-native';
export { customRender as renderNative };
