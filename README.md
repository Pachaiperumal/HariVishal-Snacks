# Hari Vishal Snacks

## Run locally
npm install
npm run dev

## Build
npm run build

## Firebase Hosting
1. Install Firebase CLI: npm install -g firebase-tools
2. Login: firebase login
3. Initialize Hosting if needed: firebase init hosting
4. Build: npm run build
5. Deploy: firebase deploy --only hosting

If firebase.json already exists, make sure the hosting public folder is `dist`.
