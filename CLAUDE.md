# CLAUDE.md

Guidance for Claude Code when working in this repository. It complements the global
`~/.claude/CLAUDE.md`; where the two differ, the notes here win **inside this repo**
(most importantly: this repo uses `@/` alias imports, not relative paths).

## What this is

A production-ready starter kit for **Firebase + Vue 3** web apps. Cloning it gives you a
working app — social auth, i18n URL-path routing, a Pinia store, and Cloud Functions — to
build on top of. Two independent npm packages live here:

- **Root (`/`)** — the Vue 3 SPA (Vite), deployed to Firebase Hosting.
- **`functions/`** — Cloud Functions (TypeScript), deployed to `asia-northeast1` (Tokyo).

Each has its own `package.json`, `yarn.lock`, `tsconfig.json`, and eslint config.
**Install, lint, and build them separately.**

## After cloning

```bash
# 1. Install both packages (yarn — never npm)
yarn install
yarn --cwd functions install

# 2. Install the Firebase CLI once
yarn global add firebase-tools     # or: npm i -g firebase-tools

# 3. Point the kit at YOUR Firebase project
#    - Firebase console -> create project -> add a Web app (</>)
#    - paste the SDK config into src/config/project.ts (firebaseConfig)
#    - replace "fir-vue-startup-kit" in .firebaserc with your project id
#    - enable Firestore, Authentication (Google / Facebook), and Hosting

# 4. Run locally
yarn serve                    # Vite dev server -> http://localhost:8080
yarn --cwd functions serve    # Functions emulator
```

`src/config/project.ts` is committed with the demo project's config. Those Firebase **web**
API keys are *not* secrets — web keys are public by design; access is enforced by Firestore /
Storage rules and App Check, not by hiding the key. Replace them with your own project's values.

## Commands

Root (Vue app):

| Command | What it does |
|---|---|
| `yarn serve` | Vite dev server (port 8080) |
| `yarn build` | `vue-tsc` typecheck + `vite build` -> `dist/` |
| `yarn lint` | ESLint over `src` |
| `yarn format` | Prettier write |

Functions (`yarn --cwd functions <script>`):

| Command | What it does |
|---|---|
| `yarn build` | `tsc` -> `lib/` |
| `yarn lint` / `yarn format` | ESLint / Prettier |
| `yarn serve` | build + functions emulator |
| `yarn deploy` | `firebase deploy --only functions` |
| `yarn logs` | tail function logs |

CI (`.github/workflows/pull_request.yaml`) runs lint + build for **both** packages on Node 24.
Run `yarn lint && yarn build` in each before pushing.

## Project structure

```
src/
  config/project.ts      firebaseConfig (replace with your project)
  utils/firebase.ts      initializeApp + db / auth / functions (asia-northeast1)
  utils/functions.ts     httpsCallable wrappers for client -> function calls
  utils/SocialLogin.ts   Google / Facebook signInWithPopup
  utils/utils.ts         useUser / useIsSignedIn / requireLogin / noLoginPage / useLang
  store/index.ts         Pinia store — holds the auth User
  router/index.ts        routes; every page is nested under /:lang AND root
  i18n/                  en.ts / ja.ts messages, languages.ts, utils.ts (useI18nParam)
  components/Layout.vue  wires onAuthStateChanged -> store, and useI18nParam
  views/                 pages (Home, About, Account, MyPage)
functions/src/
  index.ts               registers functions via exportIfNeeded(...)
  common/exportifneeded.ts   cold-start loader
  functions/             business logic (hono / express servers, callables)
  wrappers/              firebase-functions config (region / memory / timeout) per function
firestore.rules / storage.rules    security rules
firebase.json            hosting (headers, rewrites), functions, firestore, storage
```

## Key patterns (read before editing)

### Cloud Functions — cold-start optimization
`functions/src/index.ts` registers each function with `exportIfNeeded(name, file, exports)`.
At runtime only the invoked function's module is `require`d, keeping cold starts small. Each
function is split in two:
- `functions/src/functions/<x>.ts` — the logic (kept testable).
- `functions/src/wrappers/<x>.ts` — the `firebase-functions` binding (region, memory, timeout,
  App Check).

