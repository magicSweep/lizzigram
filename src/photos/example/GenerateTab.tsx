import React from "react";
import Button from "../../component/Button";
//import "firebase/firebase-firestore";
import { getAll, generateAndSavePhotosData } from "../helper";
import { testPhotosCollectionName } from "../../config";
//import Button from "@material-ui/core/Button";

import { getFirestoreDb } from "./../../firebase/initFirestore";

const GenerateTab = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h4>Generate and save fake data.</h4>
      <Button
        onClick={async (event: any) => {
          const tags = await getAll(getFirestoreDb().collection("tags"));

          await generateAndSavePhotosData(
            getFirestoreDb().collection(testPhotosCollectionName),
            tags
          );

          console.log("SUCCESS GENERATE AND SAVE PHOTOS");
        }}
        label="Generate and save photos"
      />
    </div>
  );
};

export default GenerateTab;
