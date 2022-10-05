import { combineReducers } from "redux";
import userReducer from "./user.reducer";
import usersReducer from "./users.reducer";
import postReducer from "./post.reducer";

// Combination de toute les fonctions reducers dans une seule fonction pour ne pas avoir un dossier trop chargé
export default combineReducers({
  userReducer,
  usersReducer,
  postReducer,
});
