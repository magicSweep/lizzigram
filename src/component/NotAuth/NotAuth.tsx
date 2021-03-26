import React, { FC } from "react";
import Spinner from "../Spinner";
import classes from "./NotAuth.module.scss";
import commomClasses from "./../../styles/classes.module.scss";

interface INotAuthProps {
  isAuth: boolean;
  loading: boolean;
}

const NotAuth: FC<INotAuthProps> = ({ isAuth, loading }) => {
  console.log("[RENDER NOT AUTH]", isAuth, loading);

  if (isAuth) return null;

  if (loading)
    return (
      <div className={classes.loading}>
        <Spinner /> <p>...Подождите, идет проверка аккаунта.</p>
      </div>
    );

  if (!isAuth)
    return (
      <div className={classes.welcome}>
        <h4 className={[commomClasses.titleFont, classes.title].join(" ")}>
          Добро пожаловать, леди и джентельмены.
        </h4>
        <p className={[commomClasses.paragraph, classes.paragraph].join(" ")}>
          Вам нужно лишь войти на сайт через свой google аккаунт, дабы перед
          вами открылся дивный мир жизни и творчества Цибизовой Елизаветы
          Кирилловны.
        </p>
      </div>
    );

  return null;
};

export default NotAuth;
