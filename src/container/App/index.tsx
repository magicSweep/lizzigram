import React, { Suspense, useEffect, useState } from "react";
import "../../styles/style.scss";
import classes from "./App.module.scss";
//import image from "./../../static/ladki.jpg";
//import iconSvg from "./../../static/google.svg";
//import { square } from "../../component/Test/test";
//import Input from "../../component/FormElements/BaseInput";
import Layout from "../partial/Layout";
import Photos from "../../photos/container/Photos";

//import HelloButton from "./../Button";

//const LoadableAuth = React.lazy(() => import("../../component/Auth"));

const App = () => {
  const [show, setShow] = useState(false);

  /* useEffect(() => {
    setTimeout(() => setShow(true), 3000);
  }); */

  return (
    <Layout>
      <Photos />
      {/*  {show && (
        <Suspense fallback={<div>Loading...</div>}>
          <LoadableAuth />
        </Suspense>
      )} */}
    </Layout>
  );
};

export default App;
