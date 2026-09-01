import { http, HttpResponse } from 'msw'

const BASE_URL = 'https://cataas.com'

export const handlers = [
  // Mock tags endpoint
  http.get(`${BASE_URL}/api/tags`, () => {
    return HttpResponse.json(['cute', 'fluffy', 'funny', 'sleepy', 'playful'])
  }),

  // Mock random cat endpoint
  http.get(`${BASE_URL}/cat`, () => {
    return HttpResponse.json({
      _id: 'cat-123',
      url: '/cat/cat-123',
      tags: ['cute', 'fluffy'],
    })
  }),

  // Mock cat with text endpoint
  http.get(`${BASE_URL}/cat/:text`, ({ params }) => {
    return HttpResponse.json({
      _id: 'cat-456',
      url: `/cat/${params.text}`,
      tags: ['cute'],
    })
  }),

  // Mock cat by tag endpoint
  http.get(`${BASE_URL}/cat/:tag`, ({ params }) => {
    return HttpResponse.json({
      _id: 'cat-789',
      url: `/cat/${params.tag}`,
      tags: [params.tag],
    })
  }),
]

// Additional handlers for testing absolute URLs
export const absoluteUrlHandlers = [
  http.get(`${BASE_URL}/cat`, () => {
    return HttpResponse.json({
      _id: 'cat-456',
      url: 'https://cataas.com/cat/cat-456',
      tags: ['cute'],
    })
  }),

  http.get(`${BASE_URL}/cat/:text`, ({ params }) => {
    return HttpResponse.json({
      _id: 'cat-789',
      url: 'https://cataas.com/cat/world',
      tags: [],
    })
  }),

  http.get(`${BASE_URL}/cat/:tag`, ({ params }) => {
    return HttpResponse.json({
      _id: 'cat-202',
      url: 'https://cataas.com/cat/fluffy',
      tags: ['fluffy'],
    })
  }),
]
