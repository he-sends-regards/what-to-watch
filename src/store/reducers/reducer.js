import {combineReducers} from "redux";
import {filmsReducer} from "./films/films";
import {user} from "./user/user";

export const NameSpace = {
  FILMS: `FILMS`,
  USER: `USER`,
};

export default combineReducers({
  [NameSpace.FILMS]: filmsReducer,
  [NameSpace.USER]: user,
});
