import type { ReactNode } from 'react'

interface ControlsProps {
  handleRandomCat: () => void
  handleCatWithText: () => void
  handleCatByTag: () => void
  tags: string[]
  text: string
  setText: (value: string) => void
  selectedTag: string
  setSelectedTag: (value: string) => void
}

export function Controls({ handleRandomCat, handleCatWithText, handleCatByTag, tags, text, setText, selectedTag, setSelectedTag }: ControlsProps) {
  return (
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
  )
}