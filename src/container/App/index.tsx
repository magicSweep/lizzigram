import React, { Suspense, lazy } from "react";
import "../../styles/style.scss";
//import classes from "./App.module.scss";
//import image from "./../../static/ladki.jpg";
//import iconSvg from "./../../static/google.svg";
//import { square } from "../../component/Test/test";
//import Input from "../../component/FormElements/BaseInput";
import Layout from "../partial/Layout";
//import Photos from "../../photos/container/Photos";
//import NotAuth from "../../component/NotAuth";
import NotAuthWidget from "../../component/NotAuth/NotAuth";
//import firebase from "firebase/app";
import { limitPhotosPerQuery } from "../../config";
import { useSelector } from "react-redux";
import PhotoSkeletons from "../../fcomponent/PhotoSkeletons";

//const LoadableNotAuth = lazy(() => import("../../component/NotAuth"));

const LoadablePhotos = lazy(() => import("../../photos/container/Photos"));

const PhotosSkeleton = () => (
  <PhotoSkeletons numberOfSkeletons={limitPhotosPerQuery} />
);

const App = () => {
  const { user, loading } = useSelector<
    IGlobalState,
    { user: IAuthUser | undefined; loading: boolean }
  >((state) => ({
    user: state.auth.user,
    loading: state.auth.loading,
  }));

  const isAuth = user !== undefined;

  return (
    <Layout>
      {!isAuth && <NotAuthWidget isAuth={isAuth} loading={loading} />}

      {isAuth && (
        <Suspense fallback={PhotosSkeleton}>
          <LoadablePhotos />
        </Suspense>
      )}
    </Layout>
  );
};

export default App;
