import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode, ReactElement } from "react";
import { render } from "@testing-library/react";

/**
 * Creates a fresh QueryClient (no retry, no staleTime-bound queries) for tests.
 * Pass to `renderWithQuery` or use standalone in `renderHook` calls.
 */
export function createTestQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: { retry: false, gcTime: 0, staleTime: 0 },
      mutations: { retry: false },
    },
  });
}

/**
 * Render a React element wrapped in a fresh QueryClientProvider so hooks
 * using @tanstack/react-query work. Returns whatever `render` returns.
 */
export function renderWithQuery(ui: ReactNode): {
  queryClient: QueryClient;
  renderResult: ReturnType<typeof render>;
} {
  const queryClient = createTestQueryClient();
  const renderResult = render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>,
  );
  return { queryClient, renderResult };
}

/**
 * Wrapper React component for use with renderHook's `wrapper` option.
 */
export function makeQueryWrapper(): {
  queryClient: QueryClient;
  wrapper: ({ children }: { children: ReactNode }) => ReactElement;
} {
  const queryClient = createTestQueryClient();
  const wrapper = ({ children }: { children: ReactNode }): ReactElement => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
  return { queryClient, wrapper };
}
