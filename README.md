# Gympass API

## About

API developed during Rocketseat backend online course

## Technologies

- Node
- Typescript | TSUP | TSX
- Fastify
- Docker
- Prisma
- Zod
- Vitest

## Commands

### Start server in DEVELOPMENT:

```bash
npm run dev
```

### Build app :

```bash
npm run build
```

### Start Server in PRODUCTION :

```bash
npm run start
```

### Run unit tests :

```bash
npm run test
```

### Run unit tests and keep watching:

```bash
npm run test:watch
```

### Run unit tests coverage:

```bash
npm run test:coverage
```

### Create migrations in DEVELOPMENT:

```bash
npm run prisma:dev
```

### Create migrations in PRODUCTION:

```bash
npm run prisma
```

### Open prisma studio:

```bash
npm run prisma:studio
```

## Config for Tests

- install `vitest | vite-tsconfig-paths | @vitest/coverage-c8`
- create file `./vite.config.ts`
  Configs of `vite.config.ts file`:

```ts
import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tsconfigPaths()],
});
```

obs: this file configuration makes tests accept paths aliases
