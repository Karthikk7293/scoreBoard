# Scoreboard

Scoreboard application with Express, PostgreSQL, and Socket.IO, plus browser pages for teams, players, and scores.

## Project scope

The backend uses PostgreSQL and Socket.IO. Configure the database through `config/config.js`; browser pages are under `frontend/scoreBoradFrontend/`. Docker configuration is included for local development.

## Run locally

Install Node.js and the package manager used below. Run each command block from the repository root; separate frontend/backend processes use separate terminals.

Root application:

```sh
pnpm install
pnpm run dev
```

## Source guide

- [index.js](index.js)
