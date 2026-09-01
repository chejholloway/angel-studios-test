import type { CatImage } from '../services/catApi'

interface CatCardProps {
  cat: CatImage
  onClick: () => void
}

export function CatCard({ cat, onClick }: CatCardProps) {
  return (
    <article
      className="group relative overflow-hidden rounded-lg cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onClick()
        }
      }}
      aria-label={`View cat image ${cat.id}`}
    >
      <div className="aspect-square bg-background">
        <img
          src={cat.url}
          alt={`Cat ${cat.id}`}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          loading="lazy"
        />
      </div>
      {cat.tags && cat.tags.length > 0 && (
        <div className="absolute bottom-0 left-0 right-0 bg-primary/90 text-white p-2 md:p-3 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <p className="text-xs md:text-sm font-medium truncate">{cat.tags.join(', ')}</p>
        </div>
      )}
    </article>
  )
}
