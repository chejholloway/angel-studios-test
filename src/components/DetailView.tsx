import { useEffect, useRef, useCallback, useState } from 'react'
import { createPortal } from 'react-dom'
import type { CatImage } from '../services/catApi'

interface DetailViewProps {
  selectedCat: CatImage | null
  onClose: () => void
}

export function DetailView({ selectedCat, onClose }: DetailViewProps) {
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const [isClosing, setIsClosing] = useState(false)
  const prefersReducedMotion = useRef(
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  const onCloseRef = useRef(onClose)
  onCloseRef.current = onClose

  useEffect(() => {
    if (selectedCat) {
      setIsClosing(false)
    }
  }, [selectedCat])

  useEffect(() => {
    if (!isClosing) return
    const timer = setTimeout(() => {
      onCloseRef.current()
    }, 200)
    return () => clearTimeout(timer)
  }, [isClosing])

  const handleClose = useCallback(() => {
    if (prefersReducedMotion.current) {
      onCloseRef.current()
      return
    }
    setIsClosing(true)
  }, [])

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        handleClose()
        return
      }

      if (event.key === 'Tab' && dialogRef.current) {
        const focusableElements = dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])',
        )
        const firstElement = focusableElements[0]
        const lastElement = focusableElements[focusableElements.length - 1]

        if (event.shiftKey) {
          if (document.activeElement === firstElement) {
            event.preventDefault()
            lastElement?.focus()
          }
        } else {
          if (document.activeElement === lastElement) {
            event.preventDefault()
            firstElement?.focus()
          }
        }
      }
    },
    [handleClose],
  )

  useEffect(() => {
    if (!selectedCat) return

    document.addEventListener('keydown', handleKeyDown)
    const previouslyFocused = document.activeElement as HTMLElement | null
    closeButtonRef.current?.focus()

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      previouslyFocused?.focus()
    }
  }, [selectedCat, handleKeyDown])

  if (!selectedCat) return null

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      handleClose()
    }
  }

  const handleAnimationEnd = (event: React.AnimationEvent<HTMLDivElement>) => {
    if (event.animationName === 'modal-exit') {
      onCloseRef.current()
    }
  }

  const dialogClasses = [
    'modal-panel',
    isClosing ? 'animate-modal-exit' : 'animate-modal-enter',
  ].join(' ')

  return createPortal(
    <div
      className="modal-overlay"
      aria-hidden={!selectedCat}
    >
      <div
        className="modal-backdrop"
        aria-hidden="true"
        onClick={handleBackdropClick}
      />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cat-details-heading"
        className={dialogClasses}
        onAnimationEnd={handleAnimationEnd}
      >
        <div className="modal-content">
          <img
            src={selectedCat.url}
            alt={`Cat ${selectedCat.id}`}
            loading="lazy"
            className="modal-image"
          />
          <h2 id="cat-details-heading" className="modal-heading">
            Cat Details
          </h2>
          <p className="modal-text">ID: {selectedCat.id}</p>
          {selectedCat.tags && selectedCat.tags.length > 0 && (
            <div className="tag-list">
              {selectedCat.tags.map((tag, index) => (
                <span
                  key={index}
                  className="tag-item"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
        <button
          ref={closeButtonRef}
          onClick={handleClose}
          aria-label="Close details"
          className="modal-close-button"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>,
    document.body,
  )
}
