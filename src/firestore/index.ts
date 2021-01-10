import admin from "firebase-admin";
import { pathToFirestoreCredentials } from "../config";

const serviceAccount = require(pathToFirestoreCredentials);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export const db = admin.firestore();

export const getAll = async () => {
  return await db.collection("photos").limit(3).get();
};
