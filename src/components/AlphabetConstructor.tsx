import { useEffect, useRef, useState } from 'react'
import './AlphabetConstructor.css'

interface Character {
  letter: string
  type: 'consonant' | 'vowel' | 'digit'
  svg?: string
  completed: boolean
}

const CONSONANTS = ['B', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'R', 'S', 'T', 'V', 'Z']
const VOWELS = ['A', 'E', 'I', 'O', 'OU', 'U']
const DIGITS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

function AlphabetConstructor() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [characters, setCharacters] = useState<Character[]>([
    ...CONSONANTS.map(c => ({ letter: c, type: 'consonant' as const, completed: false })),
    ...VOWELS.map(v => ({ letter: v, type: 'vowel' as const, completed: false })),
    ...DIGITS.map(d => ({ letter: d, type: 'digit' as const, completed: false })),
  ])
  const [selectedChar, setSelectedChar] = useState<Character | null>(characters[0])
  const [currentPath, setCurrentPath] = useState<Array<{ x: number; y: number }>>([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    canvas.width = 400
    canvas.height = 400

    // Clear and draw grid
    ctx.fillStyle = '#1a1a1a'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Draw grid lines
    ctx.strokeStyle = '#333'
    ctx.lineWidth = 1
    const gridSize = 40
    for (let i = 0; i <= canvas.width; i += gridSize) {
      ctx.beginPath()
      ctx.moveTo(i, 0)
      ctx.lineTo(i, canvas.height)
      ctx.stroke()

      ctx.beginPath()
      ctx.moveTo(0, i)
      ctx.lineTo(canvas.width, i)
      ctx.stroke()
    }

    // Draw center axes
    ctx.strokeStyle = '#646cff'
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(canvas.width / 2, 0)
    ctx.lineTo(canvas.width / 2, canvas.height)
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(0, canvas.height / 2)
    ctx.lineTo(canvas.width, canvas.height / 2)
    ctx.stroke()

    // Draw current path
    if (currentPath.length > 1) {
      ctx.strokeStyle = '#fff'
      ctx.lineWidth = 3
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'

      ctx.beginPath()
      ctx.moveTo(currentPath[0].x, currentPath[0].y)
      for (let i = 1; i < currentPath.length; i++) {
        ctx.lineTo(currentPath[i].x, currentPath[i].y)
      }
      ctx.stroke()
    }
  }, [currentPath])

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    setIsDrawing(true)
    setCurrentPath([{ x, y }])
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return

    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    setCurrentPath(prev => [...prev, { x, y }])
  }

  const stopDrawing = () => {
    setIsDrawing(false)
  }

  const clearCanvas = () => {
    setCurrentPath([])
  }

  const saveCharacter = async () => {
    if (!selectedChar || currentPath.length < 2) return

    // Convert path to SVG
    const svgPath = pathToSVG(currentPath)
    const svg = `<svg width="400" height="400" xmlns="http://www.w3.org/2000/svg">${svgPath}</svg>`

    // Update character
    setCharacters(prev =>
      prev.map(c =>
        c.letter === selectedChar.letter
          ? { ...c, svg, completed: true }
          : c
      )
    )

    // Save to database (if available)
    if (window.electronAPI) {
      await window.electronAPI.saveCharacter({
        type: selectedChar.type,
        letter: selectedChar.letter,
        svg_data: svg,
      })
    }

    alert(`Caractère "${selectedChar.letter}" sauvegardé !`)
    clearCanvas()
  }

  const pathToSVG = (path: Array<{ x: number; y: number }>) => {
    if (path.length < 2) return ''

    let d = `M ${path[0].x} ${path[0].y}`
    for (let i = 1; i < path.length; i++) {
      d += ` L ${path[i].x} ${path[i].y}`
    }

    return `<path d="${d}" stroke="white" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round" />`
  }

  const exportSVG = () => {
    if (!selectedChar || currentPath.length < 2) return

    const svgPath = pathToSVG(currentPath)
    const svg = `<svg width="400" height="400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">${svgPath}</svg>`

    const blob = new Blob([svg], { type: 'image/svg+xml' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `moslingva-${selectedChar.letter}.svg`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="alphabet-constructor">
      <div className="sidebar left">
        <h2>Caractères</h2>
        
        <div className="char-section">
          <h3>Consonnes ({characters.filter(c => c.type === 'consonant' && c.completed).length}/{CONSONANTS.length})</h3>
          <div className="char-list">
            {characters
              .filter(c => c.type === 'consonant')
              .map(char => (
                <button
                  key={char.letter}
                  className={`char-button ${selectedChar?.letter === char.letter ? 'active' : ''} ${char.completed ? 'completed' : ''}`}
                  onClick={() => setSelectedChar(char)}
                >
                  {char.letter}
                  {char.completed && <span className="check">✓</span>}
                </button>
              ))}
          </div>
        </div>

        <div className="char-section">
          <h3>Voyelles ({characters.filter(c => c.type === 'vowel' && c.completed).length}/{VOWELS.length})</h3>
          <div className="char-list">
            {characters
              .filter(c => c.type === 'vowel')
              .map(char => (
                <button
                  key={char.letter}
                  className={`char-button ${selectedChar?.letter === char.letter ? 'active' : ''} ${char.completed ? 'completed' : ''}`}
                  onClick={() => setSelectedChar(char)}
                >
                  {char.letter}
                  {char.completed && <span className="check">✓</span>}
                </button>
              ))}
          </div>
        </div>

        <div className="char-section">
          <h3>Chiffres ({characters.filter(c => c.type === 'digit' && c.completed).length}/{DIGITS.length})</h3>
          <div className="char-list">
            {characters
              .filter(c => c.type === 'digit')
              .map(char => (
                <button
                  key={char.letter}
                  className={`char-button ${selectedChar?.letter === char.letter ? 'active' : ''} ${char.completed ? 'completed' : ''}`}
                  onClick={() => setSelectedChar(char)}
                >
                  {char.letter}
                  {char.completed && <span className="check">✓</span>}
                </button>
              ))}
          </div>
        </div>
      </div>

      <div className="canvas-area">
        <div className="canvas-header">
          <h2>Dessiner : {selectedChar?.letter}</h2>
          <div className="canvas-info">
            <p>🖌️ Dessinez le caractère avec votre souris/trackpad</p>
          </div>
        </div>
        
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          className="drawing-canvas"
        />

        <div className="canvas-controls">
          <button onClick={clearCanvas} className="btn-secondary">
            🗑️ Effacer
          </button>
          <button onClick={saveCharacter} className="btn-primary" disabled={currentPath.length < 2}>
            💾 Sauvegarder
          </button>
          <button onClick={exportSVG} className="btn-secondary" disabled={currentPath.length < 2}>
            📦 Export SVG
          </button>
        </div>
      </div>

      <div className="sidebar right">
        <h2>Progression</h2>
        <div className="progress-stats">
          <div className="stat">
            <span className="stat-label">Total</span>
            <span className="stat-value">
              {characters.filter(c => c.completed).length} / {characters.length}
            </span>
          </div>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{
                width: `${(characters.filter(c => c.completed).length / characters.length) * 100}%`,
              }}
            />
          </div>
        </div>

        {selectedChar?.svg && (
          <div className="preview">
            <h3>Aperçu</h3>
            <div
              className="preview-svg"
              dangerouslySetInnerHTML={{ __html: selectedChar.svg }}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default AlphabetConstructor

// Type declarations
declare global {
  interface Window {
    electronAPI?: {
      saveCharacter: (character: any) => Promise<any>
      loadCharacters: () => Promise<any>
      saveWord: (word: any) => Promise<any>
      loadWords: () => Promise<any>
      deleteWord: (id: number) => Promise<any>
      updateWord: (word: any) => Promise<any>
      exportToPDF: (data: any) => Promise<any>
      exportToJSON: (data: any) => Promise<any>
      exportToSVG: (svg: string, filename: string) => Promise<any>
    }
  }
}
