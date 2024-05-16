# Notes and Findings
- If experiencing error with class name, create a file in the root called "nativewind-env.d.ts" and add this "/// <reference types="nativewind/types" />"
- If experiencing error "Request not defined" after starting app, update node version with "nvm install --lts" or run "npm install"
- If node version keeps reverting, run this command "nvm alias default v<version number>"
- If IOS simulator crashes unexpectedly, add this "import 'react-native-reanimated' in the root layout file
- if having issues with unresolved files, delete the "node_modules" directory and reinstall with "npm i"