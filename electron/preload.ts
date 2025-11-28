import { contextBridge, ipcRenderer } from 'electron'

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electronAPI', {
  // Database operations
  saveCharacter: (character: any) => ipcRenderer.invoke('save-character', character),
  loadCharacters: () => ipcRenderer.invoke('load-characters'),
  
  saveWord: (word: any) => ipcRenderer.invoke('save-word', word),
  loadWords: () => ipcRenderer.invoke('load-words'),
  deleteWord: (id: number) => ipcRenderer.invoke('delete-word', id),
  updateWord: (word: any) => ipcRenderer.invoke('update-word', word),
  
  // Export operations
  exportToPDF: (data: any) => ipcRenderer.invoke('export-pdf', data),
  exportToJSON: (data: any) => ipcRenderer.invoke('export-json', data),
  exportToSVG: (svg: string, filename: string) => ipcRenderer.invoke('export-svg', svg, filename),
})
