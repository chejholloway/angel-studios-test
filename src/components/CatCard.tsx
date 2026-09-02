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
      className="w-full text-left rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow bg-white"
    >
      <img
        src={cat.url}
        alt={`Cat ${cat.id}`}
        className="w-full h-40 object-cover"
      />
      <div className="p-3">
        <p className="text-sm font-medium text-primary truncate">ID: {cat.id}</p>
      </div>
    </button>
  )
}
