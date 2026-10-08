# FleetCare Frontend v6

Vue 3 + Vite + Pinia + PrimeVue + Vue I18n + JSON Server.

## Run

```bash
npm install
npm run server
```

In another terminal:

```bash
npm run dev
```

- App: http://localhost:5173/login
- JSON Server: http://localhost:3000/api/vehicles

Demo:

- carlos@fleetcare.local
- FleetCare123!

## Formatting

```bash
npm run format
npm run format:check
```

The GraphQL reference is intentionally ignored by Prettier because its `@db.*` directives are not standard GraphQL syntax.

## Verification

`npm install` runs Prettier automatically through `postinstall`. Then run `npm run verify` to check formatting and produce a Vite build.
