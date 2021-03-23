import React, { useState, useMemo, useRef, useEffect } from "react";
import CarouselOpacity from "../../../component/ICarousel/CarouselOpacity";
import { useCarouselOpacity } from "../../../component/ICarousel/CarouselOpacity/hook";
import classes from "./PhotoSlider.module.scss";
//import Spinner from "../../../component/Spinner";
import { getCarouselItems, getActivePhotoAndId } from "./helper";
import { useImgZoom } from "../../../hooks/useImgZoom";
import PSHelperPanel from "../../component/PSHelperPanel";

/* FINAL COMPONENTS */

//const _refSpinner = <Spinner />;

//const ISpinner = () => _refSpinner;

interface PhotoSliderProps {
  editedPhotoIds: string[];
  initActiveIndex?: number;
  //photoState: IPhotosState;
  photos: TPhotosData | undefined;
  loading: boolean;
  hasNextPage: boolean;
  error: boolean;
  loadMorePhotos: () => void;
}

const PhotoSlider = ({
  editedPhotoIds,
  initActiveIndex = 0,
  //photoState,
  photos,
  loading,
  hasNextPage,
  error,
  loadMorePhotos,
}: PhotoSliderProps) => {
  //const classes = useStyles();

  const { zoomIn, zoomOut, cancel, maxZoom, minZoom, zoom } = useImgZoom();

  const [showControlPanel, setShowControlPanel] = useState(true);

  //TODO: on error show alert
  const length = photos ? photos.size : 1;

  const { controller } = useCarouselOpacity(length, initActiveIndex);

  controller.resetZoom = cancel;

  const prevLoadingRef = useRef({ isData: false, isLoading: false, length });

  const activePhoto: TPhotoData = getActivePhotoAndId(
    photos,
    controller.activeIndex
  );

  //console.log("[PRE RENDER] ", prevLoadingRef);
  useEffect(() => {
    /*  console.log(
      "[PRE COMPLETED FETCH MORE] ",
      prevLoadingRef.current.isData === true &&
        prevLoadingRef.current.isLoading === true &&
        loading === false,
      prevLoadingRef
    ); */
    if (
      prevLoadingRef.current.length - controller.activeIndex === 1 &&
      prevLoadingRef.current.isData === true &&
      prevLoadingRef.current.isLoading === true &&
      loading === false
    ) {
      //console.log("[ON COMPLETED FETCH MORE] ", prevLoadingRef);
      prevLoadingRef.current = {
        isData: true,
        isLoading: false,
        length,
      };

      controller.onIncreaseIndex(undefined);

      //console.log("---- INCREASE INDEX");
    }

    prevLoadingRef.current = {
      isData: photos ? true : false,
      isLoading: loading,
      length,
    };
  }, [loading]);

  const onFetchMore =
    photos && hasNextPage
      ? () => {
          console.log("loadMorePhotos");
          loadMorePhotos();
        }
      : undefined;

  console.log(
    "[PHOTO SLIDER WIDGET] RENDER",
    photos,
    initActiveIndex,
    controller.activeIndex,
    loading
  );
  return (
    <div
      className={classes.root}
      onClick={() => setShowControlPanel((prevShow) => !prevShow)}
    >
      <CarouselOpacity controller={controller} onFetchMore={onFetchMore}>
        {useMemo(
          () =>
            getCarouselItems(
              //ISpinner,
              zoom,
              photos as TPhotosData,
              loading,
              error,
              controller.activeIndex,
              classes,
              editedPhotoIds
            ),
          [photos, editedPhotoIds, zoom, loading, error]
        )}
      </CarouselOpacity>

      {showControlPanel && (
        <PSHelperPanel
          controller={controller}
          activePhoto={activePhoto}
          onCancel={cancel}
          onZoomIn={zoomIn}
          onZoomOut={zoomOut}
          zoom={zoom}
          maxZoom={maxZoom}
          minZoom={minZoom}
        />
      )}
    </div>
  );
};

export default PhotoSlider;
