# 📖 Moslingva Archive

**Application Electron pour archiver et documenter la langue fictive Moslingva**

![Moslingva](https://img.shields.io/badge/Lang-Moslingva-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)
![Electron](https://img.shields.io/badge/Electron-47848F?logo=electron&logoColor=white)

## 🌟 À propos

Moslingva Archive est une application desktop pour créer, documenter et préserver une langue fictive complète avec :
- 🎨 **Alphabet personnalisé** : Créateur d'alphabet avec dessin au trackpad et vectorisation automatique
- 📚 **Dictionnaire interactif** : Gestion complète du vocabulaire (ajout, modification, suppression)
- 📖 **Grammaire structurée** : Documentation des règles grammaticales et conjugaisons
- 🔄 **Traducteur** : Conversion entre Moslingva, français et anglais
- 💾 **Persistance locale** : Sauvegarde dans SQLite
- 📦 **Export multi-format** : PDF, JSON, SVG

## 🎯 Fonctionnalités principales

### 1. Alphabet Constructor
- Dessin libre au trackpad pour chaque caractère
- Vectorisation automatique des traits
- Système hybride : esquisse manuelle → rendu vectoriel paramétré
- Support des 26 consonnes + 6 voyelles + 10 chiffres
- Prévisualisation en temps réel
- Export en SVG

### 2. Dictionnaire
- Ajout/modification/suppression de mots
- Traduction multilingue (Moslingva ↔ FR ↔ EN)
- Affichage phonétique automatique
- Catégorisation (salutations, nombres, verbes, etc.)
- Recherche et filtrage
- Affichage automatique en alphabet Moslingva

### 3. Grammaire
- Pronoms personnels
- Conjugaisons (Présent, Passé RE, Futur DA)
- Structure SVO (Sujet-Verbe-Objet)
- Exemples de phrases
- Système de nombres additif (ex: 15 = [10-5])

### 4. Traducteur
- Traduction interactive
- Suggestions automatiques
- Affichage phonétique

## 🚀 Installation

### Prérequis
- [Node.js](https://nodejs.org/) (v18 ou supérieur)
- [Git](https://git-scm.com/)

### Cloner le repository
```bash
git clone https://github.com/Cajev/moslingva-archive.git
cd moslingva-archive
```

### Installer les dépendances
```bash
npm install
```

### Lancer en mode développement
```bash
npm run dev
```
L'application s'ouvrira automatiquement.

### Build de production
```bash
npm run build
npm run build:electron
```
Les installers seront dans le dossier `release/`.

## 🏗️ Architecture technique

### Stack
- **Frontend** : React 18 + TypeScript
- **Desktop** : Electron
- **Base de données** : SQLite (better-sqlite3)
- **Dessin vectoriel** : Fabric.js
- **Build** : Vite + electron-builder

### Structure du projet
```
moslingva-archive/
├── electron/              # Processus principal Electron
│   ├── main.ts           # Point d'entrée Electron
│   └── database.ts       # Gestion SQLite
├── src/                  # Application React
│   ├── components/       # Composants React
│   │   ├── AlphabetConstructor.tsx
│   │   ├── Dictionary.tsx
│   │   ├── Grammar.tsx
│   │   └── Translator.tsx
│   ├── utils/            # Utilitaires
│   │   ├── vectorization.ts
│   │   └── moslingva.ts
│   ├── App.tsx           # Composant principal
│   └── main.tsx          # Point d'entrée React
├── vite.config.ts        # Configuration Vite
├── package.json          # Dépendances NPM
└── README.md
```

## 📝 Système linguistique Moslingva

### Alphabet
- **26 consonnes** : B, D, F, G, H, J, K, L, M, N, P, R, S, T, V, Z, etc.
- **6 voyelles** : A, E, I, O, OU, U
- **Voyelles doubles** : AI, EI, AA, EE, II, OO, OOUU, UU
- **10 chiffres** : NULA (0), UNA (1), DUA (2), TRIA (3), CINK (5), etc.

### Système de notation
Les voyelles se notent par des barres autour/sur les consonnes :
- A → barre horizontale
- E → barre double
- I → barre verticale haute
- O → cercle
- OU → vagues
- U → barres croisées

### Grammaire
- **Structure** : SVO (Sujet-Verbe-Objet)
- **Infinitif** : Préfixe TO
- **Passé** : Suffixe RE
- **Futur** : Suffixe DA
- **Nombres** : Système additif (27 = [2-10-7])

### Exemples
- **Paradej** [PA-RA-DE-J] : Bonjour
- **O aijdenai dei** [O-A-I-J-DE-NAI-DEI] : Je t'aime

## 🛠️ Développement

### Scripts disponibles
- `npm run dev` : Lance l'app en mode développement
- `npm run build` : Build du frontend
- `npm run build:electron` : Crée les installers
- `npm run lint` : Vérification du code

### Contribuer
Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou une pull request.

## 📄 Licence
MIT © Cajev

## 🎨 Captures d'écran
_(À venir)_

---

**Créé avec ❤️ pour préserver et faire vivre la Moslingva**
