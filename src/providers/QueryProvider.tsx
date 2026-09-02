import {
  QueryClient,
  QueryClientProvider,
  HydrationBoundary,
  type HydrationBoundaryProps,
  type DehydratedState,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
})

interface QueryProviderProps {
  children: React.ReactNode
  state?: unknown
  dehydratedState?: HydrationBoundaryProps['state']
}

export function QueryProvider({ children, state, dehydratedState }: QueryProviderProps) {
  const boundaryState = dehydratedState ?? (state as DehydratedState | undefined)
  return (
    <QueryClientProvider client={queryClient}>
      {boundaryState ? (
        <HydrationBoundary state={boundaryState}>{children}</HydrationBoundary>
      ) : (
        children
      )}
      <ReactQueryDevtools initialIsOpen={false} position="bottom" />
    </QueryClientProvider>
  )
}
