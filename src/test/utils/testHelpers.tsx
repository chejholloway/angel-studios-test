import type { ReactElement } from 'react'
import { render, type RenderOptions } from '@testing-library/react'
import { QueryClientWrapper } from './QueryClientWrapper'

export function renderWithQueryClient(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) {
  return render(ui, { ...options, wrapper: QueryClientWrapper })
}

export const mockCat = (overrides: Partial<Record<string, unknown>> = {}) => ({
  id: 'cat-123',
  url: 'https://cataas.com/cat/cat-123',
  tags: ['cute', 'fluffy'],
  ...overrides,
})

export const mockCatCollection = (count = 3) =>
  Array.from({ length: count }, (_, i) =>
    mockCat({
      id: `cat-${i}`,
      url: `https://cataas.com/cat/cat-${i}`,
      tags: [`tag-${i}`],
    }),
  )
