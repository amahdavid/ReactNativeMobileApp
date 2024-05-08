# Notes and Findings
- If experiencing error with class name, create a file in the root called "nativewind-env.d.ts" and add this "/// <reference types="nativewind/types" />"
- If experiencing error "Request not defined" after starting app, update node version with "nvm install --lts" or run "npm install"
- If node version keeps reverting, run this command "nvm alias default v<version number>"