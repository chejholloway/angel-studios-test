import { CatCard } from './CatCard'

interface CatListProps {
  cats: any[]
  onCatClick: (cat: any) => void
  emptyMessage?: string
}

export function CatList({ cats, onCatClick, emptyMessage = 'No cats yet! Start by fetching one above.' }: CatListProps) {
  if (cats.length === 0) {
    return (
      <div className="empty-state">
        <p className="empty-text">{emptyMessage}</p>
      </div>
    )
  }

  return (
    <div className="cat-grid" data-testid="cat-grid">
      {cats.map((cat) => (
        <div
          key={cat.id}
          className="animate-fade-in-up"
          style={{ animationDelay: `${cats.indexOf(cat) * 50}ms` }}
        >
          <CatCard cat={cat} onClick={() => onCatClick(cat)} />
        </div>
      ))}
    </div>
  )
}