# Search App (Vite + React)

Simple React app with a search box that queries an API and shows results. Clicking a result shows its full content.

## Stack
- Vite + React + TypeScript

## Run locally

```bash
npm install # or npm install / yarn
npm dev     # or npm run dev / yarn dev
```

Then open `http://localhost:5173`.

## Build

```bash
pnpm build # or npm run build / yarn build
pnpm preview
```

## Notes
- Input is debounced (300ms)
- Selecting a result opens a detail panel; close it with the button


