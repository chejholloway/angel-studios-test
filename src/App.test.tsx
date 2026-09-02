import { describe, it, expect, beforeEach, beforeAll, afterEach, afterAll } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { setupServer } from 'msw/node'
import { http, HttpResponse } from 'msw'
import App from './App'
import { renderWithQueryClient } from './test/utils/testHelpers'
import { handlers } from './test/mocks/handlers'

const server = setupServer(...handlers)

describe('App', () => {
  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())

  beforeEach(() => {
    renderWithQueryClient(<App />)
  })

  describe('Initial Render', () => {
    it('should render header with title', () => {
      expect(screen.getByRole('heading', { name: /cat-alog/i })).toBeInTheDocument()
    })

    it('should render subtitle', () => {
      expect(screen.getByText(/your personal cat collection/i)).toBeInTheDocument()
    })

    it('should render cat controls section', () => {
      expect(screen.getByLabelText(/cat controls/i)).toBeInTheDocument()
    })

    it('should render get random cat button', () => {
      expect(
        screen.getByRole('button', { name: /get a random cat/i })
      ).toBeInTheDocument()
    })

    it('should render text input field', () => {
      expect(screen.getByLabelText(/add text to cat/i)).toBeInTheDocument()
      expect(screen.getByPlaceholderText(/enter text/i)).toBeInTheDocument()
    })

    it('should render tag selector', () => {
      expect(screen.getByLabelText(/filter by tag/i)).toBeInTheDocument()
    })

    it('should render empty collection message', () => {
      expect(screen.getByText(/no cats yet/i)).toBeInTheDocument()
    })

    it('should render footer', () => {
      expect(screen.getByText(/built with react, typescript, and tailwind css/i)).toBeInTheDocument()
    })

    it('should have skip to main content link', () => {
      const skipLink = screen.getByText(/skip to main content/i)
      expect(skipLink).toBeInTheDocument()
      expect(skipLink).toHaveClass('absolute')
    })
  })

  describe('Random Cat Feature', () => {
    it('should add cat to collection when get random cat button is clicked', async () => {
      const user = userEvent.setup()
      const button = screen.getByRole('button', { name: /get a random cat/i })

      await user.click(button)

      await waitFor(() => {
        expect(screen.getByText(/your collection \(1\)/i)).toBeInTheDocument()
      })

      expect(screen.queryByText(/no cats yet/i)).not.toBeInTheDocument()
    })

    it('should show cat image after fetching', async () => {
      const user = userEvent.setup()
      const button = screen.getByRole('button', { name: /get a random cat/i })

      await user.click(button)

      await waitFor(() => {
        const image = screen.getByAltText(/cat cat-123/i)
        expect(image).toBeInTheDocument()
      })
    })
  })

  describe('Text Overlay Feature', () => {
    it('should add cat with text when text is provided', async () => {
      const user = userEvent.setup()
      const input = screen.getByPlaceholderText(/enter text/i)
      const addButton = screen.getByRole('button', { name: /get cat with text/i })

      await user.type(input, 'hello')
      await user.click(addButton)

      await waitFor(() => {
        expect(screen.getByText(/your collection \(1\)/i)).toBeInTheDocument()
      })

      expect(input).toHaveValue('')
    })

    it('should not add cat when text is empty', async () => {
      const user = userEvent.setup()
      const addButton = screen.getByRole('button', { name: /get cat with text/i })

      await user.click(addButton)

      expect(screen.getByText(/no cats yet/i)).toBeInTheDocument()
    })

    it('should clear input after successful fetch', async () => {
      const user = userEvent.setup()
      const input = screen.getByPlaceholderText(/enter text/i)
      const addButton = screen.getByRole('button', { name: /get cat with text/i })

      await user.type(input, 'test')
      await user.click(addButton)

      await waitFor(() => {
        expect(input).toHaveValue('')
      })
    })
  })

  describe('Tag Filter Feature', () => {
    it('should load tags from API', async () => {
      await waitFor(() => {
        const select = screen.getByLabelText(/filter by tag/i)
        expect(select).toBeInTheDocument()
      })
    })

    it('should add cat when tag is selected and get button clicked', async () => {
      const user = userEvent.setup()

      await waitFor(() => {
        expect(screen.getByRole('option', { name: 'cute' })).toBeInTheDocument()
      })

      const select = screen.getByLabelText(/filter by tag/i)
      const getButton = screen.getByRole('button', { name: /get cat by tag/i })

      await user.selectOptions(select, 'cute')
      await user.click(getButton)

      await waitFor(() => {
        expect(screen.getByText(/your collection \(1\)/i)).toBeInTheDocument()
      })
    })

    it('should not add cat when no tag is selected', async () => {
      const user = userEvent.setup()
      const getButton = screen.getByRole('button', { name: /get cat by tag/i })

      await user.click(getButton)

      expect(screen.getByText(/no cats yet/i)).toBeInTheDocument()
    })
  })

  describe('Cat Collection Display', () => {
    it('should display collection count', async () => {
      const user = userEvent.setup()
      const button = screen.getByRole('button', { name: /get a random cat/i })

      await user.click(button)

      await waitFor(() => {
        expect(screen.getByText(/your collection \(1\)/i)).toBeInTheDocument()
      })
    })

    it('should display multiple cats in grid', async () => {
      const user = userEvent.setup()
      const button = screen.getByRole('button', { name: /get a random cat/i })

      await user.click(button)
      await user.click(button)
      await user.click(button)

      await waitFor(() => {
        expect(screen.getByText(/your collection \(3\)/i)).toBeInTheDocument()
      })

      const images = screen.getAllByRole('img')
      expect(images.length).toBe(3)
    })

    it('should have responsive grid classes', async () => {
      const user = userEvent.setup()
      const button = screen.getByRole('button', { name: /get a random cat/i })

      await user.click(button)

      await waitFor(() => {
        const grid = screen.getByRole('heading', { name: /your collection/i }).parentElement?.querySelector('.grid')
        expect(grid).toHaveClass('grid-cols-1', 'sm:grid-cols-2', 'md:grid-cols-3', 'lg:grid-cols-4')
      })
    })
  })

  describe('Detail View', () => {
    it('should show detail view when cat card is clicked', async () => {
      const user = userEvent.setup()
      const randomButton = screen.getByRole('button', { name: /get a random cat/i })

      await user.click(randomButton)

      await waitFor(async () => {
        const catCard = await screen.findByRole('button', { name: /view cat image/i })
        await user.click(catCard)
      })

      await waitFor(() => {
        expect(screen.getByText(/cat details/i)).toBeInTheDocument()
        expect(screen.getByRole('button', { name: /back to catalog/i })).toBeInTheDocument()
      })
    })

    it('should show cat ID in detail view', async () => {
      const user = userEvent.setup()
      const randomButton = screen.getByRole('button', { name: /get a random cat/i })

      await user.click(randomButton)

      await waitFor(async () => {
        const catCard = await screen.findByRole('button', { name: /view cat image/i })
        await user.click(catCard)
      })

      await waitFor(() => {
        expect(screen.getByText(/id: cat-123/i)).toBeInTheDocument()
      })
    })

    it('should show tags in detail view when available', async () => {
      const user = userEvent.setup()
      const randomButton = screen.getByRole('button', { name: /get a random cat/i })

      await user.click(randomButton)

      await waitFor(async () => {
        const catCard = await screen.findByRole('button', { name: /view cat image/i })
        await user.click(catCard)
      })

      await waitFor(() => {
        expect(screen.getByText('cute', { selector: 'span' })).toBeInTheDocument()
      })
    })

    it('should return to catalog when back button is clicked', async () => {
      const user = userEvent.setup()
      const randomButton = screen.getByRole('button', { name: /get a random cat/i })

      await user.click(randomButton)

      await waitFor(async () => {
        const catCard = await screen.findByRole('button', { name: /view cat image/i })
        await user.click(catCard)
      })

      await waitFor(async () => {
        const backButton = await screen.findByRole('button', { name: /back to catalog/i })
        await user.click(backButton)
      })

      await waitFor(() => {
        expect(screen.getByRole('heading', { name: /cat-alog/i })).toBeInTheDocument()
        expect(screen.queryByText(/cat details/i)).not.toBeInTheDocument()
      })
    })
  })

  describe('Accessibility', () => {
    it('should have proper heading hierarchy', () => {
      const headings = screen.getAllByRole('heading')
      expect(headings[0]).toHaveTextContent(/cat-alog/i)
    })

    it('should have accessible form labels', () => {
      expect(screen.getByLabelText(/add text to cat/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/filter by tag/i)).toBeInTheDocument()
    })

    it('should have aria-describedby for help text', () => {
      const textInput = screen.getByPlaceholderText(/enter text/i)
      expect(textInput).toHaveAttribute('aria-describedby', 'text-help')

      const tagSelect = screen.getByLabelText(/filter by tag/i)
      expect(tagSelect).toHaveAttribute('aria-describedby', 'tag-help')
    })

    it('should have accessible button labels', () => {
      expect(screen.getByRole('button', { name: /get a random cat/i })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /get cat with text/i })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /get cat by tag/i })).toBeInTheDocument()
    })
  })

  describe('Error Handling', () => {
    it('should handle API errors gracefully', async () => {
      server.use(
        http.get('https://cataas.com/cat', () => {
          return HttpResponse.error()
        })
      )

      const user = userEvent.setup()
      const button = screen.getByRole('button', { name: /get a random cat/i })

      await user.click(button)

      // Should not crash, just not add cat
      expect(screen.getByText(/no cats yet/i)).toBeInTheDocument()
    })
  })
})
