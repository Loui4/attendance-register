import { combineReducers } from "redux";

import membersReducer from "./members";
import residencesReducer from "./residences";
import servicesReducer from "./services";
import registrationReducer from "./registers";

export default combineReducers({
  members: membersReducer,
  residences: residencesReducer,
  services: servicesReducer,
  registrations: registrationReducer,
});
