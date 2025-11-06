# 🎯 Kiki-Web - Job Application Platform

> Une plateforme complète de gestion des offres d'emploi et profils professionnels, construite avec Vite, React, TypeScript et Supabase.

![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue)
![TypeScript](https://img.shields.io/badge/typescript-5.0-blue)
![React](https://img.shields.io/badge/react-18-blue)
![Vite](https://img.shields.io/badge/vite-latest-green)

## 📋 Table des matières

- [🚀 Démarrage rapide](#-démarrage-rapide)
- [🏗️ Architecture](#️-architecture)
- [🔐 Authentification](#-authentification)
- [⚙️ Configuration](#️-configuration)
- [📦 Dépendances](#-dépendances)
- [🚢 Déploiement](#-déploiement)
- [📝 Documentation API](#-documentation-api)

## 🚀 Démarrage rapide

### Prérequis

- Node.js 18.x ou supérieur
- npm ou yarn
- Compte Supabase (gratuit)
- Clé API Gemini (optionnel)

### Installation

1. **Cloner le repository**

```bash
git clone https://github.com/jeancybingolo8-hub/kiki-web.git
cd kiki-web
```

2. **Installer les dépendances**

```bash
npm install
```

3. **Configurer les variables d'environnement**

Copier le fichier `.env.local.example` en `.env.local` et remplir les valeurs :

```bash
cp .env.local.example .env.local
```

Editer `.env.local` :

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key

# Backend Configuration (si backend séparé)
VITE_API_URL=http://localhost:3001
```

4. **Lancer l'application en développement**

```bash
npm run dev
```

L'application est disponible à `http://localhost:5173`

## 🏗️ Architecture

### Structure du projet

```
kiki-web/
├── src/
│   ├── components/           # Composants React
│   │   ├── Icons/           # Icônes personnalisées
│   │   ├── Header/          # En-tête de l'application
│   │   ├── JobCard/         # Carte d'offre d'emploi
│   │   ├── CandidateViews/  # Vue candidat
│   │   ├── RecruiterViews/  # Vue recruteur
│   │   └── BottomNavBar/    # Barre de navigation
│   ├── contexts/            # React Contexts
│   │   ├── AuthContext.tsx  # Context d'authentification
│   │   └── useAuth.ts       # Hook personnalisé
│   ├── services/            # Services et APIs
│   │   ├── supabaseClient.ts    # Client Supabase
│   │   ├── authService.ts       # Service d'authentification
│   │   └── geminiService.ts     # Service Gemini (optionnel)
│   ├── hooks/               # Custom hooks
│   │   └── useMockData.ts   # Hook pour données de test
│   ├── App.tsx              # Composant principal
│   ├── index.tsx            # Point d'entrée React
│   ├── i18n.ts              # Configuration i18n
│   └── index.html           # HTML principal
├── public/                  # Assets statiques
├── .env.local.example       # Exemple de configuration
├── .gitignore               # Fichiers à ignorer
├── package.json             # Dépendances npm
├── tsconfig.json            # Configuration TypeScript
├── vite.config.ts           # Configuration Vite
├── vercel.json              # Configuration Vercel
├── README.md                # Cette documentation
└── types.ts                 # Types TypeScript
```

### Stack technologique

| Technologie | Version | Utilisation |
|-------------|---------|-------------|
| **Frontend** | | |
| Vite | Latest | Build tool & dev server |
| React | 18.x | UI Framework |
| TypeScript | 5.x | Type safety |
| **Backend/Database** | | |
| Supabase | Cloud | Database & Authentication |
| PostgreSQL | Latest | Base de données |
| **Deployment** | | |
| Vercel | Cloud | Hosting & CI/CD |

## 🔐 Authentification

### Configuration Supabase

1. **Créer un compte Supabase** à https://supabase.com
2. **Créer un nouveau projet**
3. **Récupérer les credentials** :
   - URL Supabase
   - Clé anonyme (Anon Key)
   - Clé Service Role (pour le backend)

### Structure des tables

#### Users (Gérée par Supabase Auth)
- `id` (UUID) - Identifiant unique
- `email` (string) - Email
- `created_at` (timestamp)
- `user_metadata` - Métadonnées personnalisées

#### Profiles
```sql
CREATE TABLE profiles (
  id UUID PRIMARY KEY,
  user_type VARCHAR(20) CHECK (user_type IN ('candidate', 'recruiter')),
  name VARCHAR(255),
  bio TEXT,
  location VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE
);
```

#### Offers (Offres d'emploi)
```sql
CREATE TABLE offers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  recruiter_id UUID NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  location VARCHAR(255),
  salary_range VARCHAR(100),
  job_type VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (recruiter_id) REFERENCES profiles(id) ON DELETE CASCADE
);
```

### Service d'authentification

Le service d'authentification (`src/services/authService.ts`) fournit :

- **`login(email, password)`** - Connexion utilisateur
- **`signup(email, password, name, userType)`** - Inscription utilisateur
- **`logout()`** - Déconnexion
- **`getCurrentUser()`** - Récupérer l'utilisateur courant
- **`getCurrentSession()`** - Récupérer la session JWT

### Utilisation de l'Auth Context

```tsx
import { useAuth } from '@/contexts/useAuth';

export function MyComponent() {
  const { user, isAuthenticated, login, logout } = useAuth();

  return (
    <div>
      {isAuthenticated ? (
        <>
          <p>Welcome, {user?.name}!</p>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <button onClick={() => login(email, password)}>Login</button>
      )}
    </div>
  );
}
```

## ⚙️ Configuration

### Variables d'environnement

Créer un fichier `.env.local` à la racine du projet :

```env
# ========================================
# Supabase Configuration
# ========================================
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# ========================================
# JWT Configuration
# ========================================
JWT_SECRET=your-jwt-secret-key
JWT_EXPIRY=24h

# ========================================
# API Configuration
# ========================================
VITE_API_URL=http://localhost:3001
VITE_ENV=development

# ========================================
# Vercel Configuration (Optional)
# ========================================
NODE_ENV=development
```

### Configuration Vite

Le fichier `vite.config.ts` configure :
- TypeScript avec React
- Assets optimization
- Source maps en développement

## 📦 Dépendances

```bash
npm install
```

Principales dépendances :
- `@supabase/supabase-js` - Client Supabase
- `react` - UI Framework
- `react-dom` - DOM rendering
- `typescript` - Type support

## 🚢 Déploiement

### Déploiement sur Vercel

1. **Pousser le code sur GitHub** (déjà fait ✅)

2. **Connecter Vercel à GitHub**
   - Aller sur https://vercel.com
   - Cliquer "New Project"
   - Sélectionner le repository `kiki-web`

3. **Configurer les variables d'environnement**
   Dans les paramètres Vercel du projet :
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `VITE_API_URL` (si backend)

4. **Déployer**
   - Cliquer "Deploy"
   - Le projet est automatiquement déployé à chaque push sur `main`

### Configuration vercel.json

Le fichier `vercel.json` configure :
- Build command : `npm run build`
- Dev command : `npm run dev`
- Framework : Vite
- Node version : 18.x
- Environment variables

## 📝 Documentation API

### Endpoints d'authentification (Future)

```
POST   /api/auth/signup       - Créer un nouveau compte
POST   /api/auth/login        - Se connecter
POST   /api/auth/logout       - Se déconnecter
GET    /api/auth/me           - Récupérer l'utilisateur courant
```

### Endpoints de profils (Future)

```
GET    /api/profiles/:id      - Récupérer un profil
PUT    /api/profiles/:id      - Mettre à jour un profil
GET    /api/profiles          - Lister les profils
```

### Endpoints d'offres (Future)

```
GET    /api/offers            - Lister les offres
GET    /api/offers/:id        - Récupérer une offre
POST   /api/offers            - Créer une offre (recruiter only)
PUT    /api/offers/:id        - Mettre à jour une offre
DELETE /api/offers/:id        - Supprimer une offre
```

## 🛠️ Scripts npm

```bash
# Développement
npm run dev          # Lancer le serveur de dev
npm run build        # Build pour production
npm run preview      # Prévisualiser la build

# Linting (si configuré)
npm run lint         # Linter le code
```

## 📄 Licence

MIT License - Voir [LICENSE](LICENSE) pour plus de détails

## 🤝 Contribution

Les contributions sont les bienvenues ! Veuillez :

1. Fork le repository
2. Créer une branche `feature/my-feature`
3. Commit vos changements
4. Pousser vers la branche
5. Ouvrir une Pull Request

## 📞 Support

Pour toute question ou problème :
- Ouvrir une [Issue](https://github.com/jeancybingolo8-hub/kiki-web/issues)
- Contacter : [jean.cybingolo@example.com](mailto:jean.cybingolo@example.com)

---

**Dernière mise à jour** : November 5, 2025

✨ Built with ❤️ using Vite, React, TypeScript & Supabase


## Production Status
✅ Application is now live and ready for production use!
Deployed on Vercel with Supabase backend integration.
