import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getRandomCat, getCatWithText, getCatByTag, getAvailableTags, type CatImage } from './services/catApi'
import { CatCard } from './components/CatCard'

function App() {
  const [cats, setCats] = useState<CatImage[]>([])
  const [selectedCat, setSelectedCat] = useState<CatImage | null>(null)
  const [text, setText] = useState('')
  const [selectedTag, setSelectedTag] = useState('')

  const { data: tags = [] } = useQuery({
    queryKey: ['tags'],
    queryFn: getAvailableTags,
    staleTime: Infinity
  })

  const addCat = async (cat: CatImage) => {
    setCats(prev => [...prev, cat])
  }

  const handleRandomCat = async () => {
    try {
      const cat = await getRandomCat()
      await addCat(cat)
    } catch (error) {
      console.error('Failed to fetch random cat:', error)
    }
  }

  const handleCatWithText = async () => {
    if (!text.trim()) return
    try {
      const cat = await getCatWithText(text)
      await addCat(cat)
      setText('')
    } catch (error) {
      console.error('Failed to fetch cat with text:', error)
    }
  }

  const handleCatByTag = async () => {
    if (!selectedTag) return
    try {
      const cat = await getCatByTag(selectedTag)
      await addCat(cat)
    } catch (error) {
      console.error('Failed to fetch cat by tag:', error)
    }
  }

  const handleCatClick = (cat: CatImage) => {
    setSelectedCat(cat)
  }

  const handleCloseDetail = () => {
    setSelectedCat(null)
  }

  if (selectedCat) {
    return (
      <div className="min-h-screen bg-background">
        <a
          href="#main-content"
          className="absolute -top-4 -left-4 w-px h-px overflow-hidden text-xs bg-accent text-white rounded-lg p-4 focus:top-4 focus:left-4 focus:w-auto focus:h-auto focus:z-50"
        >
          Skip to main content
        </a>
        <header className="bg-primary text-white p-4 md:p-6">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <h1 className="text-xl md:text-2xl font-bold">Cat-alog</h1>
            <button
              onClick={handleCloseDetail}
              className="px-4 py-2 md:px-6 md:py-3 bg-accent hover:bg-accent/90 rounded-lg transition-colors text-sm md:text-base"
              aria-label="Back to catalog"
            >
              Back to Catalog
            </button>
          </div>
        </header>
        <main id="main-content" className="max-w-4xl mx-auto p-4 md:p-8">
          <article className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img
              src={selectedCat.url}
              alt={`Cat ${selectedCat.id}`}
              className="w-full h-auto"
            />
            <div className="p-6">
              <h2 className="text-xl font-bold text-primary mb-2">Cat Details</h2>
              <p className="text-gray-600 mb-4">ID: {selectedCat.id}</p>
              {selectedCat.tags && selectedCat.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {selectedCat.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </article>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <a
        href="#main-content"
        className="absolute -top-4 -left-4 w-px h-px overflow-hidden text-xs bg-accent text-white rounded-lg p-4 focus:top-4 focus:left-4 focus:w-auto focus:h-auto focus:z-50"
      >
        Skip to main content
      </a>
      <header className="bg-primary text-white p-4 md:p-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-xl md:text-2xl font-bold">Cat-alog</h1>
          <p className="text-white/80 text-xs md:text-sm mt-1">Your personal cat collection</p>
        </div>
      </header>

      <main id="main-content" className="max-w-6xl mx-auto p-4 md:p-6">
        <section className="bg-white rounded-lg shadow-lg p-4 md:p-6 mb-6 md:mb-8" aria-label="Cat controls">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <div className="space-y-2">
              <button
                onClick={handleRandomCat}
                className="w-full px-4 py-3 md:py-4 bg-accent hover:bg-accent/90 text-white rounded-lg transition-colors font-medium text-sm md:text-base"
                aria-label="Get a random cat"
              >
                Get Random Cat
              </button>
            </div>

            <div className="space-y-2">
              <label htmlFor="cat-text" className="block text-sm font-medium text-gray-700">
                Add Text to Cat
              </label>
              <div className="flex gap-2">
                <input
                  id="cat-text"
                  type="text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Enter text..."
                  className="flex-1 px-3 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent text-sm md:text-base"
                  aria-describedby="text-help"
                />
                <button
                  onClick={handleCatWithText}
                  className="px-4 py-2 md:py-3 bg-primary hover:bg-primary/90 text-white rounded-lg transition-colors text-sm md:text-base whitespace-nowrap"
                  aria-label="Get cat with text"
                >
                  Add
                </button>
              </div>
              <p id="text-help" className="text-xs text-gray-500">Text will appear on the cat image</p>
            </div>

            <div className="space-y-2">
              <label htmlFor="cat-tag" className="block text-sm font-medium text-gray-700">
                Filter by Tag
              </label>
              <div className="flex gap-2">
                <select
                  id="cat-tag"
                  value={selectedTag}
                  onChange={(e) => setSelectedTag(e.target.value)}
                  className="flex-1 px-3 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent text-sm md:text-base"
                  aria-describedby="tag-help"
                >
                  <option value="">Select a tag...</option>
                  {tags.slice(0, 20).map((tag) => (
                    <option key={tag} value={tag}>
                      {tag}
                    </option>
                  ))}
                </select>
                <button
                  onClick={handleCatByTag}
                  className="px-4 py-2 md:py-3 bg-primary hover:bg-primary/90 text-white rounded-lg transition-colors text-sm md:text-base whitespace-nowrap"
                  aria-label="Get cat by tag"
                >
                  Get
                </button>
              </div>
              <p id="tag-help" className="text-xs text-gray-500">Browse cats by category</p>
            </div>
          </div>
        </section>

        <section aria-label="Cat collection">
          <h2 className="text-lg md:text-xl font-bold text-primary mb-4">
            Your Collection ({cats.length})
          </h2>
          {cats.length === 0 ? (
            <div className="text-center py-8 md:py-12 text-gray-500">
              <p className="text-base md:text-lg">No cats yet! Start by fetching one above.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
              {cats.map((cat, index) => (
                <div
                  key={cat.id}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <CatCard cat={cat} onClick={() => handleCatClick(cat)} />
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      <footer className="bg-primary text-white/60 text-center py-4 md:py-6 mt-6 md:mt-8">
        <p className="text-xs md:text-sm">Built with ❤️ and React, TypeScript, and Tailwind CSS</p>
        <p className="text-xs md:text-sm">By Che' J. Holloway</p>
      </footer>
    </div>
  )
}

export default App
