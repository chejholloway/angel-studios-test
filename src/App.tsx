import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getRandomCat, getCatWithText, getCatByTag, getAvailableTags, type CatImage } from './services/catApi'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { Controls } from './components/Controls'
import { CatList } from './components/CatList'
import { DetailView } from './components/DetailView'


function App() {
  const [cats, setCats] = useState<CatImage[]>([])
  const [selectedCat, setSelectedCat] = useState<CatImage | null>(null)
  const [text, setText] = useState('')
  const [selectedTag, setSelectedTag] = useState('')

  const { data: tags = [] } = useQuery({
    queryKey: ['tags'],
    queryFn: getAvailableTags,
    staleTime: Infinity
  })

  const addCat = async (cat: CatImage) => {
    setCats(prev => [...prev, cat])
  }

  const handleRandomCat = async () => {
    try {
      const cat = await getRandomCat()
      await addCat(cat)
    } catch (error) {
      console.error('Failed to fetch random cat:', error)
    }
  }

  const handleCatWithText = async () => {
    if (!text.trim()) return
    try {
      const cat = await getCatWithText(text)
      await addCat(cat)
      setText('')
    } catch (error) {
      console.error('Failed to fetch cat with text:', error)
    }
  }

  const handleCatByTag = async () => {
    if (!selectedTag) return
    try {
      const cat = await getCatByTag(selectedTag)
      await addCat(cat)
    } catch (error) {
      console.error('Failed to fetch cat by tag:', error)
    }
  }

  const handleCatClick = (cat: CatImage) => {
    setSelectedCat(cat)
  }

  const handleCloseDetail = () => {
    setSelectedCat(null)
  }

  return (
    <div>
      <a
        href="#main-content"
        className="skip-link"
      >
        Skip to main content
      </a>
      <Header title="Cat-alog" showBackButton={!!selectedCat} onBackClick={handleCloseDetail} />

      <main id="main-content" className="app-main" inert={!!selectedCat} aria-hidden={!!selectedCat}>
        <DetailView key={selectedCat?.id} selectedCat={selectedCat} onClose={handleCloseDetail} />

        <section className="content-section">
          <p className="section-subtitle">Your personal cat collection</p>
          <Controls
            handleRandomCat={handleRandomCat}
            handleCatWithText={handleCatWithText}
            handleCatByTag={handleCatByTag}
            tags={tags}
            text={text}
            setText={setText}
            selectedTag={selectedTag}
            setSelectedTag={setSelectedTag}
          />
        </section>

        <section aria-label="Cat collection">
          <h2 className="section-heading">
            Your Collection ({cats.length})
          </h2>
          <CatList cats={cats} onCatClick={handleCatClick} />
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default App
