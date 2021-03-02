import { google, drive_v3 } from "googleapis";
import {
  readFile,
  readFileSync,
  createWriteStream,
  createReadStream,
  statSync,
  existsSync,
} from "fs";

google.auth.GoogleAuth;

const auth = new google.auth.GoogleAuth({});

/* const client = await google.auth.getClient({
  credentials: {
    private_key: process.env.DRIVE_PRIVATE_KEY,
    client_email: process.env.DRIVE_CLIENT_EMAIL
  },
  scopes: "https://www.googleapis.com/auth/drive",
  projectId: process.env.PROJECT_ID,
}); */

class GoogleDrive {
  //pathToCredentials: TPath;
  parents: string[];
  drive: drive_v3.Drive = undefined;

  constructor() //googleDriveParentId: string //pathToGoogleDriveCredentials: TPath,
  {
    //this.pathToCredentials = pathToGoogleDriveCredentials;
    this.parents = [process.env.DRIVE_PARENT_ID];
  }

  init = async () => {
    /* if (!existsSync(this.pathToCredentials))
      throw new Error("No google drive credentials file"); */

    //const credentials = require(this.pathToCredentials);

    /*  let credentials: any = readFileSync(this.pathToCredentials, {
      encoding: "utf-8",
    });
    credentials = JSON.parse(credentials); */

    //console.log("!!!!!!!!!", process.env.DRIVE_PRIVATE_KEY);

    //getClient
    const client = await google.auth.getClient({
      credentials: {
        private_key: process.env.DRIVE_PRIVATE_KEY,
        client_email: process.env.DRIVE_CLIENT_EMAIL,
      },
      //credentials,
      scopes: "https://www.googleapis.com/auth/drive",
      projectId: process.env.PROJECT_ID,
    });

    this.drive = google.drive({
      version: "v3",
      auth: client,
    });
  };

  getAllFiles = async (limit: number = 10) => {
    if (!this.drive) throw new Error("Do you forget call init?");

    const res = await this.drive.files.list({
      pageSize: limit,
      //files: "nextPageToken, files(id, name)",
    });

    return res.data.files;
  };

  searchFileByName = async (name: string) => {
    if (!this.drive) throw new Error("Do you forget call init?");

    const res = await this.drive.files.list({
      q: `name='${name}'`,
      //fields: "nextPageToken, items(id, title)",
    });

    return res.data.files.length === 1 ? res.data.files[0] : undefined;
  };

  uploadImageToDrive = (
    fileName: string,
    pathToPhoto: string,
    mimeType: string = "image/jpeg"
  ) => {
    if (!this.drive) throw new Error("Do you forget call init?");

    //const fileSize = statSync(pathToPhoto).size;

    return this.drive.files.create(
      {
        requestBody: {
          parents: this.parents,
          name: fileName,
          mimeType,
        },
        media: {
          mimeType,
          body: createReadStream(pathToPhoto),
        },
      }
      /* {
        // Use the `onUploadProgress` event from Axios to track the
        // number of bytes uploaded to this point.
        onUploadProgress: (evt) => {
          const progress = (evt.bytesRead / fileSize) * 100;
          console.log(`${Math.round(progress)}% complete`);
        },
      } */
    );
  };

  updateImageFile = (
    fileId: string,
    pathToPhotoFile: string,
    mimeType: string = "image/jpeg"
  ) => {
    if (!this.drive) throw new Error("Do you forget call init?");

    return this.drive.files.update({
      fileId,
      media: {
        mimeType,
        body: createReadStream(pathToPhotoFile),
      },
    });

    //console.log(`Response - ${JSON.stringify(res)}`);
  };

  downloadImageStream = async (fileId: string) => {
    if (!this.drive) throw new Error("Do you forget call init?");

    const res = await this.drive.files.get(
      { fileId, alt: "media" },
      { responseType: "stream" }
    );

    return res.data;
  };

  downloadImageFromDrive = async (fileId: string, destPath: TPath) => {
    if (!this.drive) throw new Error("Do you forget call init?");

    //let progress = 0;

    //const destPath = join(__dirname, "stewart.jpg");

    const dest = createWriteStream(destPath);

    const res: any = await this.drive.files.get(
      { fileId, alt: "media" },
      { responseType: "stream" }
    );

    return new Promise((resolve, reject) => {
      res.data
        .on("end", () => {
          //console.log("Done downloading file from Google drive.");
          resolve(undefined);
        })
        .on("error", (err) => {
          //console.error("Error downloading file from Google drive.");
          reject(err);
        })
        /*  .on("data", (data) => {
          progress += data.length;
          if (process.stdout.isTTY) {
            process.stdout.clearLine(0);
            process.stdout.cursorTo(0);
            process.stdout.write(`Downloaded ${progress} bytes`);
          }
        }) */
        .pipe(dest);
    });
  };

  deleteFile = (fileId: string) => {
    if (!this.drive) throw new Error("Do you forget call init?");

    return this.drive.files.delete({
      fileId,
    });

    //console.log(`Response - ${JSON.stringify(res)}`);
  };

  deleteAllFiles = async () => {
    if (!this.drive) throw new Error("Do you forget call init?");

    const files = await this.getAllFiles(100);

    const promises = [];

    if (files.length === 0) {
      console.log("No files found.");
    } else {
      //console.log("Files:");
      for (const file of files) {
        //console.log(`${file.name} (${file.id})`);
        //console.log(` - File - ${file.name} | ${file.id} | ${file.mimeType}`);
        if (file.id === this.parents[0]) continue;

        promises.push(this.drive.files.delete({ fileId: file.id }));
        //console.log(` - Deleted - ${file.name} | ${file.id} | ${file.mimeType}`);
      }

      return Promise.all(promises);

      //console.log(`Deleted ${files.length - 1} files`);
    }
  };
}

export default GoogleDrive;

/* export const init = async () => {
  try {
    drive = await getDrive();
  } catch (err) {
    new Error(`We can't create google drive ${JSON.stringify(err)}`);
  }
};

export const savePhoto = (
  photoFileName: string,
  photoFilePath: string,
  photoMimeType: string = "image/jpeg"
) => {
  if (drive === undefined)
    throw new Error("No drive. Are you forget call init?");

  return uploadImageToDrive(
    drive,
    photoFileName,
    photoFilePath,
    photoMimeType,
    parents
  );
};

export const editPhoto = async (
  photoId: string,
  photoFilePath: string,
  photoMimeType: string = "image/jpeg"
) => {
  if (drive === undefined)
    throw new Error("No drive. Are you forget call init?");

  await updateImageFile(drive, photoId, photoFilePath, photoMimeType);
};
 */
