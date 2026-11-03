# 🚀 Getting started with Strapi

Strapi comes with a full featured [Command Line Interface](https://docs.strapi.io/dev-docs/cli) (CLI) which lets you scaffold and manage your project in seconds.

## 🗄️ Local development database

This project runs against an **isolated local PostgreSQL cluster** — never a remote/production one.

| Setting | Value |
| --- | --- |
| Host / port | `127.0.0.1:5544` (loopback only) |
| Database | `strapi_local` |
| Role / password | `strapi` / *(trust auth, local only)* |
| Data directory | `..\..\..\pgdata-strapi-local` (outside this repo) |
| Version | PostgreSQL 15 binaries |

The cluster is separate from any other PostgreSQL install on the machine and is never
exposed outside `127.0.0.1`. `config/database.ts` also honours `DATABASE_URL` — keep that
variable **unset** locally so it can never redirect development traffic elsewhere.

```bash
npm run dev             # starts the local cluster if needed, mirrors frontend tokens, then Strapi
npm run db:start        # start the local cluster only (safe to run repeatedly)
npm run db:stop         # stop the local cluster
npm run db:seed-tokens  # mirror the frontend API tokens into the local database
npm run dev:strapi      # run Strapi without touching the database
```

`npm run dev` boots both: it runs `db:start` first (a no-op if the cluster is already
up), then `db:seed-tokens`, and only then launches Strapi. `develop` behaves identically.

`db:start` launches the server without a console attached, so it keeps running after the
terminal closes. If PostgreSQL is installed somewhere other than
`C:\Program Files\PostgreSQL\15\bin`, set `PG_BIN` first.

### Frontend compatibility (API tokens)

The SPA/Next.js frontend in the sibling repository (`../../brandstory-global-fe`) reads
`STRAPI_*_API_TOKEN` from its own `.env` and sends them as `Authorization: Bearer …`.
Strapi only ever stores `HMAC-SHA512(token, API_TOKEN_SALT)`, so tokens that were issued
on production cannot be recovered from the dump. `npm run db:seed-tokens` closes that gap
without touching the frontend:

1. reads the tokens from the frontend `.env` (path overridable with `FRONTEND_ENV_PATH`),
2. hashes each with the local `API_TOKEN_SALT`,
3. inserts a `full-access` row in `strapi_api_tokens` when that hash is not present yet.

It is idempotent, writes no secret to this repository, and runs automatically as part of
`npm run dev`, so a freshly restored database accepts the frontend's existing tokens.
Media files are **not** part of the dump — copy `public/uploads` from the production host
if you need real images locally.

### Branch must match the dump

The production dump was taken on **2026-11-02**, and `main` on **2026-10-01** is older than
that. `origin/location-page-changes` adds the section components the dump contains
(`card-slider`, `client-logos`, `first-30-days`, `industry-results`, `our-process`,
`reviews-cta`, `team-performance` + their element components). Running `main` against this
dump makes Strapi drop those tables and the frontend's `populate` queries return `400`.

Work on a local branch of that history, never on `main`:

```bash
git checkout -b local-dev-location-page-changes origin/location-page-changes
```

If you ever restore the dump while on an older branch, restore it **again** after
switching, otherwise the dropped component data is lost in the local copy.

### Restoring / refreshing from a production dump

A dump is DB-only (media lives in `public/uploads`). Restore it into the local cluster:

```powershell
$env:PGCLIENTENCODING = 'UTF8'
& "C:\Program Files\PostgreSQL\15\bin\psql.exe" -h 127.0.0.1 -p 5544 -U strapi -d strapi_local `
  -v ON_ERROR_STOP=1 -f .\path\to\dump.sql
```

Note: on boot Strapi drops tables belonging to content types/components that no longer
exist in this codebase, so table counts may shrink after the first `develop` run. That is
normal schema sync and only affects the local copy.

### `develop`

Start your Strapi application with autoReload enabled. [Learn more](https://docs.strapi.io/dev-docs/cli#strapi-develop)

```
npm run develop
# or
yarn develop
```

### `start`

Start your Strapi application with autoReload disabled. [Learn more](https://docs.strapi.io/dev-docs/cli#strapi-start)

```
npm run start
# or
yarn start
```

### `build`

Build your admin panel. [Learn more](https://docs.strapi.io/dev-docs/cli#strapi-build)

```
npm run build
# or
yarn build
```

## ⚙️ Deployment

Strapi gives you many possible deployment options for your project including [Strapi Cloud](https://cloud.strapi.io). Browse the [deployment section of the documentation](https://docs.strapi.io/dev-docs/deployment) to find the best solution for your use case.

```
yarn strapi deploy
```

## 📚 Learn more

- [Resource center](https://strapi.io/resource-center) - Strapi resource center.
- [Strapi documentation](https://docs.strapi.io) - Official Strapi documentation.
- [Strapi tutorials](https://strapi.io/tutorials) - List of tutorials made by the core team and the community.
- [Strapi blog](https://strapi.io/blog) - Official Strapi blog containing articles made by the Strapi team and the community.
- [Changelog](https://strapi.io/changelog) - Find out about the Strapi product updates, new features and general improvements.

Feel free to check out the [Strapi GitHub repository](https://github.com/strapi/strapi). Your feedback and contributions are welcome!

## ✨ Community

- [Discord](https://discord.strapi.io) - Come chat with the Strapi community including the core team.
- [Forum](https://forum.strapi.io/) - Place to discuss, ask questions and find answers, show your Strapi project and get feedback or just talk with other Community members.
- [Awesome Strapi](https://github.com/strapi/awesome-strapi) - A curated list of awesome things related to Strapi.

---

<sub>🤫 Psst! [Strapi is hiring](https://strapi.io/careers).</sub>
