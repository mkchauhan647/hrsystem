// initializeFirebase.ts
import { initializeApp, cert, App, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";

const serviceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n') ?? '',
};

let app: App;

if (!getApps().length) {
  app = initializeApp({
      credential: cert(serviceAccount),
      storageBucket: `${process.env.FIREBASE_PROJECT_ID}.appspot.com`,
  });
} else {
  app = getApps()[0];
}

// const firestore = getFirestore(app);
// const storage = getStorage(app);

export { app};
