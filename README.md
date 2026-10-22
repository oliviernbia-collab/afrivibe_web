# AfriVibe — Application web

React + Vite + TypeScript + Tailwind CSS. Reproduit la maquette fournie
(sidebar, fil central, panneau latéral tendances/portefeuille), thème sombre
uniquement, icônes Font Awesome (`@fortawesome/react-fontawesome`).

## Démarrage

```bash
cp .env.example .env
npm install
npm run dev
```

Application sur `http://localhost:5173`. `VITE_API_URL` pointe vers l'API
NestJS (`http://localhost:3000/api/v1` par défaut).

## Structure

```
src/
├── api/            Client Axios + fonctions par domaine
├── components/      Sidebar, Topbar, RightPanel, PostCard, GiftModal…
├── layouts/          AppLayout (utilisateur) et AdminLayout (back-office)
├── pages/            Pages utilisateur + pages admin/
├── store/            État global (Zustand) — session utilisateur
└── types/            Types partagés avec l'API
```

## Back-office

Un utilisateur dont le rôle est `admin`, `moderator`, `finance` ou `support`
accède à `/admin` : tableau de bord (utilisateurs, publications, Vibes,
retraits en attente, signalements, revenus de commission), validation des
retraits Mobile Money/Visa, traitement des signalements.

Compte admin de démarrage : exécuter `npm run seed` dans `backend/` puis se
connecter avec `admin@afrivibe.local` / `ChangeMe123!` (à changer
immédiatement en production).

## Non couvert par ce build

Vibes (renvoie vers l'app mobile, cf. cahier des charges — l'expérience
plein écran est pensée mobile-first), messagerie privée (phase 2), espace
annonceur, upload de médias dans le composeur (texte uniquement pour
l'instant).
