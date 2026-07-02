---
name: firebase-security-review
description: Audit this Firebase + Vue app for security issues before deploy. Use when asked to "security review", "セキュリティレビュー", "安全性チェック", "デプロイ前チェック", "脆弱性チェック", or after changing rules / functions / auth. Covers Firestore & Storage rules, App Check enforcement, exposed secrets, callable-function auth guards, and hosting / CSP headers. Reports findings with severity, file:line, and a concrete fix.
---

# Firebase security review

Audit the surfaces below. For each finding report **severity (High / Med / Low)**, `file:line`,
why it matters, and the concrete fix. Verify claims against the code — do not assume.

## 1. Firestore & Storage rules (`firestore.rules`, `storage.rules`)
- Default-deny catch-all present and last? Any `if true` / unauthenticated writes to real data?
- Per-user data gated on `request.auth.uid`? Write payloads validated (`hasOnly`, type/size)?
- Storage scoped per path, or a blanket `if request.auth != null` over `{allPaths=**}`?
  (deep-dive with the **firestore-rules** skill).

## 2. App Check
- `functions/src/wrappers/firebase.ts` → `enforceAppCheck`. If `false`, callables are reachable
  by anything with the public config.
- v2 callables should reject un-attested calls:
  ```ts
  if (context.app == undefined) {
    throw new HttpsError("failed-precondition", "…App Check verified app.");
  }
  ```
  Confirm each `onCall` in `functions/src/wrappers/` has this guard (see `wrappers/func.ts`).

## 3. Secrets vs. public config
- `src/config/project.ts` firebaseConfig is **public web config — not a leak.** Don't flag it.
- DO flag: service-account JSON, private keys, API secrets, or tokens committed anywhere, or
  secrets hardcoded in `functions/` instead of `functions.config()` / Secret Manager
  (`secretKeys` in `wrappers/firebase.ts`). Grep for `PRIVATE KEY`, `secret`, `token`, `.json`
  credential files.

## 4. Function authorization & input
- Every `onCall` that touches user data must check `context.auth` before acting — a signed-out
  or wrong user must not read/write another's data.
- HTTP servers (`functions/functions/server/*` hono/express) exposed via hosting rewrites
  (`/api/*`, `/hono_api/*`, `/v2_api/*`): validate/authorize each route; don't trust the body.
- Set sane `runWith` limits (`maxInstances`, `timeoutSeconds`, `memory`) to cap abuse/cost.

## 5. Hosting headers (`firebase.json`)
- Confirm CSP `frame-ancestors 'none'`, `X-Frame-Options: deny`, `X-Content-Type-Options:
  nosniff`, `Referrer-Policy: no-referrer` are still present on `source: "**"`.

## 6. Frontend
- No `v-html` (XSS); no secrets in client code; auth guards (`requireLogin`) actually block
  protected views rather than only hiding UI.

## 7. Dependencies
- `yarn npm audit` (root and `functions/`) for known-vulnerable packages; note Dependabot alerts.

## Output
Group findings by severity, most severe first. If clean, say so explicitly and list what was
checked. Recommend the exact deploy scope for any fix
(`firebase deploy --only firestore:rules` etc.).
