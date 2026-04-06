# AGENTS.md

## Repo Overview

This repository contains two separate Node applications:

- `web/`: the public BF Rodret website built with Next.js 13 App Router and exported as a static site.
- `studio/`: the Sanity Studio used to manage the site's content.

There is no root `package.json`. Run install, build, and dev commands inside `web/` or `studio/`.

Both apps pin Node via `.nvmrc` to `v18.17.0`.

## Workspace Map

### `web/`

- Framework: Next.js `^13.4.19`
- Rendering model: App Router with `output: 'export'`
- Styling: Sass from `web/sass/`, imported in [`web/app/layout.tsx`](/Users/martin.lissmyr@schibsted.com/Web/bf-rodret.se/web/app/layout.tsx)
- Content source: Sanity via [`web/client.js`](/Users/martin.lissmyr@schibsted.com/Web/bf-rodret.se/web/client.js)
- Shared UI building blocks live in `web/components/`
- GROQ helpers live in `web/helpers/`
- Static assets live in `web/public/`

Key routes:

- `/` from [`web/app/page.tsx`](/Users/martin.lissmyr@schibsted.com/Web/bf-rodret.se/web/app/page.tsx)
- `/foreningen` and `/foreningen/[slug]`
- `/om-huset`, `/om-huset/[slug]`, `/om-huset/bilder`, `/om-huset/bilder/[id]`, `/om-huset/tidslinje`
- `/garage`

### `studio/`

- Framework: Sanity Studio v3
- Main config: [`studio/sanity.config.ts`](/Users/martin.lissmyr@schibsted.com/Web/bf-rodret.se/studio/sanity.config.ts)
- Custom desk structure: [`studio/deskStructure.js`](/Users/martin.lissmyr@schibsted.com/Web/bf-rodret.se/studio/deskStructure.js)
- Schema entrypoint: [`studio/schemas/schema.js`](/Users/martin.lissmyr@schibsted.com/Web/bf-rodret.se/studio/schemas/schema.js)

The studio exposes two workspaces:

- `production` at `/prod`
- `development` at `/dev`

## Content Model

Frontend routes currently depend on these Sanity document types:

- `start`: homepage title, subtitle, hero image
- `informationArticle`: member information pages under `/foreningen/[slug]`
- `historyArticle`: history pages under `/om-huset/[slug]`
- `historyImage`: image index/detail pages under `/om-huset/bilder`
- `timelineEvent`: timeline page under `/om-huset/tidslinje`
- `garageParkingSlot` and `garageParkingSlotRental`: garage queue page under `/garage`

Other schema types in Studio:

- `member`
- `resource`
- `booking`
- `historyImageType`

These may be admin/member data even when there is no public route for them.

## Important Constraints

### Static export rules

The frontend uses [`web/next.config.js`](/Users/martin.lissmyr@schibsted.com/Web/bf-rodret.se/web/next.config.js) with `output: 'export'`. Keep changes compatible with static export:

- Do not introduce server-only runtime dependencies that require a live Node server in production.
- Dynamic routes must keep `generateStaticParams()` accurate.
- If you add a new dynamic App Router page, make sure all params are known at build time.

### Sanity dataset mismatch trap

The Studio has both `production` and `development` datasets, but the frontend client is hardcoded to:

- project ID `bjnjq7k1`
- dataset `production`

This is defined in [`web/client.js`](/Users/martin.lissmyr@schibsted.com/Web/bf-rodret.se/web/client.js). Changes made in the Studio's development workspace will not appear in the website unless the frontend client is changed or content is published to the production dataset.

### Sensitive/member data

The repository contains member and garage-related content models. Treat these as potentially sensitive:

- avoid exposing member emails, notes, or internal-only fields in public pages
- review garage/member changes carefully for accidental disclosure
- note that `/garage` is rendered in the public frontend codebase even though its metadata asks search engines not to index it

### Limited type safety

The frontend uses TypeScript, but [`web/tsconfig.json`](/Users/martin.lissmyr@schibsted.com/Web/bf-rodret.se/web/tsconfig.json) is not strict overall (`strict: false`, with `strictNullChecks: true`). Do not assume types are enforcing correctness; read the data flow.

## Existing Patterns

### Data fetching

- Pages query Sanity directly with `groq` and `client.fetch(...)`.
- Shared navigation data comes from [`web/helpers/get-toc-data-for-page-type.js`](/Users/martin.lissmyr@schibsted.com/Web/bf-rodret.se/web/helpers/get-toc-data-for-page-type.js).
- Rich text is rendered with `@portabletext/react`.
- Inline image references are resolved manually in GROQ.

### Imports

`web/tsconfig.json` sets `baseUrl` to `./`, so frontend code commonly uses absolute-style imports like `components/...`, `helpers/...`, and `types/...`.

### Styling

- Global Sass entrypoint: [`web/sass/main.scss`](/Users/martin.lissmyr@schibsted.com/Web/bf-rodret.se/web/sass/main.scss)
- Route/component styles are split across partials in `web/sass/`
- Fonts are configured in [`web/app/layout.tsx`](/Users/martin.lissmyr@schibsted.com/Web/bf-rodret.se/web/app/layout.tsx)

Preserve the existing visual language unless the task explicitly asks for redesign.

## Commands

Run these from the relevant app directory, not the repo root.

### Frontend

```bash
cd web
npm install
npm run dev
npm run build
```

Notes:

- `npm run export` is just an alias for `npm run build`
- local dev default is `http://localhost:3000`

### Sanity Studio

```bash
cd studio
npm install
npm run dev
npm run build
```

Notes:

- local Studio default is `http://localhost:3333`
- `npm run start` runs `sanity start`

## Verification Expectations

There are no dedicated lint or test scripts in the repo today. For most changes:

1. run `npm run build` in `web/` if the frontend was touched
2. run `npm run build` in `studio/` if Studio config or schemas were touched
3. manually inspect any changed GROQ query, route params, and content-model assumptions

If a change affects dynamic routes, verify that `generateStaticParams()` still covers all expected entries.

## Agent Guidance

- Read the relevant route and schema files before changing content-driven behavior.
- Prefer narrow edits that preserve current architecture; this is a small bespoke site, not a generalized platform.
- Do not add new tooling, package managers, or repo-wide build orchestration unless explicitly requested.
- Do not assume a root-level dev workflow exists.
- Keep Sanity schema names aligned with existing GROQ queries and route assumptions.
- When changing content structures, update both the Studio schema and every frontend query/component that depends on that shape.
- When touching `/garage` or member-related schemas, check for privacy regressions as a first-class concern.
