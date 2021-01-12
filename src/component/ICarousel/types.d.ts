/* CONTROLLER */
interface ICarouselController<T> {
  setState: Dispatch<SetStateAction<T>> | undefined;

  /* MUST BE CONTAINER OF CONTROLS */
  containerRef: React.RefObject<HTMLDivElement> | undefined;

  calc: ICalcTranslateX;

  isMultiTouch: boolean;

  onFetchMore: undefined | (() => void);

  isTranslated: boolean;

  activeIndex: number;
  itemsLength: number;

  onMouseDown: (event: any) => void | undefined;
  onMouseMove: (event: any) => void | undefined;
  onMouseUp: (event: any) => void | undefined;

  onTouchStart: (event: any) => void | undefined;
  onTouchMove: (event: any) => void | undefined;
  onTouchEnd: (event: any) => void | undefined;

  onIncreaseIndex: (event: any) => void | undefined;
  onDecreaseIndex: (event: any) => void | undefined;

  onSetIndex: (index: number) => void | undefined;
}

interface ICarouselOpacityController<T> extends ICarouselController<T> {
  cast: ICastTranslateXToOpacity;

  opacity: number;

  activeItemRef: React.RefObject<HTMLLIElement> | undefined;
}

/* CALC TRANSLATE X */

interface ICalcTranslateX {
  //itemsLength: number;
  isTranslated: boolean;
  translateX: number;
  isYScroll: boolean;

  onPointerDown: (pageX: number, pageY: number) => void | undefined;
  onPointerMove: (
    pageX: number,
    pageY: number,
    activeIndex: number,
    itemsLength: number
  ) => void | undefined;
  onPointerUp: () => void | undefined;

  calcTranslateXOnMove: (
    pageX: number,
    activeIndex: number,
    itemsLength: number
  ) => number;
  getStringifyToCssTranslateX: (
    activeIndex: number,
    translateX: number
  ) => string;

  isIndexIncrease: () => boolean;

  isEnoughDist: () => boolean;

  getYScrollFunc: (pageX: number, pageY: number) => boolean;
}

interface ICastTranslateXToOpacity {
  onPointerDown: () => void | undefined;

  calcOpacityByTranslateX: (translateX: number) => number;
}

/* STATE */

interface ICarouselState {
  //translateX: number;
  activeIndex: number;

  //isTranslated: boolean;
}

interface ICarouselTranslateState extends ICarouselState {
  translateX: number;
}

interface ICarouselOpacityState extends ICarouselState {
  opacity: number;
}
