import React from "react";
import ReactDOM from "react-dom";
import ErrorBoundary from "./component/ErrorBoundary";
import App from "./container/App";

import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

import { initApp } from "./firebase/initApp";
import { modalReducer, alertReducer, tagsReducer } from "./store";
import { photoReducer, searchReducer } from "./photos";
import { authReducer } from "./auth";

initApp();

//CONFIG REDUX
const reducer = combineReducers({
  modal: modalReducer,
  alert: alertReducer,
  auth: authReducer,
  tags: tagsReducer,
  search: searchReducer,
  photos: photoReducer,
});

const composeEnhancers = compose;

const middleware = [thunk]; //sagaMiddleware, thunk

const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(...middleware))
);

ReactDOM.render(
  <ErrorBoundary>
    <Provider store={store}>
      <App />
    </Provider>
  </ErrorBoundary>,
  document.getElementById("root")
);
