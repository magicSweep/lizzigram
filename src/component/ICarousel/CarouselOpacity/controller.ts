import { Dispatch, SetStateAction } from "react";
import { calcDecreasedIndex, calcIncreasedIndex, clamp } from "../utils";
import CalcTranslateX from "./CalcTranslateX";
import CastTranslateXToOpacity from "./CastTranslateXToOpacity";
import CarouselController from "../controller";

export default class extends CarouselController<ICarouselState> {
  //calc: ICalcTranslateX = new CalcTranslateX();

  cast: ICastTranslateXToOpacity = new CastTranslateXToOpacity();

  opacity: number = 1;

  activeItemRef: React.RefObject<HTMLLIElement> | undefined;

  /* 
  containerRef: React.RefObject<HTMLDivElement> | undefined;


  isMultiTouch: boolean = false;

  // values from state
  isTranslated: boolean = false;
  activeIndex: number = 0; */

  //setState: Dispatch<SetStateAction<T>>;
  //setState: Dispatch<SetStateAction<any>>;

  //onFetchMore: () => void = undefined;

  //activeIndex: number = 0;
  //itemsLength: number;

  //getOpacity = () => this.cast.calcOpacityByTranslateX(this.getTranslateX());

  pointerDown = (pageX: number, pageY: number) => {
    console.log("onPointerDown");

    this.calc.onPointerDown(pageX, pageY);

    this.cast.onPointerDown();

    if (!this.activeItemRef || !this.activeItemRef.current)
      throw new Error("NO activeItemRef");

    this.activeItemRef.current.style.transitionProperty = "none";

    /* this.setState((prevState) => ({
      ...prevState,
      isTranslated: true,
    })); */
  };

  pointerMove = (pageX: number, pageY: number) => {
    console.log("onPointerMove");

    this.calc.onPointerMove(pageX, pageY, this.activeIndex, this.itemsLength);

    const newOpacity = this.cast.calcOpacityByTranslateX(this.calc.translateX);

    if (this.opacity !== newOpacity) {
      //set style to activeItemRef
      if (!this.activeItemRef || !this.activeItemRef.current)
        throw new Error("NO activeItemRef");
      this.activeItemRef.current.style.opacity = (this.opacity >= 0.5
        ? this.opacity
        : 0.5
      ).toString();
    }

    this.opacity = newOpacity;
  };

  pointerUp = () => {
    console.log("onPointerUp");

    let newIndex = this.activeIndex;

    if (!this.calc.isYScroll && this.calc.isEnoughDist()) {
      if (this.calc.isIndexIncrease()) {
        newIndex = calcIncreasedIndex(this.activeIndex, this.itemsLength);
        if (this.activeIndex === newIndex && this.onFetchMore) {
          this.onFetchMore();
        }
      } else {
        newIndex = calcDecreasedIndex(this.activeIndex);
      }
    }

    this.calc.onPointerUp();

    this.opacity = 1;

    if (!this.setState) throw new Error("No setState");

    console.log("onPointerUp", newIndex);

    this.setState((prevState) => ({
      ...prevState,
      activeIndex: newIndex,
    }));
  };
}
