type TBtnWithMenuAnchor = "start" | "end";

interface IPosition {
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
}

interface IBtnWithMenuState {
  show: boolean;
  position: IPosition;
}

interface IBtnWithMenuProps {
  //menuItemsInfo: any[];
  menuButton: any;
  disabled: boolean;
  children: any;
  positionType: TBtnWithMenuAnchor;
}
