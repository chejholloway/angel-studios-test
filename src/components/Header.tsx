import type { ReactNode } from 'react'

interface HeaderProps {
  title: string
  showBackButton?: boolean
  onBackClick?: () => void
  backLabel?: string
}

export function Header({ title, showBackButton = false, onBackClick, backLabel = 'Back to Catalog' }: HeaderProps) {
  return (
    <header className="bg-primary text-white p-4 md:p-6">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <h1 className="text-xl md:text-2xl font-bold">{title}</h1>
        {showBackButton && onBackClick && (
          <button
            onClick={onBackClick}
            className="px-4 py-2 md:px-6 md:py-3 bg-accent hover:bg-accent/90 rounded-lg transition-colors text-sm md:text-base"
            aria-label={backLabel}
          >
            {backLabel}
          </button>
        )}
      </div>
    </header>
  )
}