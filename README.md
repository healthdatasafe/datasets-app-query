# HDS DataSets Search App

Simple React app with a search box that queries HDS datasets.datasafe.dev API and shows results. 

Can be tested on: [https://app-datasets.datasafe.dev](https://app-datasets.datasafe.dev)

Based on the datasets exposed by: [Datasets Service](https://github.com/healthdatasafe/datasets-service)

## Stack
- Vite + React + TypeScript

## Setup

```bash
scripts/setup.sh   # or: npm run setup
```

Installs the node modules and clones the `gh-pages` branch into `dist/` (needed only to deploy).

## Run locally

```bash
npm run dev
```

Then open <https://app-datasets.backloop.dev:5173/>. The dev server runs over HTTPS on a `*.backloop.dev` hostname,
which resolves to `127.0.0.1`, with certificates from the [`backloop.dev`](https://github.com/perki/backloop.dev-node)
package. `npm run dev:raw` starts it without backloop.dev. Vite takes the next free port if 5173 is busy, and
`npm run dev -- --port <port>` picks one.

### Datasets API

On `*.datasafe.dev` the app queries `https://datasets.datasafe.dev/`; elsewhere it queries a local datasets service at
`https://datasets.backloop.dev:7442/`. Set `VITE_DATASETS_API` to query another base, for example a workspace whose
ports are offset, reaching the service through its backloop gateway:

```bash
VITE_DATASETS_API=https://datasets.backloop.dev:7754/ npm run dev
```

## Build

```bash
npm run build
```

## Deploy

```bash
npm run deploy
```

Deploys `main` to the `gh-pages` branch (served at <https://app-datasets.datasafe.dev>) from a clean tree that is not
behind `origin/main`, writes `version.json` (commit, branch, build date) and waits until the site serves it. Run the
setup first so that `dist/` is the `gh-pages` checkout.

## License

[BSD-3-Clause](LICENSE)
