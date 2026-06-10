import { focusManager, QueryClient } from '@tanstack/react-query';
import { AppState } from 'react-native';

focusManager.setEventListener(handleFocus => {
  const sub = AppState.addEventListener('change', state => handleFocus(state === 'active'));
  return () => sub.remove();
});

export const createQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: 0,
        refetchOnWindowFocus: false,
        staleTime: 30_000,
      },
      mutations: { retry: 0 },
    },
  });
};
