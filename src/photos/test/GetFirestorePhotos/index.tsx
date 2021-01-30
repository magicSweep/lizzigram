import React, { useState } from "react";
import {
  loadPhotos,
  loadMore,
} from "../../hook/requests/usePhotosReq/controller";

const renderPhotos = (photos: TPhotosData | undefined) => {
  if (photos === undefined) return null;

  const photosElems: any[] = [];

  console.log("Photos", photos);

  const keys = [...photos.keys()];

  keys.forEach((key) => {
    photosElems.push(<li key={key}>{key}</li>);
  });

  return <ul>{photosElems}</ul>;
};

const GetFirestorePhotos = () => {
  const [state, setState] = useState<{
    hasNextPage: boolean;
    nextPageDocRef: any;
    photos: TPhotosData | undefined;
  }>({
    hasNextPage: false,
    nextPageDocRef: null,
    photos: undefined,
  });

  const start = async () => {
    const data = await loadPhotos({
      tagsIds: [],
      yearsOld: -1,
      isSearch: false,
    });
    setState((prevState) => {
      let photos: any;
      if (prevState.photos) {
        photos = new Map([...prevState.photos, ...data.photos]);
      } else {
        photos = data.photos;
      }

      return {
        hasNextPage: data.hasNextPage,
        nextPageDocRef: data.nextPageDocRef,
        photos,
      };
    });
  };

  const iloadMore = async () => {
    if (!state.nextPageDocRef) return;
    const data = await loadMore(state.nextPageDocRef);
    setState((prevState) => {
      let photos: any;
      if (prevState.photos) {
        photos = new Map([...prevState.photos, ...data.photos]);
      } else {
        photos = data.photos;
      }

      return {
        hasNextPage: data.hasNextPage,
        nextPageDocRef: prevState.nextPageDocRef,
        photos,
      };
    });
  };

  console.log("[RENDER GetFirestorePhotos]", state);

  return (
    <div style={{ width: "600px", margin: "auto", padding: "30px" }}>
      <div>
        <button onClick={start}>Start new req</button>|{" "}
        <button onClick={iloadMore}>More req</button>
      </div>
      <div>
        <p>{`HAS NEXT PAGE - ${state.hasNextPage ? "true" : "false"}`}</p>
        <p>{`NEXT PAGE DOC REF - ${
          state.nextPageDocRef ? state.nextPageDocRef.id : "No ref"
        }`}</p>

        {state.photos && <p>Photos:</p>}
        {state.photos && renderPhotos(state.photos)}
      </div>
    </div>
  );
};

export default GetFirestorePhotos;
