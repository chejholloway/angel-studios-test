const BASE_URL = 'https://cataas.com'

export interface CatImage {
  id: string
  url: string
  tags?: string[]
  createdAt?: string
}

export async function getRandomCat(): Promise<CatImage> {
  const response = await fetch(`${BASE_URL}/cat?json=true`)
  if (!response.ok) throw new Error('Failed to fetch cat')
  const data = await response.json()
  return {
    id: data._id || Date.now().toString(),
    url: data.url.startsWith('http') ? data.url : `${BASE_URL}${data.url}`,
    tags: data.tags || []
  }
}

export async function getCatWithText(text: string): Promise<CatImage> {
  const response = await fetch(`${BASE_URL}/cat/says/${encodeURIComponent(text)}?json=true`)
  if (!response.ok) throw new Error('Failed to fetch cat with text')
  const data = await response.json()
  return {
    id: data._id || Date.now().toString(),
    url: data.url.startsWith('http') ? data.url : `${BASE_URL}${data.url}`,
    tags: data.tags || []
  }
}

export async function getCatByTag(tag: string): Promise<CatImage> {
  const response = await fetch(`${BASE_URL}/cat/${encodeURIComponent(tag)}?json=true`)
  if (!response.ok) throw new Error('Failed to fetch cat by tag')
  const data = await response.json()
  return {
    id: data._id || Date.now().toString(),
    url: data.url.startsWith('http') ? data.url : `${BASE_URL}${data.url}`,
    tags: data.tags || []
  }
}

export async function getAvailableTags(): Promise<string[]> {
  const response = await fetch(`${BASE_URL}/api/tags`)
  if (!response.ok) throw new Error('Failed to fetch tags')
  return response.json()
}
