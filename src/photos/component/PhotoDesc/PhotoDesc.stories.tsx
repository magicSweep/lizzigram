import React from "react";
import { action } from "@storybook/addon-actions";
import PhotoDesc from "./PhotoDesc";
import { tagsData } from "../../../component/Tags/TagsCheckbox/__mock";
import image from "./../../../static/ladki.jpg";
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
import { modalReducer, alertReducer, tagsReducer } from "./../../../store";
//import { photoReducer, searchReducer } from "./photos";
//import { authReducer } from "./auth";

const photo = {
  id: "123ic",
  photo: {
    tags: {
      vekwWqVY1yYRd3XeERmd: true,
      WX6CY5kGx4FXvdZR6g8E: true,
      //fYZ3uqG1vBLFH75Y0rjM: true,
      //bCcRcxADj2xP9fkSXNpH: false,
    },
    iconSrc: image,
    date: new Date("2018-11-23"),
    description: "",
  },
};

//CONFIG REDUX
const reducer = combineReducers({
  modal: modalReducer,
  tags: tagsReducer,
  /* alert: alertReducer,
  auth: authReducer,
  search: searchReducer,
  photos: photoReducer, */
});

const composeEnhancers = compose;

const middleware = [thunk]; //sagaMiddleware, thunk

const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(...middleware))
);

store.dispatch({
  type: "SHOW_PHOTO_DESC",
  photo: { id: "hello123Id", photo: photo as any },
});

//TAGS_REQUEST_SUCCESS
store.dispatch({
  type: "TAGS_REQUEST_SUCCESS",
  tags: tagsData,
});

export default {
  component: PhotoDesc,
  title: "Photos/PhotoDesc",
  decorators: [
    (story: any) => (
      <Provider store={store}>
        <div
          style={{
            padding: "10px",
            maxWidth: "600px",
            margin: "auto",
          }}
        >
          {story()}
        </div>
      </Provider>
    ),
  ],
  //decorators: [withKnobs],
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
};

/* `Зали пробует землю на вкус... Зали пробует землю на вкус... Зали пробует
      землю на вкус... Зали пробует землю на вкус... Зали пробует землю на
      вкус... Зали пробует землю на вкус... Зали пробует землю на вкус... Зали
      пробует землю на вкус... Зали пробует землю на вкус... Зали пробует
      землю на вкус... Зали пробует землю на вкус... ` */

const Template = (args: any) => <PhotoDesc {...args} />;

export const Default = Template.bind({});
(Default as any).args = {
  tags: tagsData,
  error: false,
  loading: false,
  photo,
  isEditable: true,
  showEditPhotoForm: () => console.log("SHOW EDIT PHOTO FORM"),
};

export const NotEditable = Template.bind({});
(NotEditable as any).args = {
  tags: tagsData,
  error: false,
  loading: false,
  photo,
  isEditable: false,
  showEditPhotoForm: () => console.log("SHOW EDIT PHOTO FORM"),
};

export const WithDesc = Template.bind({});
(WithDesc as any).args = {
  tags: tagsData,
  error: false,
  loading: false,
  isEditable: true,
  photo: {
    id: "123ic",
    photo: {
      ...photo.photo,
      description: `Зали пробует землю на вкус... Зали пробует землю на вкус... Зали пробует
    землю на вкус... Зали пробует землю на вкус... Зали пробует землю на
    вкус... Зали пробует землю на вкус... Зали пробует землю на вкус... Зали
    пробует землю на вкус... Зали пробует землю на вкус... Зали пробует
    землю на вкус... Зали пробует землю на вкус... `,
    },
  },
  showEditPhotoForm: () => console.log("SHOW EDIT PHOTO FORM"),
};
