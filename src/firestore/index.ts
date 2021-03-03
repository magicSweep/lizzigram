import admin from "firebase-admin";
//import { pathToFirestoreCredentials } from "../config";

//const serviceAccount = require(pathToFirestoreCredentials);

try {
  //console.log("!!!!!!!!!!!!!!!!!!!", process.env.PROJECT_ID);

  let privateKey = process.env.FIRESTORE_PRIVATE_KEY;
  if (process.env.IENV === "heroku") {
    privateKey = privateKey.replace(/\\n/g, "\n");
  }

  admin.initializeApp({
    credential: admin.credential.cert({
      //type: "service_account",
      //private_key_id: "d840b18e39d60eb7000d658180ec8fbaa06bdd18",
      projectId: process.env.PROJECT_ID,
      privateKey,
      clientEmail: process.env.FIRESTORE_CLIENT_EMAIL,
      /*       client_id: "102514509935869039049",
      auth_uri: "https://accounts.google.com/o/oauth2/auth",
      token_uri: "https://oauth2.googleapis.com/token",
      auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
      client_x509_cert_url:
        "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-uef40%40lizzigram-1600291187801.iam.gserviceaccount.com",
 */
    }),
  });
} catch (err) {
  console.error(
    "FIREBASE INIT ERROR",
    err.message ? err.message : JSON.stringify(err)
  );
}

export const db = admin.firestore();

export const getAll = async () => {
  return await db.collection("photos").limit(3).get();
};
