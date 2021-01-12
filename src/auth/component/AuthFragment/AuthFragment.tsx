import React, { FC } from "react";
import BtnWithIcon from "../../../component/BtnWithIcon";
import BtnWithMenu from "../../../component/BtnWithMenu";
import ArrowIcon from "../../../component/Icons/ArrowIcon";
import ExitIcon from "../../../component/Icons/ExitIcon";
import GoogleIcon from "../../../component/Icons/GoogleIcon";
import SmileIcon from "../../../component/Icons/SmileIcon";
import Skeleton from "../../../component/Skeleton";
//import googleIcon from "./../../../../static/google.svg";
import classes from "./AuthFragment.module.scss";

interface IAuthFragmentProps {
  user: IUserResponseToClient | undefined;
  loading: boolean;
  login: () => void;
  logout: () => void;
}

export const AuthSkeleton = () => {
  return (
    <div className={classes.skeleton}>
      <Skeleton variant="rect" />
    </div>
  );
};

const AuthFragment: FC<IAuthFragmentProps> = ({
  user,
  loading,
  login,
  logout,
}) => {
  if (loading) {
    return <AuthSkeleton />;
  }

  if (user && user.uid) {
    return (
      <BtnWithMenu
        menuButton={
          <BtnWithIcon
            iconStart={<SmileIcon width={16} height={16} />}
            iconEnd={<ArrowIcon width={10} height={10} direction="down" />}
            label={user.name ? user.name : user.email}
            ariaLabel={"Меню пользователя"}
            onClick={undefined}
            disabled={false}
          />
        }
        //type: "CONTAINED",
        disabled={false}
      >
        <BtnWithIcon
          iconStart={<ExitIcon width={14} height={14} />}
          label={"Выход"}
          ariaLabel={"Выход из аккаутна"}
          onClick={logout}
          disabled={false}
          fullWidth={true}
          color="secondary"
        />
      </BtnWithMenu>
    );
  } else {
    return (
      <BtnWithIcon
        iconStart={<GoogleIcon width={22} height={22} />}
        label="Войти с Google"
        ariaLabel={"Войти в аккаунт google"}
        disabled={false}
        color="secondary"
        onClick={login}
      />
    );
  }
};

export default AuthFragment;
