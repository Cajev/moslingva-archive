import './Translator.css';
import { useState } from 'react';

const fakeDictionary = [
  { moslingva: 'Paradej', french: 'Bonjour', english: 'Hello' },
  { moslingva: 'O aijdenai dei', french: "Je t'aime", english: 'I love you' },
  { moslingva: 'NULA', french: 'zéro', english: 'zero' },
  { moslingva: 'UNA', french: 'un', english: 'one' },
  { moslingva: 'DUA', french: 'deux', english: 'two' },
  { moslingva: 'CINK', french: 'cinq', english: 'five' },
  { moslingva: 'DECIM', french: 'dix', english: 'ten' },
];

function Translator() {
  const [input, setInput] = useState('');
  const [lang, setLang] = useState<'moslingva' | 'french' | 'english'>('moslingva');
  const [output, setOutput] = useState('');
  const [selectedWord, setSelectedWord] = useState<any>(null);

  function onTranslate() {
    let found;
    if (lang === 'moslingva') {
      found = fakeDictionary.find(item => item.moslingva.toLowerCase() === input.trim().toLowerCase());
    } else if (lang === 'french') {
      found = fakeDictionary.find(item => item.french.toLowerCase() === input.trim().toLowerCase());
    } else {
      found = fakeDictionary.find(item => item.english.toLowerCase() === input.trim().toLowerCase());
    }
    setOutput(found ? found.moslingva + ' | ' + found.french + ' | ' + found.english : 'Mot non trouvé');
    setSelectedWord(found || null);
  }

  return (
    <div className="translator">
      <h2>🔄 Traducteur interactif</h2>
      <div className="translator-controls">
        <select value={lang} onChange={e => setLang(e.target.value as any)}>
          <option value="moslingva">Moslingva ➝ FR/EN</option>
          <option value="french">Français ➝ Moslingva/EN</option>
          <option value="english">Anglais ➝ Moslingva/FR</option>
        </select>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Entrez le mot à traduire..."
        />
        <button onClick={onTranslate}>Traduire</button>
      </div>
      <div className="translator-result">
        {output && <p>{output}</p>}
        {selectedWord && (
          <div className="dict-details">
            <div><strong>Moslingva:</strong> {selectedWord.moslingva}</div>
            <div><strong>Français:</strong> {selectedWord.french}</div>
            <div><strong>Anglais:</strong> {selectedWord.english}</div>
          </div>
        )}
      </div>
    </div>
  );
}
export default Translator;
