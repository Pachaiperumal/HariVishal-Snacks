# Hari Vishal Snacks

## Run locally
npm install
npm run dev

The project is split into two folders:

- `frontend/` - React and Vite storefront
- `backend/` - Node API service

Run the backend separately with `npm run backend`. Its health endpoint is available at `http://localhost:4000/api/health`.

## Build
npm run build

## Firebase Hosting
1. Install Firebase CLI: npm install -g firebase-tools
2. Login: firebase login
3. Initialize Hosting if needed: firebase init hosting
4. Build: npm run build
5. Deploy: firebase deploy --only hosting

If firebase.json already exists, make sure the hosting public folder is `dist`.
