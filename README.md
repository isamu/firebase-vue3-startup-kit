# 🔥firebase-vue3-startup-kit🔥

## 🎯 Purpose

This is a Start-Up kit for a Firebase web project, which uses Vue3 and firebase 9.

This package includes vite, vue-router, pinia, tailwindcss, prettier, vue-tsc

## 📋 Requirements

- Node.js version 16 or later.

## 📖 Instruction

1. Git clone this repository
2. Run "yarn global add firebase-tools" to install firebase tools.
3. Run "yarn install" once to get necessary node modules.
4. Run "yarn install" once in the functions directory as well.
5. Open the firebase console (from https://firebase.google.com) and add a project
6. From the dashboard of this project, add an app and choose "web" (</>).
7. From the setting of this app, choose "Config" (in Firebase SDK snippet)
8. Copy the config file, and paste into src/config/project.ts file.
9. Replace the word "fir-vue-startup-kit" in .firebaserc file with your Firebase project name.
10. Open the firebase console, and create a Cloud Firestore (make it "secure" for now).
11. Enable Firebase Hosting on the firebase console.

## 💻 Functions
Because Firebase Functions is very slow in the case of cold start by default setting, this startup-kit is a bit of a custom Firebase functions.

### Functions side
 - Functions is invoked using a wrapper function (`exportIfNeeded` function in `functions/src/common/exportifneeded.ts`). It loads only the functions it needs.
 - Functions will start with enough memory. `test` function in `functions/src/wrappers/tests/test.ts` run with 1GB memory.
 - Functions run in a nearby region. In my case it is Japan, so it is set in the Japanese region. Please change it to suit your location.

For this reason, Functions are used in a slightly unusual way.
Functions called by the client are written in `src/index.ts` like `exportIfNeeded ("test", "tests/test", exports);`

In this case, the client calls test as a function. And when the client call the test Function, the default function in `functions/src/wrappers/tests/test.ts` is called. See this file for more information.

###  Vue.js side.
 - The functions settings are in `src/utils/firebase.ts`. By default, it set to call asia-northeast1 (Tokyo) region.
 - All functions put together in `src/utils/functions.ts`. You should add new functions in this file.

### Region

The region of Functions is set in asia-northeast1(Tokyo). If you change the region, be sure to change both Vue.js in Functions.

## 🌎 i18n
 - This startup-kit supports i18n using url path.
 - You can use one Vue file in both `/en/index` and `/jp/index` .
 - Language files are in `src/i18n/` directory.
    - `en.ts` and `ja.ts` are Language files.
    - The language file used for the language switching pull-down (select) is `language.ts`. The same file is read from `en.ts` and `ja.ts`. Write in each language.
    - If you want to add new language, add the language to `index.ts`, add the `{language}.ts`, and add language to `language.ts`.
 - See also `src/router/index.ts` for how to switch languages with url path.
 - You can use the language switching pull-down in `src/components/Languages.vue`. This file needs to read `route.param.lang`, so don't use it in `App.vue` and `Layout.vue`. Other than that, it can be used anywhere.
 - i18n uses `vue-i18n@next`, so please refer to that for details on how to use it.


## 📄 Available Scripts

In the project directory, you can run:

### `yarn run serve`

Runs the app in the development mode.<br>
Open [http://localhost:8080](http://localhost:8080) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `yarn run build`

Builds the app for production to the `dist` folder.<br>
It correctly bundles Vue in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

### `firebase deploy`

Deploys the app to the Firebase cloud. You need to run "yarn run build" before the deployment.

### `yarn run format`

Run Prettier, rewrite code as code formatting.
