import React, { useEffect } from "react";
import Button from "../../component/Button";
//import "firebase/firebase-firestore";
import { getAll } from "../helper";
import { getFirestoreDb } from "./../../firebase/initFirestore";

const ShowDataTab = () => {
  return (
    <div
      style={{
        padding: "20px",
        marginBottom: "20px",
      }}
    >
      <h4>Show firestore data.</h4>
      <Button
        onClick={async () => {
          const tags = await getAll(getFirestoreDb().collection("tags"));
          console.log("[FIRESTORE] TAGS", tags);
        }}
        label="Get all tags to console."
      />

      <Button
        onClick={async () => {
          const photos = await getAll(getFirestoreDb().collection("photos"));
          console.log("[FIRESTORE] PHOTOS", photos);
        }}
        label="Get all photos to console."
      />

      <Button
        onClick={async () => {
          /* const photos = await updatePhotosWithTagsArrField(
                db.collection("photos")
              ); */

          const result = await getFirestoreDb()
            .collection("photos")
            .where("tags.Ql2r2DFzzjZnzP2adh9Z", "==", true)
            .where("yearsOld", "==", 0)
            .orderBy("date")
            .limit(100)
            .get(); //orderBy("_timestamp")
          console.log("SUCCESS GET");
          const res = new Map();

          result.docs.map((item: any) => {
            res.set(item.id, item.data());
          });

          console.log(res);

          //const photosMap = resFirestoreToMapObj(photos);
          //console.log("[FIRESTORE] TEST", photosMap);
        }}
        label="Test firestore."
      />
    </div>
  );
};

export default ShowDataTab;
