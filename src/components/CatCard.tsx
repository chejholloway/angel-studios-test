import { useState } from 'react'
import type { CatImage } from '../services/catApi'

interface CatCardProps {
  cat: CatImage
  onClick: () => void
}

export function CatCard({ cat, onClick }: CatCardProps) {
  const [loaded, setLoaded] = useState(false)
  return (
    <button
      onClick={onClick}
      aria-label={`View cat image ${cat.id}`}
      className="card-button"
    >
      <span className={`card-skeleton ${loaded ? 'is-loaded' : ''}`}>
        <svg className="spinner" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path d="M4 12a8 8 0 0 1 8-8v8H4z" fill="currentColor" />
        </svg>
      </span>
      <img
        src={cat.url}
        alt={`Cat ${cat.id}`}
        className="card-image"
        loading="lazy"
        onLoad={() => setLoaded(true)}
      />
      <div className="card-body">
        <p className="card-title">ID: {cat.id}</p>
      </div>
    </button>
  )
}
