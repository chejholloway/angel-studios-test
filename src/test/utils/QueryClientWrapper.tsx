import type { ReactNode } from 'react'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '../../providers/queryClient'

export function QueryClientWrapper({ children }: { children: ReactNode }) {
  const testQueryClient = queryClient
  return (
    <QueryClientProvider client={testQueryClient}>
      {children}
    </QueryClientProvider>
  )
}
