import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { getRandomCat, getCatWithText, getCatByTag, getAvailableTags } from './catApi'

// Mock fetch globally
const mockFetch = vi.fn()
global.fetch = mockFetch

describe('catApi', () => {
  beforeEach(() => {
    mockFetch.mockClear()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('getRandomCat', () => {
    it('should fetch a random cat successfully with relative URL', async () => {
      const mockResponse = {
        _id: 'cat-123',
        url: '/cat/cat-123',
        tags: ['cute', 'fluffy'],
      }

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      })

      const result = await getRandomCat()

      expect(result).toEqual({
        id: 'cat-123',
        url: 'https://cataas.com/cat/cat-123',
        tags: ['cute', 'fluffy'],
      })
      expect(mockFetch).toHaveBeenCalledWith('https://cataas.com/cat?json=true')
    })

    it('should handle absolute URLs from API', async () => {
      const mockResponse = {
        _id: 'cat-456',
        url: 'https://cataas.com/cat/cat-456',
        tags: ['cute'],
      }

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      })

      const result = await getRandomCat()

      expect(result).toEqual({
        id: 'cat-456',
        url: 'https://cataas.com/cat/cat-456',
        tags: ['cute'],
      })
    })

    it('should throw error when fetch fails', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
      })

      await expect(getRandomCat()).rejects.toThrow('Failed to fetch cat')
    })

    it('should handle missing _id by using timestamp', async () => {
      const mockResponse = {
        url: '/cat/some-cat',
        tags: [],
      }

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      })

      const result = await getRandomCat()

      expect(result.id).toBeDefined()
      expect(typeof result.id).toBe('string')
    })
  })

  describe('getCatWithText', () => {
    it('should fetch cat with text overlay and relative URL', async () => {
      const mockResponse = {
        _id: 'cat-456',
        url: '/cat/hello',
        tags: ['cute'],
      }

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      })

      const result = await getCatWithText('hello')

      expect(result).toEqual({
        id: 'cat-456',
        url: 'https://cataas.com/cat/hello',
        tags: ['cute'],
      })
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('https://cataas.com/cat/hello')
      )
    })

    it('should handle absolute URLs from API', async () => {
      const mockResponse = {
        _id: 'cat-789',
        url: 'https://cataas.com/cat/world',
        tags: [],
      }

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      })

      const result = await getCatWithText('world')

      expect(result).toEqual({
        id: 'cat-789',
        url: 'https://cataas.com/cat/world',
        tags: [],
      })
    })

    it('should encode text properly', async () => {
      const mockResponse = {
        _id: 'cat-101',
        url: '/cat/hello%20world',
        tags: [],
      }

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      })

      await getCatWithText('hello world')

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('hello%20world')
      )
    })
  })

  describe('getCatByTag', () => {
    it('should fetch cat by tag with relative URL', async () => {
      const mockResponse = {
        _id: 'cat-101',
        url: '/cat/cute',
        tags: ['cute'],
      }

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      })

      const result = await getCatByTag('cute')

      expect(result).toEqual({
        id: 'cat-101',
        url: 'https://cataas.com/cat/cute',
        tags: ['cute'],
      })
      expect(mockFetch).toHaveBeenCalledWith(
        'https://cataas.com/cat/cute?json=true'
      )
    })

    it('should handle absolute URLs from API', async () => {
      const mockResponse = {
        _id: 'cat-202',
        url: 'https://cataas.com/cat/fluffy',
        tags: ['fluffy'],
      }

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      })

      const result = await getCatByTag('fluffy')

      expect(result).toEqual({
        id: 'cat-202',
        url: 'https://cataas.com/cat/fluffy',
        tags: ['fluffy'],
      })
    })

    it('should throw error when fetch fails', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
      })

      await expect(getCatByTag('cute')).rejects.toThrow('Failed to fetch cat by tag')
    })
  })

  describe('getAvailableTags', () => {
    it('should fetch available tags', async () => {
      const mockTags = ['cute', 'fluffy', 'funny']

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockTags,
      })

      const result = await getAvailableTags()

      expect(result).toEqual(mockTags)
      expect(mockFetch).toHaveBeenCalledWith('https://cataas.com/api/tags')
    })

    it('should throw error when fetch fails', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
      })

      await expect(getAvailableTags()).rejects.toThrow('Failed to fetch tags')
    })
  })
})
