import { Request, Response } from "express";
import { IErrorResponse, ISuccessResponse } from "../types";
import { getPhotoFromFirebase } from "./service/firestore.service";

export const addPhoto = async (req: Request, res: Response) => {
  let json: IErrorResponse | ISuccessResponse = undefined;

  try {
    const id = req.body.id;
    const file = req.file;

    if (!file) throw new Error(`We've got no photo file`);

    // TODO: send request to firebase, to check if exist photo with that id and it not Active
    const photo = await getPhotoFromFirebase(id);

    if (!photo) throw new Error(`No photo record in Firestore with id - ${id}`);

    // send uploaded photo to google drive

    // remove upload photo

    // TODO: send request to firebase, to update photo info

    // MAKE RESPONSE
    json = {
      status: "success",
      data: {
        file: JSON.stringify(req.file),
      },
    };
  } catch (err) {
    json = {
      status: "error",
      data: {
        error: "We've got no photo file",
      },
    };
  }

  return res.status(200).json(json).end();
};
