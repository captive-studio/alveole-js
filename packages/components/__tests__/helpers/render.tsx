import { config } from '@tamagui/config/v3';
import { render, RenderOptions } from '@testing-library/react-native';
import { PropsWithChildren, ReactElement } from 'react';
import { createTamagui, TamaguiProvider } from 'tamagui';

const tamaguiConfig = createTamagui(config);

const TestProvider = ({ children }: PropsWithChildren) => {
  return <TamaguiProvider config={tamaguiConfig}>{children}</TamaguiProvider>;
};

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) => {
  const renderer = render(ui, { wrapper: TestProvider, ...options });
  return {
    ...renderer,
    getAllByProps: renderer.UNSAFE_getAllByProps,
    getAllByType: renderer.UNSAFE_getAllByType,
    queryAllByProps: renderer.UNSAFE_queryAllByProps,
    queryAllByType: renderer.UNSAFE_queryAllByType,

    getByProps: renderer.UNSAFE_getByProps,
    getByType: renderer.UNSAFE_getByType,
    queryByProps: renderer.UNSAFE_queryByProps,
    queryByType: renderer.UNSAFE_queryByType,
  };
};

export * from '@testing-library/react-native';
export { customRender as render };
