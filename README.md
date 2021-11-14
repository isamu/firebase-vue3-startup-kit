# firebase-vue3-startup-kit

## Purpose

This is a Start-Up kit for a Firebase web project, which uses Vue3 and firebase 9.

## Requirements 

- Node.js version 14 or later.

## Instruction

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

## Available Scripts

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

## Firebase Hosting GitHub Action

### Get that service account's key and add it to your repository as a secret

1. Create and download the new service account's JSON key
2. Add that JSON key as a secret in your GitHub repository. JSON key is FIREBASE_SERVICE_ACCOUNT_FIR_VUE_STARTUP_KIT.
3. Add firebase project id as a secret in your GitHub repository.  JSON key is FIREBASE_PROJECT.


More detail: see, https://github.com/marketplace/actions/deploy-to-firebase-hosting

This is the sample site I deployed.

https://firebase-vue3-startup-kit.firebase.love/