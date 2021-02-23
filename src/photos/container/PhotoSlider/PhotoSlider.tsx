import React, { useState, useMemo, useRef, useEffect } from "react";
//import { makeStyles } from "@material-ui/core/styles";
import CarouselOpacity from "../../../component/ICarousel/CarouselOpacity";
import { useCarouselOpacity } from "../../../component/ICarousel/CarouselOpacity/hook";
//import DescriptionIcon from "@material-ui/icons/Description";
//import IconButton from "@material-ui/core/IconButton";
//import PhotoDesc from "../../component/PhotoDesc";
//import FullScreenImage from "../../../component/ImageSharp/FullScreenImage";
//import Backdrop from "@material-ui/core/Backdrop";
//import CircularProgress from "@material-ui/core/CircularProgress";
//import { IPhoto } from "../../../types";
//import { TPhotoData } from "../../types";
//import Modal from "../../../component/Modal";
//import ModalCloseButton from "../../../component/UI/ModalCloseButton";
//import { TPhotosData, IPhotosState } from "./../../types";
import classes from "./PhotoSlider.module.scss";
import Spinner from "../../../component/Spinner";
//import IconButton from "../../../component/IconButton";
//import DescIcon from "../../../component/Icons/DescIcon";
//import ModalCloseButton from "../../../component/ModalCloseButton";
import { getCarouselItems, getActivePhotoAndId } from "./helper";
import { useImgZoom } from "../../../hooks/useImgZoom";
import PSHelperPanel from "../../component/PSHelperPanel";

/* FINAL COMPONENTS */

const _refSpinner = <Spinner />;

const ISpinner = () => _refSpinner;

interface PhotoSliderProps {
  initActiveIndex?: number;
  //photoState: IPhotosState;
  photos: TPhotosData | undefined;
  loading: boolean;
  hasNextPage: boolean;
  error: boolean;
  loadMorePhotos: () => void;
}

interface IDescState {
  show: boolean;
  photo: TPhotoData | undefined;
}

const PhotoSlider = ({
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

  /* const [descState, setDescState] = useState<IDescState>({
    show: false,
    photo: undefined,
  }); */

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

  /* const onShowDesc = (event: any) => {
    event.stopPropagation();

    setDescState({
      photo: { id, photo: activePhoto },
      show: true,
    });
  }; */

  /* const onHideDesc = (event: any) => {
    event.stopPropagation();

    setDescState({
      photo: undefined,
      show: false,
    });
  }; */

  const onFetchMore =
    photos && hasNextPage
      ? () => {
          console.log("loadMorePhotos");
          loadMorePhotos();
        }
      : undefined;

  //const onFetchMore = photoState.photos && photoState.hasNextPage ? fetchMore : undefined;

  console.log(
    "[PHOTO SLIDER WIDGET] RENDER",
    initActiveIndex,
    controller.activeIndex,
    loading
  );
  return (
    <div
      className={classes.root}
      onClick={() => setShowControlPanel((prevShow) => !prevShow)}
    >
      {/* <div className={classes.showDescButton}>
        <IconButton
          type="circle"
          icon={<DescIcon color="secondary" width={30} height={38} />}
          onClick={onShowDesc}
          ariaLabel="Показать описание фото..."
        />
      </div> */}

      <CarouselOpacity controller={controller} onFetchMore={onFetchMore}>
        {useMemo(
          () =>
            getCarouselItems(
              ISpinner,
              zoom,
              photos as TPhotosData,
              loading,
              error,
              controller.activeIndex,
              classes
            ),
          [photos, zoom, loading, error]
        )}
      </CarouselOpacity>
      {/* <Backdrop className={classes.backdrop} open={photoState.loading}>
        <Spinner />
      </Backdrop> */}

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

/*   {descState.show && (
        <Modal onClose={onHideDesc} type="form">
          <div className={classes.desc}>
            <PhotoDesc photo={descState.photo as TPhotoData} />
          </div>
          <ModalCloseButton
            ariaLabel="закрыть описание фото"
            color="secondary"
            onClick={onHideDesc}
          />
        </Modal>
      )} */
