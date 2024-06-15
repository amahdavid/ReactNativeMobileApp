# Overview
This project is a full-stack web application that allows users to sign up, log in, and post videos. It includes a React front-end and a Node.js back-end, leveraging token-based authentication to manage user sessions securely.

# Features
- User Authentication: Users can sign up and log in.
- Video Posting: Authenticated users can post videos.
- Token-based Security: Secure user sessions using JWT tokens.

# Tech Stack
## FrontEnd
- React: JavaScript library for building user interfaces.
- React Router: For routing in React applications.
- Axios: Promise-based HTTP client for the browser and Node.js.

## Backend
- Node.js: JavaScript runtime built on Chrome's V8 engine.
- Express.js: Web application framework for Node.js.
- MySQL: Relational database for storing user and video data.

## Testing
- Jest: JavaScript testing framework for testing back-end and front-end code.

## Authentication
- JWT (JSON Web Tokens): For securely transmitting information between parties as a JSON object.

## CI/CD
- TBD

# Demo

# Notes and Findings
- If experiencing error with class name, create a file in the root called "nativewind-env.d.ts" and add this "/// <reference types="nativewind/types" />"
- If experiencing error "Request not defined" after starting app, update node version with "nvm install --lts" or run "npm install"
- If node version keeps reverting, run this command "nvm alias default v<version number>"
- If IOS simulator crashes unexpectedly, add this "import 'react-native-reanimated' in the root layout file
- if having issues with unresolved files, delete the "node_modules" directory and reinstall with "npm i"
- if having issues with npm command try this "npm config set legacy-peer-deps true"
- I was having major issues with UUID packages and Jest, I changed my moduleNameMapper in my package.json file to this "moduleNameMapper": {
      "uuid": "<rootDir>/node_modules/uuid"
}