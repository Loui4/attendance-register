import { combineReducers } from "redux";

import entitiesReducer from "./entities";
import utilsReducer from "./utils";

export default combineReducers({
  entities: entitiesReducer,
  utils: utilsReducer,
});
