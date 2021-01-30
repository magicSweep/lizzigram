import React from "react";
import { useEditor } from "../../auth/hook/useEditor";
import NotAuthWidget from "./NotAuth";

const NotAuth = () => {
  const { user, loading } = useEditor();

  return <NotAuthWidget loading={loading} isAuth={user ? true : false} />;
};

export default NotAuth;
