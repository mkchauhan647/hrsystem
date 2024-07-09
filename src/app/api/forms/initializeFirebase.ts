// Initialize Firebase Admin SDK
const { initializeApp, cert } = require("firebase-admin/app");
import { App, getApps } from "firebase-admin/app";
const serviceAccount = require("./hr-system-eb667-firebase-adminsdk-nb8oq-8e8c437db8.json");

let app:App; 

if (!getApps().length) {
  app = initializeApp({
    credential: cert(serviceAccount),
  });
} else {
    app = getApps()[0];
}

export { app };