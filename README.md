# DriverOS SA

**Community Finance & Operations Platform for E-Hailing Drivers**

## Stack
- React 18 + TypeScript
- Vite 6
- **Tailwind CSS v3** (with PostCSS + Autoprefixer)
- Leaflet 1.9 (live map + Nominatim search)
- gh-pages deployment

## CSS Architecture

| File | Purpose |
|---|---|
| `src/styles/globals.css` | `@tailwind base/components/utilities` + base resets + Leaflet overrides |
| `src/styles/components.css` | All reusable `@layer components` classes (40+ classes) |

Every component uses **Tailwind utility classes** — zero inline `style={{}}` objects (except dynamic values like widths from data).

## Project Structure
```
src/
├── assets/          logo.png, favicon copied to public/
├── components/      LiveMap, SearchBar, WalletModals, UI.tsx
├── context/         ThemeContext (dark/light — syncs .dark on <html>)
├── data/            serviceData.ts
├── hooks/           useLeaflet.ts
├── pages/           14 pages (flat — no sub-folders)
├── styles/          globals.css  components.css
├── types/           index.ts
└── utils/           cn.ts (clsx helper)
```

## Run locally
```bash
npm install
npm run dev   # http://localhost:3000
```

## Deploy
```bash
git remote add origin https://github.com/CredoMandlhazi/driveros.git
git add . && git commit -m "feat: initial release"
git push -u origin main
# GitHub Actions auto-deploys → https://CredoMandlhazi.github.io/driveros
```
