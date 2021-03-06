type TColorProp =
  | "noncolor"
  | "primary"
  | "secondary"
  | "info"
  | "warning"
  | "disabled";

//type PImageZoom = 1 | 1.5 | 2 | 2.5 | 3;

declare module "*.module.scss" {
  interface IClassNames {
    [className: string]: string;
  }
  const classNames: IClassNames;
  export = classNames;
}

declare module "*.jpg" {
  const path: string;
  export = path;
}

declare module "*.jpeg" {
  const path: string;
  export = path;
}

declare module "*.png" {
  const path: string;
  export = path;
}

declare module "*.svg" {
  const path: string;
  export = path;
}

/* TYPES */

type TImgExt = "jpeg" | "jpg" | "png";

type TTagsFormState = { [id: string]: boolean };

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
  imageExtention: TImgExt;
  addedByUserUID: string;
  // do we make changes by express
  isActive: boolean;
}

interface IUserResponseToClient {
  name: string;
  email: string;
  uid: string;
}

interface IAuthUser extends IUserResponseToClient {
  isEditor: undefined | boolean;
}

/* export type IFirestoreData = Map<string, any>; */

interface IUser extends IUserResponseToClient {
  email: string;
  password: string;
  passwordConfirm: string;

  passwordChangedAt?: string;
  passwordResetToken?: string;
  passwordResetExpires?: string;
  active?: boolean;
}

interface IAddEditPhotoPostRequest {
  file: File;
  id: string;
  userUid: string;
}
