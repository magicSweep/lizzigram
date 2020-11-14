export interface IPhotoController<T, U> {
  file: U;

  //prevPhoto: T | undefined;

  photo: T;

  pathToUploadPhotoFileDir: string;
  //pathToDirWithPhotosDiffWidthsFsPaths
  pathToDirWithPhotosDiffWidths: string;
  //pathToWebResultDir: string;

  //pathToUploadPhotoFile: string;

  edit: (id: string) => Promise<T>;
  add: () => Promise<T>;

  //onWritableStreamUploadPhoto: (writableStream: any) => Promise<void>;
}
