import { initializeApp, cert, App, getApps } from "firebase-admin/app";
import { getStorage } from "firebase-admin/storage";
import { getFirestore } from "firebase-admin/firestore";
// const serviceAccount = require('./serviceAccount.json')

const serviceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n') ?? '',
//     privateKeyId: process.env.FIREBASE_PRIVATE_KEY_ID,
//     clientId: process.env.FIREBASE_CLIENT_ID,
//     authUri: process.env.FIREBASE_AUTH_URI,
//     tokenUri: process.env.FIREBASE_TOKEN_URI,
//     authProviderX509CertUrl: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
//     clientC509CertUrl: process.env.FIREBASE_CLIENT_X509_CERT_URL,
//     type: process.env.FIREBASE_TYPE,
    //     universeDomain: process.env.FIREBASE_UNIVERSE_DOMAIN,

    // project_id: process.env.FIREBASE_PROJECT_ID,
    // client_email: process.env.FIREBASE_CLIENT_EMAIL,
    // private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n') ?? '',
    // private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
    // type: process.env.FIREBASE_TYPE,
    // token_uri: process.env.FIREBASE_TOKEN_URI,
    // auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
    // client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
    // auth_uri: process.env.FIREBASE_AUTH_URI,
    // client_id: process.env.FIREBASE_CLIENT_ID,
    // universe_doman: process.env.FIREBASE_UNIVERSE_DOMAIN,
};

console.log('serviceAccount', serviceAccount);

let app: App;

if (!getApps().length) {
  app = initializeApp({
      credential: cert(serviceAccount),
      
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  });
} else {
  app = getApps()[0];
}

const firestore = getFirestore(app);
const storage = getStorage(app);

console.log('bucket', process.env.FIREBASE_STORAGE_BUCKET)
console.log('Storage Bucket:', storage.bucket().name);


export { app, firestore, storage };
