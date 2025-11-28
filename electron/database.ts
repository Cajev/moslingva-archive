import Database from 'better-sqlite3'
import { app } from 'electron'
import path from 'path'

let db: Database.Database | null = null

export function initDatabase() {
  const userDataPath = app.getPath('userData')
  const dbPath = path.join(userDataPath, 'moslingva.db')
  
  db = new Database(dbPath)
  
  // Create tables
  db.exec(`
    CREATE TABLE IF NOT EXISTS characters (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      type TEXT NOT NULL,
      letter TEXT NOT NULL UNIQUE,
      svg_data TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `)
  
  db.exec(`
    CREATE TABLE IF NOT EXISTS words (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      moslingva TEXT NOT NULL,
      french TEXT NOT NULL,
      english TEXT NOT NULL,
      phonetic TEXT NOT NULL,
      category TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `)
  
  db.exec(`
    CREATE TABLE IF NOT EXISTS grammar_rules (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      category TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `)
  
  console.log('Database initialized at:', dbPath)
}

export function getDatabase() {
  if (!db) {
    throw new Error('Database not initialized')
  }
  return db
}

// Character operations
export function saveCharacter(character: {
  type: string
  letter: string
  svg_data: string
}) {
  const db = getDatabase()
  const stmt = db.prepare(`
    INSERT OR REPLACE INTO characters (type, letter, svg_data, updated_at)
    VALUES (?, ?, ?, CURRENT_TIMESTAMP)
  `)
  return stmt.run(character.type, character.letter, character.svg_data)
}

export function loadCharacters() {
  const db = getDatabase()
  const stmt = db.prepare('SELECT * FROM characters ORDER BY type, letter')
  return stmt.all()
}

// Word operations
export function saveWord(word: {
  moslingva: string
  french: string
  english: string
  phonetic: string
  category?: string
}) {
  const db = getDatabase()
  const stmt = db.prepare(`
    INSERT INTO words (moslingva, french, english, phonetic, category)
    VALUES (?, ?, ?, ?, ?)
  `)
  return stmt.run(
    word.moslingva,
    word.french,
    word.english,
    word.phonetic,
    word.category || 'general'
  )
}

export function loadWords() {
  const db = getDatabase()
  const stmt = db.prepare('SELECT * FROM words ORDER BY moslingva')
  return stmt.all()
}

export function updateWord(word: {
  id: number
  moslingva: string
  french: string
  english: string
  phonetic: string
  category?: string
}) {
  const db = getDatabase()
  const stmt = db.prepare(`
    UPDATE words
    SET moslingva = ?, french = ?, english = ?, phonetic = ?, category = ?, updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `)
  return stmt.run(
    word.moslingva,
    word.french,
    word.english,
    word.phonetic,
    word.category || 'general',
    word.id
  )
}

export function deleteWord(id: number) {
  const db = getDatabase()
  const stmt = db.prepare('DELETE FROM words WHERE id = ?')
  return stmt.run(id)
}
