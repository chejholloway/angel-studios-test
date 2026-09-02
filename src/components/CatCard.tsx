import type { CatImage } from '../services/catApi'

interface CatCardProps {
  cat: CatImage
  onClick: () => void
}

export function CatCard({ cat, onClick }: CatCardProps) {
  return (
    <button
      onClick={onClick}
      aria-label={`View cat image ${cat.id}`}
      className="card-button"
    >
      <img
        src={cat.url}
        alt={`Cat ${cat.id}`}
        className="card-image"
      />
      <div className="card-body">
        <p className="card-title">ID: {cat.id}</p>
      </div>
    </button>
  )
}
