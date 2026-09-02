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
    <section className="controls-panel" aria-label="Cat controls">
      <div className="controls-grid">
        <div className="space-y-2">
          <button
            onClick={handleRandomCat}
            className="btn-random"
            aria-label="Get a random cat"
          >
            Get Random Cat
          </button>
        </div>

        <div className="space-y-2">
          <label htmlFor="cat-text" className="form-label">
            Add Text to Cat
          </label>
          <div className="flex gap-2">
            <input
              id="cat-text"
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter text..."
              className="form-input"
              aria-describedby="text-help"
            />
            <button
              onClick={handleCatWithText}
              className="btn-primary"
              aria-label="Get cat with text"
            >
              Add
            </button>
          </div>
          <p id="text-help" className="help-text">Text will appear on the cat image</p>
        </div>

        <div className="space-y-2">
          <label htmlFor="cat-tag" className="form-label">
            Filter by Tag
          </label>
          <div className="flex gap-2">
            <select
              id="cat-tag"
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
              className="form-select"
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
              className="btn-primary"
              aria-label="Get cat by tag"
            >
              Get
            </button>
          </div>
          <p id="tag-help" className="help-text">Browse cats by category</p>
        </div>
      </div>
    </section>
  )
}