---
name: firestore-rules
description: Write or review Firebase Firestore (firestore.rules) and Storage (storage.rules) security rules for this repo. Use when adding a collection, changing access control, or auditing rules — triggers like "firestore rules", "セキュリティルール", "rulesを書いて", "このコレクションのread/writeを許可して", "storage.rules", "権限設定". Enforces default-deny, request.auth checks, field validation, and emulator testing.
---

# Firestore / Storage security rules

Security rules are the ONLY thing standing between the public internet and the database —
the Firebase web API key is public, so rules (plus App Check) are the real access control.

## Files
- `firestore.rules` — Firestore access, referenced by `firebase.json` (`firestore.rules`).
- `storage.rules` — Cloud Storage access.
- `firestore.indexes.json` — composite indexes (add here when a query needs one).

## Non-negotiables

1. **Default-deny stays last.** Keep the catch-all at the bottom and never loosen it:
   ```
   match /{document=**} {
     allow read, write: if false;
   }
   ```
   Grant access per collection ABOVE it; the most specific match wins.

2. **Split the verbs.** `read` = `get` + `list`; `write` = `create` + `update` + `delete`.
   Grant only what the feature needs. Current repo pattern:
   ```
   match /message/{messageId} {
     allow read, create;              // public read + append
     allow delete, update: if false;  // immutable, no removal
   }
   ```

3. **Gate on auth, then on ownership.** For user-owned data check both the caller and the doc:
   ```
   match /users/{uid} {
     allow read: if request.auth != null && request.auth.uid == uid;
     allow write: if request.auth != null
                  && request.auth.uid == uid
                  && request.resource.data.keys().hasOnly(["name", "email", "updatedAt"]);
   }
   ```

4. **Validate the payload on writes.** Use `request.resource.data` to constrain shape / types /
   size; use `resource.data` for the pre-write state. Reject unexpected fields with `hasOnly`.

5. **Never call functions / external services from rules.** Rules must be pure and fast.

## Storage rules
`storage.rules` currently grants any signed-in user full access:
```
match /{allPaths=**} {
  allow read, write: if request.auth != null;
}
```
Tighten per path when you add uploads — scope by `uid`, validate `request.resource.size` and
`request.resource.contentType` (e.g. images under a size cap).

## Test before shipping
```bash
firebase emulators:start --only firestore,storage   # exercise reads/writes manually
# or write rules unit tests with @firebase/rules-unit-testing and run against the emulator
```
Cover: allowed happy path, unauthenticated denial, wrong-owner denial, malformed-payload denial,
and the default-deny catch-all for an unlisted collection.

## Review checklist
- [ ] Default-deny catch-all present and unmodified.
- [ ] No `allow read, write: if true` or unauthenticated writes to real data.
- [ ] Ownership enforced (`request.auth.uid == …`) for per-user data.
- [ ] Write payloads validated (`hasOnly`, type/size checks).
- [ ] New indexed queries have entries in `firestore.indexes.json`.
- [ ] Storage paths scoped + size/content-type limited (not blanket auth).
- [ ] Emulator-tested: allow AND deny cases.

After changes: `firebase deploy --only firestore:rules,storage`. For a broader pass run the
**firebase-security-review** skill.
