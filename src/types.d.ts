//import { Request } from "express";

interface IPhoto {
  //_id: any;
  base64: string;
  files: string[];
  aspectRatio: number; //1.6
  srcSet: string;
  iconSrc: string;
  src: string;

  _timestamp: Date;
  description: string;
  date: Date;
  yearsOld: number;
  tags: {
    [id: string]: boolean;
  };

  googleDriveId: string;
  // do we make changes by express
  isActive: boolean;

  addedByUserUID: string;
}

interface IMulterBody {
  file: Express.Multer.File;
  id: string;
  userUid: string;
}

interface IMulterRequest extends Express.Request {
  body: IMulterBody;
}

type TResponseStatus = "successs" | "error";

interface IErrorResponse {
  status: "error";
  data: {
    error: string;
    code?: number;
  };
}

interface ISuccessResponse {
  status: "success";
  data: {
    [name: string]: any;
  };
}

type TWidth = number;

type TPath = string;

type TCloudinaryId = string;

type TCloudinarySecureUrl = string;

/* export interface IAddToFirebasePhoto {
  //_id: any;
  base64: string;
  files: string[];
  aspectRatio: number; //1.6
  srcSet: string;
  iconSrc: string;
  src: string;

  _timestamp: Date;

  googleDriveId: string;
  //addedByUserUID: string;
  isActive: boolean;
} */

interface IFirebasePhoto {
  //_id: any;
  base64: string;
  files: string[];
  aspectRatio: number; //1.6
  srcSet: string;
  iconSrc: string;
  src: string;

  _timestamp?: Date;

  googleDriveId: string;
  //addedByUserUID: string;
  isActive: boolean;
}
