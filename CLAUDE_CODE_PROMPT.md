# Prompt for Claude Code

Paste the section below into Claude Code once you've unzipped this project into your new folder and run `npm install`.

---

I'm building an API portal with Fastify, PostgreSQL, and Knex. This zip contains a working scaffold — please review it and continue from here.

**Stack already in place:**
- Fastify (`src/app.js`, `src/server.js`)
- Knex + `pg` for PostgreSQL, configured in `knexfile.js` and `src/db/knex.js`
- Awilix (`@fastify/awilix`) for dependency injection — see `src/plugins/awilix.js`
- `@fastify/swagger` + `@fastify/swagger-ui` mounted at `/docs` as the API portal
- A working example: `users` table migration, `userService` (DI-based), `users` routes with JSON schema validation, and a passing test in `test/userService.test.js` that mocks Knex via Awilix

**What I need next:**
1. Confirm the scaffold runs: help me set up `.env` from `.env.example`, run `npm run migrate`, then `npm run dev`, and verify `/docs` loads and `/users` CRUD works against my real Postgres instance.
2. Add a new table + full vertical slice (migration → service → schema → routes → test) for: **[TELL CLAUDE CODE THE NEXT TABLE NAME HERE, e.g. "products"]**
3. Follow the same pattern as `users` for consistency: Awilix-registered service, Fastify JSON schema validation on every route, and a test that mocks the injected `knex` dependency the same way `test/userService.test.js` does.
4. After that, help me add: rate limiting (`@fastify/rate-limit`), and tighten up error handling with `fastify.setErrorHandler`.

Let's go step by step, verifying each part works before moving to the next.

---

## Project structure reference

```
my-api-portal/
├── src/
│   ├── app.js              # Fastify instance + plugin registration
│   ├── server.js           # Entry point
│   ├── db/
│   │   ├── knex.js         # Knex instance, reads knexfile.js
│   │   ├── migrations/     # Table definitions
│   │   └── seeds/
│   ├── plugins/
│   │   ├── awilix.js       # DI container wiring
│   │   └── swagger.js      # /docs portal UI
│   ├── routes/
│   │   └── users.js        # Example CRUD routes
│   ├── schemas/
│   │   └── userSchema.js   # JSON Schema validation
│   └── services/
│       └── userService.js  # DI-injected service, takes `knex` as dependency
├── test/
│   └── userService.test.js # Mocks knex via Awilix container
├── knexfile.js
├── .env.example             # Copy to .env and fill in real Postgres credentials
└── package.json
```

## Notes
- `.env` is NOT included in this zip (gitignored) — you'll need to create it from `.env.example` with your real Postgres credentials.
- `node_modules` is NOT included — run `npm install` first.
