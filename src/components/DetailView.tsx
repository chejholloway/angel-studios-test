import type { CatImage } from '../services/catApi'

interface DetailViewProps {
  selectedCat: CatImage | null
  onClose: () => void
}

export function DetailView({ selectedCat }: DetailViewProps) {
  if (!selectedCat) {
    return null
  }

  return (
    <section className="bg-white rounded-lg shadow-lg overflow-hidden mb-6 md:mb-8">
      <article className="p-4 md:p-6">
        <img
          src={selectedCat.url}
          alt={`Cat ${selectedCat.id}`}
          className="w-full h-auto rounded-lg mb-4"
        />
        <h2 className="text-xl font-bold text-primary mb-2">Cat Details</h2>
        <p className="text-gray-600 mb-4">ID: {selectedCat.id}</p>
        {selectedCat.tags && selectedCat.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {selectedCat.tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </article>
    </section>
  )
}
