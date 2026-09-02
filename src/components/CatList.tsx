import type { ReactNode } from 'react'
import { CatCard } from './CatCard'

interface CatListProps {
  cats: any[]
  onCatClick: (cat: any) => void
  emptyMessage?: string
}

export function CatList({ cats, onCatClick, emptyMessage = 'No cats yet! Start by fetching one above.' }: CatListProps) {
  if (cats.length === 0) {
    return (
      <div className="text-center py-8 md:py-12 text-gray-500">
        <p className="text-base md:text-lg">{emptyMessage}</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
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