Adding one: write logic + wrapper, register in `index.ts`, and for callables add an
`httpsCallable` in `src/utils/functions.ts`. → skill **add-function**.

### i18n URL-path routing
Pages render at both `/` and `/:lang/` (e.g. `/about`, `/ja/about`). New pages go in
`routeChildren` in `src/router/index.ts` so both trees pick them up. `Layout.vue` calls
`useI18nParam()` to sync `route.params.lang` -> i18n locale. Build links with `localizedUrl()`
(from `useLang()`); never hardcode `/ja/...`. All display text uses `$t()` / `$n()` — add keys
to **both** `src/i18n/en.ts` and `src/i18n/ja.ts`. → skill **add-page**.

### Auth state
`Layout.vue` subscribes to `auth.onAuthStateChanged` and pushes the user into the Pinia store.
Read it via `useUser()` / `useIsSignedIn()`. Guard pages with `requireLogin(path)` /
`noLoginPage(path)` from `src/utils/utils.ts`.

## Conventions

The authoritative style guide is **`docs/StyleGuide.md`** (Japanese). Highlights, enforced by a
strict eslint config (`eslint.configs.all` + typescript-eslint strict + vue strongly-recommended
+ sonarjs):

- **Vue**: Composition API. Avoid `<script setup>` for non-trivial components (this repo prefers
  explicit `defineComponent` / `setup()` so template-facing vs internal state stays visible);
  reserve `<script setup>` for tiny components. Use `emit`, not function props. Prefer `ref` over
  `reactive`. Never `v-html`.
- **Imports**: use the **`@/` alias** (configured in `vite.config.js` + `tsconfig.json`).
  ⚠️ This overrides the global "relative paths only" rule *inside this repo* — the whole codebase
  and the StyleGuide use `@/`.
- **TypeScript**: explicit types; no `any` / `unknown`; avoid `as`. Double quotes, semicolons,
  2-space indent (all eslint-enforced).
- **i18n**: never hardcode strings in templates — `$t()` / `$n()`, `localizedUrl` for links.
- **Firestore**: modular v9+ API; wrap document data in model classes (`src/models/`, per the
  StyleGuide) so types + mutations live in one place; always detach `onSnapshot` listeners.
- **Style**: Tailwind utility classes; avoid `<style>` blocks unless unavoidable.
- **Git**: small frequent commits, no rebase, no force-push; run `yarn format` before committing.

## Deploy

```bash
yarn build              # produce dist/ (hosting serves this)
firebase deploy         # hosting + functions + rules
# or scope it:
firebase deploy --only hosting
firebase deploy --only functions
firebase deploy --only firestore:rules,storage
```

The functions predeploy hook (`firebase.json`) auto-runs lint + build. Functions and their
client callers (`src/utils/firebase.ts`) both pin **`asia-northeast1`** — change both together if
you move regions. Hosting rewrites `/hono_api/*`, `/api/*`, `/v2_api/*` to server functions.

## Security

- **Rules default-deny**: `firestore.rules` ends with `allow read, write: if false`; open only
  what each collection needs. `storage.rules` requires `request.auth != null`.
- **App Check**: enforce it on callables — either the `enforceAppCheck: true` option, or a manual
  guard (`if (request.app == undefined) throw new HttpsError(...)`).
- **Hosting headers**: CSP `frame-ancestors 'none'`, `X-Frame-Options: deny`, `nosniff`,
  `no-referrer` (`firebase.json`).
- Run skill **firebase-security-review** before deploying rule or function changes.

## Skills (`.claude/skills/`)

- **firestore-rules** — write / review Firestore & Storage security rules.
- **firebase-security-review** — audit rules, App Check, secrets, auth guards, headers.
- **add-function** — scaffold a Cloud Function in the `exportIfNeeded` pattern.
- **add-page** — scaffold a Vue page + route + i18n keys.
