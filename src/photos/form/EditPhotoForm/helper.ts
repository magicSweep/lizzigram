//import isEqual from "lodash.isequal";
import intersection from "lodash.intersection";
//import { IPhoto } from "../../../types";

/* export const onSubmit = <T>(
  fetchPhoto: any,
  prevPhoto: IPhoto,
  photoId: string,
  showAlert: any
) => (formData: T) => {
  const { photoFile, desc, date, tags } = formData as any;

  //we check if desc or date is equal original we make it undefined
  const changedData = getChangedData(tags, prevPhoto, desc, date, photoFile);

  console.log("SUBMIT", changedData, photoId);

  if (!changedData) {
    //show alert with message nothing to change
    //showAlert();
    return;
  }

}; */

export const getTagsIdsFromFormStateTags = (
  tags:
    | {
        [name: string]: boolean;
      }
    | undefined
) => {
  if (tags === undefined) throw new Error("No tags form state");
  const tagsIds = [];
  for (let id in tags) {
    if (tags[id] === true) tagsIds.push(id);
  }
  return tagsIds;
};

export const getDefaultTagsIds = (photo: IPhoto) => {
  const result = [];
  for (let tagId in photo.tags) {
    if (photo.tags[tagId] === true) result.push(tagId);
  }
  return result;
};

export const getDefaultPhotoDate = (date: Date) => {
  return `${date.getFullYear()}-${getMonth(date)}-${getMonthDay(date)}`;
};

const getMonth = (date: Date) => {
  const month = date.getMonth() + 1;

  if (month < 10) return `0${month}`;
  else return `${month}`;
};

const getMonthDay = (date: Date) => {
  const day = date.getDate();

  if (day < 10) return `0${day}`;
  else return `${day}`;
};

export const getChangedData = (
  prevPhoto: IPhoto,
  tagsFromFormState?: { [name: string]: boolean },
  desc?: string,
  date?: Date,
  photoFile?: FileList
) => {
  //INITIAL
  let isDiff = false;

  const values: any = {};

  const defaultTagsIds = getDefaultTagsIds(prevPhoto);

  const tagsIds = getTagsIdsFromFormStateTags(tagsFromFormState);

  //VALIDATION
  const resIntersection = intersection(defaultTagsIds, tagsIds);
  if (
    resIntersection.length !== defaultTagsIds.length ||
    resIntersection.length !== tagsIds.length
  ) {
    isDiff = true;

    values.tags = tagsFromFormState;
  }

  if (
    date &&
    new Date(date).getTime() !==
      parseInt((prevPhoto.date as any).toDate().getTime())
  ) {
    isDiff = true;
    values.date = date;
  }

  if (desc && prevPhoto.description !== desc) {
    isDiff = true;
    values.desc = desc;
  }

  if (photoFile && photoFile.length !== 0) {
    isDiff = true;
    values.photoFile = photoFile;
  }

  //console.log("DATE COMPARE", isDiff);

  return isDiff ? values : undefined;
};
