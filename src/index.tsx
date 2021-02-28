import React from "react";
import ReactDOM from "react-dom";
import ErrorBoundary from "./component/ErrorBoundary";
import App from "./container/App";

import {
  createStore,
  combineReducers,
  applyMiddleware,
  compose,
  Middleware,
} from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

//import { initApp } from "./firebase/initApp";
import { modalReducer, alertReducer, tagsReducer } from "./store";
import { photoReducer, searchReducer } from "./photos";
import { authReducer } from "./auth";
//import { loadableReady } from "@loadable/component";

//initApp();

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

/**
 * Logs all actions and states after they are dispatched.
 */
const logger: Middleware<any, {}, any> = (store) => (next) => (action) => {
  console.group(action.type);
  console.info("DISPATCHING");
  console.info("ACTION", action);
  console.info("PREV STORE", store.getState());
  let result = next(action);
  console.log("NEW STORE", store.getState());
  console.groupEnd();
  return result;
};

const middleware = [thunk, logger]; //sagaMiddleware, thunk

const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(...middleware))
);

/* loadableReady(() => {
  ReactDOM.hydrate(
    <ErrorBoundary>
      <Provider store={store}>
        <App />
      </Provider>
    </ErrorBoundary>,
    document.getElementById("root")
  );
}); */

ReactDOM.hydrate(
  <ErrorBoundary>
    <Provider store={store}>
      <App />
    </Provider>
  </ErrorBoundary>,
  document.getElementById("root")
);
