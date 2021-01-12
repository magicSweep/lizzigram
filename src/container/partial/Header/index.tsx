import React from "react";
import classes from "./Header.module.scss";
import Logo from "./../../../component/Logo";
import BtnWithMenu from "../../../component/BtnWithMenu";
import BtnWithIcon from "../../../component/BtnWithIcon";
import SmileIcon from "../../../component/Icons/SmileIcon";
import ArrowIcon from "../../../component/Icons/ArrowIcon";
import ExitIcon from "../../../component/Icons/ExitIcon";
import AuthFragment from "../../../auth/component/AuthFragment";

/* const DynamicAuthFragment = dynamic(
  () => import("../../../auth/component/AuthFragment"),
  { loading: AuthSkeleton }
); */

const Header = () => {
  //const classes = useStyles();

  //const authFragment = getAuthFragment(user, loading, classes, login, logout);

  console.log("[RENDER HEADER WIDGET]");

  return (
    <header className={classes.appBar}>
      <div className={classes.toolbar}>
        <Logo />

        {/* <DynamicAuthFragment /> */}

        <AuthFragment />

        {/*   <BtnWithMenu
          menuButton={
            <BtnWithIcon
              iconStart={<SmileIcon width={16} height={16} />}
              iconEnd={<ArrowIcon width={10} height={10} direction="down" />}
              label="Тасик"
              ariaLabel="Меню пользователя"
              //type: "CONTAINED",
              disabled={false}
              onClick={undefined}
            />
          }
          disabled={false}
        >
          <BtnWithIcon
            iconStart={<ArrowIcon width={10} height={10} direction="right" />}
            label={"Влюбить"}
            ariaLabel={"Влюбить"}
            onClick={() => console.log("Logout")}
            disabled={false}
            fullWidth={true}
          />
          <BtnWithIcon
            iconStart={<ExitIcon width={14} height={14} />}
            label={"Выход"}
            ariaLabel={"Do something"}
            onClick={() => console.log("Logout")}
            disabled={false}
            fullWidth={true}
            color="secondary"
          />
        </BtnWithMenu> */}
      </div>
    </header>
  );
};

export default Header;
