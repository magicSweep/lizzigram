import { Request } from "express";

export interface IPhoto {
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

export interface IMulterBody {
  file: Express.Multer.File;
  id: string;
}

export interface IMulterRequest extends Request {
  body: IMulterBody;
}

export type TResponseStatus = "successs" | "error";

export interface IErrorResponse {
  status: "error";
  data: {
    error: string;
    code?: number;
  };
}

export interface ISuccessResponse {
  status: "success";
  data: {
    [name: string]: any;
  };
}

export type TWidth = number;

export type TPath = string;

export type TCloudinaryId = string;

export type TCloudinarySecureUrl = string;

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

export interface IFirebasePhoto {
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
