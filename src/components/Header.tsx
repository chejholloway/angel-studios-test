import type { ReactNode } from 'react'

interface HeaderProps {
  title: string
  showBackButton?: boolean
  onBackClick?: () => void
  backLabel?: string
}

export function Header({ title, showBackButton = false, onBackClick, backLabel = 'Back to Catalog' }: HeaderProps) {
  return (
    <header className="app-header">
      <div className="header-container">
        <h1 className="header-title">{title}</h1>
        {showBackButton && onBackClick && (
          <button
            onClick={onBackClick}
            className="btn-back"
            aria-label={backLabel}
          >
            {backLabel}
          </button>
        )}
      </div>
    </header>
  )
}