import { ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// Test factory for creating QueryClient
export const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        staleTime: Infinity,
      },
    },
  })

// Wrapper for components that need QueryClient
export function withQueryClient(ui: ReactElement) {
  const testQueryClient = createTestQueryClient()
  return (
    <QueryClientProvider client={testQueryClient}>
      {ui}
    </QueryClientProvider>
  )
}

// Custom render function with QueryClient
export function renderWithQueryClient(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) {
  return render(ui, { ...options, wrapper: withQueryClient })
}

// Mock cat data factory
export const mockCat = (overrides = {}) => ({
  id: 'cat-123',
  url: 'https://cataas.com/cat/cat-123',
  tags: ['cute', 'fluffy'],
  ...overrides,
})

// Mock cat collection factory
export const mockCatCollection = (count = 3) =>
  Array.from({ length: count }, (_, i) =>
    mockCat({
      id: `cat-${i}`,
      url: `https://cataas.com/cat/cat-${i}`,
      tags: [`tag-${i}`],
    })
  )
