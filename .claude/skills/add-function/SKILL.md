---
name: add-function
description: Scaffold a new Firebase Cloud Function in this repo's exportIfNeeded cold-start pattern. Use when asked to "add a function", "functionを追加", "Cloud Functionをつくって", "callableを追加して", "APIエンドポイントを追加". Creates the functions/src/functions logic + wrappers config, registers it in index.ts, and (for callables) adds the client-side httpsCallable in src/utils/functions.ts.
---

# Add a Cloud Function

Functions are split in two so cold starts stay small and logic stays testable:
- **`functions/src/functions/<name>.ts`** — the business logic.
- **`functions/src/wrappers/<name>.ts`** — the `firebase-functions` binding (region, memory,
  timeout, App Check). Only the invoked wrapper is `require`d at runtime.

## Steps

### 1. Logic — `functions/src/functions/<name>.ts`
Keep it a plain async function that takes what it needs and returns data. Example:
```ts
import { CallableRequest } from "firebase-functions/v2/https";

export const greet = async (request: CallableRequest<{ name: string }>) => {
  const name = request.data.name ?? "world";
  return { message: `Hello, ${name}!` };
};
```

### 2. Wrapper — `functions/src/wrappers/<name>.ts`
Bind region / limits / App Check. Callable (v2) pattern:
```ts
import { onCall, HttpsError } from "firebase-functions/v2/https";
import { greet } from "../functions/greet";

const REGION = "asia-northeast1";

export default onCall({ region: REGION, memory: "1GiB", maxInstances: 5 }, async (request) => {
  if (request.app == undefined) {
    throw new HttpsError("failed-precondition", "Call must come from an App Check verified app.");
  }
  return await greet(request);
});
```
For an HTTP endpoint follow the hono/express wrappers
(`wrappers/server/hono.ts` → `onRequest({ region, memory, ... }, handler)` from
`firebase-functions/v2/https`), and add a hosting rewrite in `firebase.json`.

### 3. Register — `functions/src/index.ts`
```ts
exportIfNeeded("greet", "greet", exports);
// exportIfNeeded(publicFunctionName, wrapperFilePathUnderWrappers, exports)
```
The 1st arg is the deployed function name; the 2nd is the wrapper path relative to
`functions/src/wrappers/` (no extension).

### 4. Client hook (callables only) — `src/utils/functions.ts`
```ts
export const greetFunction = httpsCallable(functions, "greet");
```
Call it from a component: `const { data } = await greetFunction({ name });`. The client
`functions` instance is pinned to `asia-northeast1` (`src/utils/firebase.ts`) — the region must
match the wrapper.

### 5. Verify
```bash
yarn --cwd functions lint
yarn --cwd functions build
yarn --cwd functions serve   # emulator; exercise the function
```

## Conventions
- No `any`; type `request.data` and the return value. Double quotes, semicolons, 2-space indent.
- Set `maxInstances` / `timeoutSeconds` / `memory` deliberately (cost + abuse ceiling).
- Guard callables with the `request.app` App Check check and, for user data, `request.auth`.
- Deploy with `firebase deploy --only functions` (predeploy runs lint + build automatically).
