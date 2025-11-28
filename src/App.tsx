import { useState } from 'react'
import './App.css'
import AlphabetConstructor from './components/AlphabetConstructor'
import Dictionary from './components/Dictionary'
import Grammar from './components/Grammar'
import Translator from './components/Translator'

type TabType = 'alphabet' | 'dictionary' | 'grammar' | 'translator'

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('alphabet')

  return (
    <div className="app">
      <header className="app-header">
        <h1>📖 Moslingva Archive</h1>
        <p>Archive interactive pour la langue fictive Moslingva</p>
      </header>

      <nav className="tabs">
        <button
          className={`tab-button ${activeTab === 'alphabet' ? 'active' : ''}`}
          onClick={() => setActiveTab('alphabet')}
        >
          🎨 Alphabet Constructor
        </button>
        <button
          className={`tab-button ${activeTab === 'dictionary' ? 'active' : ''}`}
          onClick={() => setActiveTab('dictionary')}
        >
          📚 Dictionnaire
        </button>
        <button
          className={`tab-button ${activeTab === 'grammar' ? 'active' : ''}`}
          onClick={() => setActiveTab('grammar')}
        >
          📖 Grammaire
        </button>
        <button
          className={`tab-button ${activeTab === 'translator' ? 'active' : ''}`}
          onClick={() => setActiveTab('translator')}
        >
          🔄 Traducteur
        </button>
      </nav>

      <main className="content">
        <div className="tab-content">
          {activeTab === 'alphabet' && <AlphabetConstructor />}
          {activeTab === 'dictionary' && <Dictionary />}
          {activeTab === 'grammar' && <Grammar />}
          {activeTab === 'translator' && <Translator />}
        </div>
      </main>
    </div>
  )
}

export default App
