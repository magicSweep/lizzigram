import admin from "firebase-admin";
import { pathToFirestoreCredentials } from "../config";

//const serviceAccount = require(pathToFirestoreCredentials);

try {
  admin.initializeApp({
    credential: admin.credential.cert(pathToFirestoreCredentials),
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
