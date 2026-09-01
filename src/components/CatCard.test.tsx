import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { CatCard } from './CatCard'
import type { CatImage } from '../services/catApi'

describe('CatCard', () => {
  const mockCat: CatImage = {
    id: 'cat-123',
    url: 'https://cataas.com/cat/cat-123',
    tags: ['cute', 'fluffy'],
  }

  const mockOnClick = vi.fn()

  beforeEach(() => {
    mockOnClick.mockClear()
  })

  it('should render cat image', () => {
    render(<CatCard cat={mockCat} onClick={mockOnClick} />)

    const image = screen.getByAltText('Cat cat-123')
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src', mockCat.url)
  })

  it('should render tags when provided', () => {
    const { container } = render(<CatCard cat={mockCat} onClick={mockOnClick} />)

    // Tags are in DOM but hidden until hover
    expect(container.textContent).toContain('cute')
    expect(container.textContent).toContain('fluffy')
  })

  it('should not render tags when not provided', () => {
    const catWithoutTags: CatImage = {
      id: 'cat-456',
      url: 'https://cataas.com/cat/cat-456',
    }

    const { container } = render(<CatCard cat={catWithoutTags} onClick={mockOnClick} />)

    const tagElement = container.querySelector('.absolute.bottom-0')
    expect(tagElement).not.toBeInTheDocument()
  })

  it('should call onClick when clicked', async () => {
    const user = userEvent.setup()
    render(<CatCard cat={mockCat} onClick={mockOnClick} />)

    const card = screen.getByRole('button', { name: /view cat image cat-123/i })
    await user.click(card)

    expect(mockOnClick).toHaveBeenCalledTimes(1)
  })

  it('should call onClick when Enter key is pressed', async () => {
    const user = userEvent.setup()
    render(<CatCard cat={mockCat} onClick={mockOnClick} />)

    const card = screen.getByRole('button', { name: /view cat image cat-123/i })
    card.focus()
    await user.keyboard('{Enter}')

    expect(mockOnClick).toHaveBeenCalledTimes(1)
  })

  it('should call onClick when Space key is pressed', async () => {
    const user = userEvent.setup()
    render(<CatCard cat={mockCat} onClick={mockOnClick} />)

    const card = screen.getByRole('button', { name: /view cat image cat-123/i })
    card.focus()
    await user.keyboard(' ')

    expect(mockOnClick).toHaveBeenCalledTimes(1)
  })

  it('should have proper ARIA attributes', () => {
    render(<CatCard cat={mockCat} onClick={mockOnClick} />)

    const card = screen.getByRole('button', { name: /view cat image cat-123/i })
    expect(card).toHaveAttribute('role', 'button')
    expect(card).toHaveAttribute('tabIndex', '0')
  })

  it('should apply hover classes for visual feedback', () => {
    const { container } = render(<CatCard cat={mockCat} onClick={mockOnClick} />)

    const card = container.querySelector('article')
    expect(card).toHaveClass('group')
  })

  it('should load image lazily', () => {
    render(<CatCard cat={mockCat} onClick={mockOnClick} />)

    const image = screen.getByAltText('Cat cat-123')
    expect(image).toHaveAttribute('loading', 'lazy')
  })
})
