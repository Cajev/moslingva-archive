import { useState, useEffect } from 'react'
import './Dictionary.css'

interface Word {
  id?: number
  moslingva: string
  french: string
  english: string
  phonetic: string
  category: string
}

const CATEGORIES = ['Salutations', 'Nombres', 'Verbes', 'Pronoms', 'Adjectifs', 'Noms', 'Autre']

const DEFAULT_WORDS: Word[] = [
  {
    moslingva: 'Paradej',
    french: 'Bonjour',
    english: 'Hello',
    phonetic: 'PA-RA-DE-J',
    category: 'Salutations',
  },
  {
    moslingva: 'O aijdenai dei',
    french: "Je t'aime",
    english: 'I love you',
    phonetic: 'O-A-I-J-DE-NAI-DEI',
    category: 'Salutations',
  },
  {
    moslingva: 'NULA',
    french: 'Zéro',
    english: 'Zero',
    phonetic: 'NU-LA',
    category: 'Nombres',
  },
  {
    moslingva: 'UNA',
    french: 'Un',
    english: 'One',
    phonetic: 'U-NA',
    category: 'Nombres',
  },
  {
    moslingva: 'DUA',
    french: 'Deux',
    english: 'Two',
    phonetic: 'DU-A',
    category: 'Nombres',
  },
  {
    moslingva: 'TRIA',
    french: 'Trois',
    english: 'Three',
    phonetic: 'TRI-A',
    category: 'Nombres',
  },
  {
    moslingva: 'CINK',
    french: 'Cinq',
    english: 'Five',
    phonetic: 'CINK',
    category: 'Nombres',
  },
  {
    moslingva: 'DECIM',
    french: 'Dix',
    english: 'Ten',
    phonetic: 'DE-CIM',
    category: 'Nombres',
  },
]

function Dictionary() {
  const [words, setWords] = useState<Word[]>(DEFAULT_WORDS)
  const [filteredWords, setFilteredWords] = useState<Word[]>(DEFAULT_WORDS)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Tous')
  const [isAdding, setIsAdding] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [formData, setFormData] = useState<Word>({
    moslingva: '',
    french: '',
    english: '',
    phonetic: '',
    category: 'Autre',
  })

  useEffect(() => {
    filterWords()
  }, [searchTerm, selectedCategory, words])

  const filterWords = () => {
    let filtered = words

    if (selectedCategory !== 'Tous') {
      filtered = filtered.filter(w => w.category === selectedCategory)
    }

    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      filtered = filtered.filter(
        w =>
          w.moslingva.toLowerCase().includes(term) ||
          w.french.toLowerCase().includes(term) ||
          w.english.toLowerCase().includes(term) ||
          w.phonetic.toLowerCase().includes(term)
      )
    }

    setFilteredWords(filtered)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (editingId !== null) {
      // Update existing word
      setWords(prev => prev.map(w => (w.id === editingId ? { ...formData, id: editingId } : w)))
      
      if (window.electronAPI) {
        await window.electronAPI.updateWord({ ...formData, id: editingId })
      }
    } else {
      // Add new word
      const newWord = { ...formData, id: Date.now() }
      setWords(prev => [...prev, newWord])
      
      if (window.electronAPI) {
        await window.electronAPI.saveWord(formData)
      }
    }

    resetForm()
  }

  const handleEdit = (word: Word) => {
    setFormData(word)
    setEditingId(word.id || null)
    setIsAdding(true)
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Voulez-vous vraiment supprimer ce mot ?')) return

    setWords(prev => prev.filter(w => w.id !== id))
    
    if (window.electronAPI) {
      await window.electronAPI.deleteWord(id)
    }
  }

  const resetForm = () => {
    setFormData({
      moslingva: '',
      french: '',
      english: '',
      phonetic: '',
      category: 'Autre',
    })
    setIsAdding(false)
    setEditingId(null)
  }

  return (
    <div className="dictionary">
      <div className="dictionary-header">
        <h2>📚 Dictionnaire Moslingva</h2>
        <p>{words.length} mots disponibles</p>
      </div>

      <div className="dictionary-controls">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Rechercher un mot..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="category-filters">
          <button
            className={`filter-btn ${selectedCategory === 'Tous' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('Tous')}
          >
            Tous
          </button>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <button className="btn-add" onClick={() => setIsAdding(!isAdding)}>
          {isAdding ? '❌ Annuler' : '➕ Ajouter un mot'}
        </button>
      </div>

      {isAdding && (
        <form className="word-form" onSubmit={handleSubmit}>
          <h3>{editingId ? '✏️ Modifier' : '➕ Nouveau mot'}</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Moslingva</label>
              <input
                type="text"
                value={formData.moslingva}
                onChange={e => setFormData({ ...formData, moslingva: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Français</label>
              <input
                type="text"
                value={formData.french}
                onChange={e => setFormData({ ...formData, french: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Anglais</label>
              <input
                type="text"
                value={formData.english}
                onChange={e => setFormData({ ...formData, english: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Phonétique</label>
              <input
                type="text"
                value={formData.phonetic}
                onChange={e => setFormData({ ...formData, phonetic: e.target.value })}
                placeholder="Ex: PA-RA-DE-J"
                required
              />
            </div>
            <div className="form-group">
              <label>Catégorie</label>
              <select
                value={formData.category}
                onChange={e => setFormData({ ...formData, category: e.target.value })}
              >
                {CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="form-actions">
            <button type="button" className="btn-secondary" onClick={resetForm}>
              Annuler
            </button>
            <button type="submit" className="btn-primary">
              {editingId ? 'Mettre à jour' : 'Ajouter'}
            </button>
          </div>
        </form>
      )}

      <div className="words-grid">
        {filteredWords.map((word, index) => (
          <div key={word.id || index} className="word-card">
            <div className="word-header">
              <span className="word-category">{word.category}</span>
              <div className="word-actions">
                <button className="btn-icon" onClick={() => handleEdit(word)} title="Modifier">
                  ✏️
                </button>
                {word.id && (
                  <button className="btn-icon" onClick={() => handleDelete(word.id!)} title="Supprimer">
                    🗑️
                  </button>
                )}
              </div>
            </div>
            <div className="word-content">
              <div className="word-main">{word.moslingva}</div>
              <div className="word-phonetic">[{word.phonetic}]</div>
              <div className="word-translations">
                <span>🇫🇷 {word.french}</span>
                <span>🇬🇧 {word.english}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredWords.length === 0 && (
        <div className="no-results">
          <p>🔍 Aucun mot trouvé</p>
        </div>
      )}
    </div>
  )
}

export default Dictionary
