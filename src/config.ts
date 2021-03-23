import { getLizzyYearsOld } from "./utils";

/* PORTAL ELEMENTS */
export const modalId = "modal";
export const alertId = "alert";

/* FIRESTORE */
// [ feeling, withWho, where]
export const numberOfTagsByType = [3, 5, 4];
export const numberOfTags = 11;
export const numberOfTagsByPhoto = 4;

export const photosCollectionName = "photos";
export const testPhotosCollectionName = "phototest";

export const tagsCollectionName = "tags";
export const usersCollectionName = "users";

export const firebaseConfig = {
  apiKey: "AIzaSyDKywOLq8yuozmOXjtOUIR7yUXBekDoN3A",
  authDomain: "lizzigram-1600291187801.firebaseapp.com",
  databaseURL: "https://lizzigram-1600291187801.firebaseio.com",
  projectId: "lizzigram-1600291187801",
  storageBucket: "lizzigram-1600291187801.appspot.com",
  messagingSenderId: "944169679344",
  appId: "1:944169679344:web:d376029997bd7351b04535",
  measurementId: "G-C9Q921F1E6",
};

/* AUTH */

export const authLocalStorageKey = "lg_super_puper_user";

/* EXPRESS SERVER */

export const expressUrl = "https://lizzygram.herokuapp.com";
//export const expressUrl = "http://localhost:3009";

export const herokuPingUrl = `${expressUrl}/sleep_q23we4rt5`;

export const addPhotoUrl = `${expressUrl}/add-photo`;
export const editPhotoUrl = `${expressUrl}/edit-photo`;
// download/:photoId
export const downloadPhotoUrl = `${expressUrl}/download`;

/* PHOTOS */
export const limitPhotosPerQuery = 9;

export const addPhotoFormTitle = "Загрузить новое фото:";
export const editPhotoFormTitle = "Изменить фото:";
export const searchPhotoFormTitle = "Поиск фото:";

/* OTHER */

export const lizzyYearsOld = getLizzyYearsOld();

export const lizzyBirthday = new Date("2018-07-08");
