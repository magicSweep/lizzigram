import { openDB, deleteDB, wrap, unwrap, IDBPDatabase } from "idb";

const open = async () => {
  const db = await openDB("test-db");

  if (!db.objectStoreNames.contains("posts")) {
    db.createObjectStore("posts", { keyPath: "id" });
  }

  return db;
};

const saveTransaction = async (db: IDBPDatabase<any>, data: any) => {
  //const db = await openDB("test-db");

  const transaction = db.transaction("posts", "readwrite");

  const store = transaction.objectStore("posts");

  await store.put(data);

  return transaction.done;
};

const readAll = (db: IDBPDatabase<any>) => {
  /* const transaction = db.transaction("posts", "readonly");

    const store = transaction.objectStore("posts");

    return store.getAll(); */

  return db.getAll("posts");
};

const clearAllData = async (db: IDBPDatabase<any>) => {
  const transaction = db.transaction("posts", "readwrite");

  const store = transaction.objectStore("posts");

  await store.clear();

  return transaction.done;
};

const deleteOne = async (db: IDBPDatabase<any>, id: string) => {
  const transaction = db.transaction("posts", "readwrite");

  const store = transaction.objectStore("posts");

  await store.delete(id);

  return transaction.done;
};
