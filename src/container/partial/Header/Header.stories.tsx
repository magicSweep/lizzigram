import React, { useState } from "react";
import Header from "./Header";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
//import thunk from "redux-thunk";
//import { modalReducer, alertReducer } from "./../../../store";
import { authReducer } from "../../../auth";

export default {
  component: Header,
  title: "Pages/Header",
  decorators: [],
  //decorators: [withKnobs],
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
};

//CONFIG REDUX
const reducer = combineReducers({
  auth: authReducer,
  //modal: modalReducer,
  //alert: alertReducer,
});

const store = createStore(reducer);

const Template = (args: any) => {
  const [show, setShow] = useState(true);

  return (
    <Provider store={store}>
      <Header isShow={show} />
      <div
        style={{
          height: "120vh",
          padding: "60px 40px 0",
          maxWidth: "1200px",
          margin: "auto",
          textAlign: "center",
        }}
      >
        <h4>Hello, my friends.</h4>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatum
          neque nulla, quas quasi, quia recusandae rem labore quae molestias
          ducimus natus beatae. Culpa, deserunt. Adipisci saepe ab praesentium
          cum neque.
        </p>
        <br />
        <button onClick={() => setShow((prevShow) => !prevShow)}>
          Switch view
        </button>
      </div>
    </Provider>
  );
};

export const Default = Template.bind({});
