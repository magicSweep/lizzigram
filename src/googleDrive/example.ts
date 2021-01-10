import { join } from "path";
import { path as rootPath } from "app-root-path";
import GoogleDrive from "./GoogleDrive";

const pathToUploadPhoto = join(
  rootPath,
  "src",
  "__test__",
  "image",
  "ladki.jpg"
);
const pathToUpdatePhoto = join(
  rootPath,
  "src",
  "__test__",
  "image",
  "freestocks-9U.jpg"
);

const pathToDownloadPhoto = join(
  rootPath,
  "src",
  "__test__",
  "temp",
  "downloaded.jpg"
);

export const googleDriveParentId = "1wTRcXEhl_gZ2Ppb6c2RO19M0qeG9xI6P";

export const pathToGoogleDriveCredentials = join(
  rootPath,
  "credentials",
  "lizzigram-google-drive-1600291187801-3964f05f8a31.json"
);

// SHOW ALL FILES
/* (async () => {
  try {
    const drive = await getDrive();

    await getAllFiles(drive);
  } catch (err) {
    console.log(err.message);
  }
})(); */

// UPLOAD FILE FROM DISK

(async () => {
  try {
    const googleDrive = new GoogleDrive(
      pathToGoogleDriveCredentials,
      googleDriveParentId
    );

    await googleDrive.init();

    // UPLOAD IMAGE
    /* 
    const photoName = `ladki${Date.now()}.jpg`;

    const file = await googleDrive.uploadImageToDrive(
      photoName,
      pathToUploadPhoto
    ); */

    // UPDATE IMAGE
    /* const res = await googleDrive.updateImageFile(
      "1PTLQnnXacWyVMd9DOWTjTO6UcSSV3cjL",
      pathToUpdatePhoto
    ); */

    //console.log(`RESULT - ${res.status} | ${res.statusText}`);

    // DOWNLOAD IMAGE
    await googleDrive.downloadImageFromDrive(
      "1_T1jHZDnj_Wo-bsFWMc_5FI0d7gqW-HD",
      pathToDownloadPhoto
    );

    //console.log("SEND FILE TO GOOGLE DRIVE", JSON.stringify(file));

    //await showAllFiles(drive);

    //const res = await deleteFile(drive, "14HPc4gjwu7_cFxAprFkNuftC6E1kGywy");

    //await downloadImageFromDrive(drive, "1wXIF0ALoSaxLrpJbM-XaQTY8_f4oDNyL");

    /* const res = await uploadImageToDrive(
      drive,
      "vodianova.jpg",
      pathToUploadFile,
      "image/jpeg",
      [parentId]
    ); */

    /*  const res = await updateImageFile(
      drive,
      "1VwUG9nx2KOusi1xhE5E25XZdcp3bH492",
      pathToUploadFile
    ); */

    //console.log(`RESULT - ${res.status} | ${res.statusText}`);
  } catch (err) {
    console.log("ERROR - ", err.message);
  }
})();
