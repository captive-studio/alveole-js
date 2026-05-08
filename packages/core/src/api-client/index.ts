import { createClient } from './createClient';
import { createQueryClient } from './createQueryClient';
import { queryClient } from './queryClient';

export * from './auth';
export { createQueryClient, queryClient };

export const apiClient = createClient();
