---
name: add-page
description: Scaffold a new Vue page/view in this repo with i18n URL-path routing. Use when asked to "add a page", "ページを追加", "画面をつくって", "viewを追加して", "新しいルートを追加". Creates the view, registers it in routeChildren (so it works at both / and /:lang), and adds en/ja i18n keys — following Composition API, @/ alias, no-<script setup>, and Tailwind conventions.
---

# Add a Vue page

Every page renders at both `/<path>` and `/:lang/<path>` (e.g. `/about` and `/ja/about`) because
`src/router/index.ts` mounts one `routeChildren` list under both the `/:lang` tree and the root
tree. Add the page once to that list.

## Steps

### 1. View — `src/views/<Name>.vue`
Use Composition API via `defineComponent` / `setup()` (NOT `<script setup>` for real pages).
All display text goes through `$t()`; links go through `localizedUrl`.
```vue
<template>
  <div class="p-4">
    <h1 class="text-xl font-bold">{{ $t("profile.title") }}</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useHead } from "@unhead/vue";

export default defineComponent({
  name: "ProfilePage",
  setup() {
    useHead({ title: "Profile" });
    return {};
  },
});
</script>
```

### 2. Route — `src/router/index.ts`
Import the view and add ONE entry to `routeChildren` (both trees inherit it). Use a relative
child `path` (no leading slash):
```ts
import Profile from "@/views/Profile.vue";
// …
{ path: "profile", component: Profile },
```

### 3. i18n keys — `src/i18n/en.ts` AND `src/i18n/ja.ts`
Add the same key to **both** files (keep them in sync):
```ts
// en.ts
profile: { title: "Profile" },
// ja.ts
profile: { title: "プロフィール" },
```

### 4. Links to the page
Never hardcode `/ja/...`. Use `localizedUrl` from `useLang()` (`src/utils/utils.ts`) so the
current language is preserved:
```ts
const { localizedUrl } = useLang();
router.push(localizedUrl("/profile"));
```
Or `useLocalizedRoute()` for a ready-made push helper.

### 5. Auth guard (optional)
- Members-only page: `requireLogin("/account")` — redirects signed-out users.
- Login/landing page that should skip signed-in users: `noLoginPage("/mypage")`.
  Both live in `src/utils/utils.ts` and clean up their watchers on unmount.

### 6. Verify
```bash
yarn lint
yarn build
yarn serve   # check /profile AND /ja/profile
```

## Conventions
- `@/` alias imports (repo standard — do NOT use relative paths here).
- `emit` for child→parent, never function props. `ref` over `reactive`. No `v-html`.
- Tailwind utility classes; avoid `<style>` blocks. Double quotes, semicolons, 2-space indent.
