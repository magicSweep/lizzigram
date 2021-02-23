import React from "react";
import { useAuth } from "../../auth/hook/useAuth";
import NotAuthWidget from "./NotAuth";

const NotAuth = () => {
  const { user, loading } = useAuth();

  return <NotAuthWidget loading={loading} isAuth={user ? true : false} />;
};

export default NotAuth;
